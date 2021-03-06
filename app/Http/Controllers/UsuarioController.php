<?php

namespace App\Http\Controllers;

use App\Entity\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Matriphe\Md5Hash\Md5Hash;

class UsuarioController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $usuario = new Usuario();
        $data = $request->only($usuario->getFillable());
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPasswordMasive()
    {
        try {
            $usuarios = Usuario::where("idRoles", 2)->orWhere("idRoles", 3)->get();
            $usePHPMailer = config('app.use_phpmailer');
            $documentoController = null;
            if ($usePHPMailer) {
                $documentoController = new PHPMailerController();
            } else {
                $documentoController = new EmailController();
            }
            foreach ($usuarios as $usuario) {
                $email = $usuario->email;
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    if (isset($usuario->email)) {
                        $password = $usuario->rucClient;
                        $hash = new Md5Hash();
                        $claveUsuario = $hash->make($password);
                        $data = array("claveUsuario" => $claveUsuario);
                        $usuario->fill($data)->update();
                        $documentoController->sendRestorePasswordEmail($usuario, $password);
                    }
                }
            }
        } catch (\Exception $e) {
            return response()->json("No se enviaron los mensajes por " . $e->getMessage(), 400);
        }
        return response()->json("Se han enviado los mensajes correctamente", 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
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
            $encriptedPassword = $md5Hasher->make($newPassword);
            $usuarioDb = Usuario::find($user->idUsuario);
            $usuarioDb->claveUsuario = $encriptedPassword;
            $usuarioDb->update();
            return response()->json(array(), 200);
        } else {
            return response()->json(array("error" => "La contraseña proporcionada no coincide con la actual"), 406);
        }
    }

    public function passwordReset($usuarioId)
    {
        try {
            $usuario = Usuario::find($usuarioId);
            $usePHPMailer = config('app.use_phpmailer');
            $documentoController = null;
            if ($usePHPMailer) {
                $documentoController = new PHPMailerController();
            } else {
                $documentoController = new EmailController();
            }
            $email = $usuario->email;
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                if (isset($usuario->email)) {
                    $password = $usuario->rucClient;
                    $hash = new Md5Hash();
                    $claveUsuario = $hash->make($password);
                    $data = array("claveUsuario" => $claveUsuario);
                    $usuario->fill($data)->update();
                    $documentoController->sendRestorePasswordEmail($usuario, $password);
                }
            }
        } catch (\Exception $e) {
            return response()->json("No se enviaron los mensajes por " . $e->getMessage(), 400);
        }
        return response()->json("Se han enviado los mensajes correctamente", 200);
    }
}
