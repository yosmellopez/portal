<?php

namespace App\Http\Controllers;

use App\Entity\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Matriphe\Md5Hash\Md5Hash;

class UsuarioController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $size = $request->size;
        $order = $request->sort;
        $direction = $request->direction;
        $usuarios = Usuario::with("rol")->orderBy($order, $direction)->paginate($size);
        return response()->json($usuarios, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $usuario = new Usuario();
        $data = $request->only($usuario->getFillable());
        $data["idRoles"] = $request->rol['idRoles'];
        $hash = new Md5Hash();
        $data["claveUsuario"] = $hash->make($data["claveUsuario"]);
        $usuario->fill($data)->save();
        return response()->json($usuario, 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $usuario = new Usuario();
        $data = $request->only($usuario->getFillable());
//        $lastUser = DB::table('fe_usuario')->latest()->first();
        $lastUser = DB::table('fe_usuario')->latest('idUsuario')->first();
        $data["idRoles"] = $request->rol['idRoles'];
        $lastId = $lastUser->idUsuario;
        $data["idUsuario"] = $lastId + 1;
        $hash = new Md5Hash();
        $data["claveUsuario"] = $hash->make($data["claveUsuario"]);
        $usuario->fill($data)->save();
        return response()->json($usuario, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $usuarioDb = Usuario::with("rol")->find($id);
        $columns = $usuarioDb->getFillable();
        $data = $request->only($columns);
        $data["idRoles"] = $request->rol["idRoles"];
        if (!isset($data["claveUsuario"])) {
            $data["claveUsuario"] = $usuarioDb->claveUsuario;
        } else {
            $hash = new Md5Hash();
            $data["claveUsuario"] = $hash->make($data["claveUsuario"]);
        }
        $usuarioDb->fill($data)->save();
        return response()->json($usuarioDb, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $usuarioDb = Usuario::with("rol")->find($id);
        $columns = $usuarioDb->getFillable();
        $data = $request->only($columns);
        $data["idRoles"] = $request->rol["idRoles"];
        if (!isset($data["claveUsuario"])) {
            $data["claveUsuario"] = $usuarioDb->claveUsuario;
        } else {
            $hash = new Md5Hash();
            $data["claveUsuario"] = $hash->make($data["claveUsuario"]);
        }
        $usuarioDb->fill($data)->save();
        return response()->json($usuarioDb, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $action = Usuario::destroy($id);
        return response()->json(array("message" => "Usuario eliminado correctamente"), 200);
    }

    public function changePassword(Request $request)
    {
        $user = $request->user();
        $md5Hasher = new Md5Hash();
        $newPassword = $request->newPassword;
        $currentPassword = $request->currentPassword;
        $userPassword = $user->claveUsuario;
        if ($md5Hasher->check($currentPassword, $userPassword)) {
            $encriptedpassword = $md5Hasher->make($newPassword);
            return response()->json(array(), 200);
        } else {
            return response()->json(array("error" => "La contraseña proporcionada no coincide con la actual"), 406);
        }
    }
}
