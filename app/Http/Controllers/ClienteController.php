<?php

namespace App\Http\Controllers;

use App\Entity\Cliente;
use App\Entity\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class ClienteController extends Controller
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
        $clientes = Cliente::orderBy($order, $direction)->paginate($size);
        return response()->json($clientes, 200);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function allClientes()
    {
        $clientes = Cliente::all();
        return response()->json($clientes, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $cliente = new Cliente();
        $data = $request->only($cliente->getFillable());
        $cliente->fill($data)->save();
        return response()->json($cliente, 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cliente = new Cliente();
        $data = $request->only($cliente->getFillable());
        $cliente->fill($data)->save();
        return response()->json($cliente, 201);
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
        $clienteDb = Cliente::find($id);
        $columns = $clienteDb->getFillable();
        $data = $request->only($columns);
        $clienteDb->fill($data)->save();
        return response()->json($clienteDb, 200);
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
        $clienteDb = Cliente::find($id);
        $columns = $clienteDb->getFillable();
        $data = $request->only($columns);
        $clienteDb->fill($data)->save();
        return response()->json($clienteDb, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
//        \DB::enableQueryLog();
        $cliente = Cliente::find($id);
//        $query = \DB::getQueryLog();
//        var_dump($query);
        $cliente->delete();
        return response()->json(array("message" => "Cliente eliminado correctamente"), 200);
    }
}
