<?php

namespace App\Http\Controllers;

use App\Entity\GeneralConfig;
use App\Entity\ReglaConfig;
use App\Entity\ResumenConfig;
use App\Entity\Sociedad;
use Illuminate\Http\Request;
use Matriphe\Md5Hash\Md5Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class ConfigController extends Controller
{
    public function listGeneralConfig(Request $request)
    {
        $hasher = new Md5Hash();
        $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
        }
        $configuraciones = GeneralConfig::all();
        return response()->json($configuraciones, 200);
    }

    public function saveGeneralConfig(Request $request)
    {
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
            }
            $configuracion = new GeneralConfig();
            $data = $request->only($configuracion->getFillable());
            $configuracion->fill($data)->save();
            return response()->json(array("success" => true, "message" => "Se ha guardado la configuración general correctamente."), 201);
        } catch (\Exception $exception) {
            return response()->json(array("success" => false, "message" => "No se ha podido guardar la configuración general por: " . $exception->getMessage()), 500);
        }
    }

    public function listReglaConfig(Request $request)
    {
        $hasher = new Md5Hash();
        $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
        }
        $reglasIdioma = ReglaConfig::all();
        return response()->json($reglasIdioma, 200);
    }

    public function saveReglaConfig(Request $request)
    {
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
            }
            $reglaIdioma = new ReglaConfig();
            $data = $request->only($reglaIdioma->getFillable());
            $idRegla = $data["fEKey"];
            $existResumen = ReglaConfig::where('fEKey', $idRegla)->exists();
            if ($existResumen) {
                return response()->json(['success' => false, 'message' => 'La regla de idioma ya existe en la base de datos.'], 200);
            }
            $reglaIdioma->fill($data)->save();
            return response()->json(array("success" => true, "message" => "Se ha guardado la regla de idioma correctamente."), 201);
        } catch (\Exception $exception) {
            return response()->json(array("success" => false, "message" => "No se ha podido guardar las reglas de idioma por: " . $exception->getMessage()), 500);
        }
    }

    public function listResumenConfig(Request $request)
    {
        $hasher = new Md5Hash();
        $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
        }
        $resumenes = ResumenConfig::all();
        return response()->json($resumenes, 200);
    }

    public function saveResumenConfig(Request $request)
    {
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
            }
            $resumenConfig = new ResumenConfig();
            $data = $request->only($resumenConfig->getFillable());
            $idResumen = $data["id"];
            $existResumen = ResumenConfig::where('id', $idResumen)->exists();
            if ($existResumen) {
                return response()->json(['success' => false, 'message' => 'La configuración del resumen ya existe en la base de datos.'], 200);
            }
            $resumenConfig->fill($data)->save();
            return response()->json(array("success" => true, "message" => "Se ha guardado la configuración del resumen diario correctamente."), 201);
        } catch (\Exception $exception) {
            return response()->json(array("success" => false, "message" => "No se ha podido guardar la configuración del resumen diario por: " . $exception->getMessage()), 500);
        }
    }

    public function listSociedad(Request $request)
    {
        $hasher = new Md5Hash();
        $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
        }
        $sociedades = Sociedad::all();
        return response()->json($sociedades, 200);
    }

    public function saveSociedad(Request $request)
    {
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401);
            }
            $sociedad = new Sociedad();
            $data = $request->only($sociedad->getFillable());
            $idBd = $data["bdId"];
            $existDatabase = Sociedad::where('bdId', $idBd)->exists();
            if ($existDatabase) {
                return response()->json(['success' => false, 'message' => 'La sociedad ya existe en la base de datos.'], 200);
            }
            $sociedad->fill($data)->save();
            return response()->json(array("success" => true, "message" => "Se ha guardado la sociedad correctamente."), 201);
        } catch (\Exception $exception) {
            return response()->json(array("success" => false, "message" => "No se ha podido guardar la sociedad por: " . $exception->getMessage()), 500);
        }
    }
}
