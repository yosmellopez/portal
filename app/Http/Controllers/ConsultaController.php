<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use App\Entity\GeneralConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Matriphe\Md5Hash\Md5Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class ConsultaController extends Controller
{
    public function consultaDocummento(Request $request)
    {
        $hasher = new Md5Hash();
        $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Las credenciales proporcionadas para el servicio no son correctas para la lista de configuraciones generales'], 401,
                ["success" => "false", "error" => 'Las credenciales proporcionadas para el servicio no son correctas para la lista de configuraciones generales']);
        }
        $size = $request->size;
        $order = $request->sort;
        $direction = $request->direction;
        $items = $request->all();
        $numSerie = isset($items["numSerie"]) ? $items["numSerie"] : null;
        $numero = isset($items["numero"]) ? $items["numero"] : null;
        $monedaTransaccion = isset($items["monedaTransaccion"]) ? $items["monedaTransaccion"] : null;
        $fechaEmisionInicio = isset($items["fechaEmisionInicio"]) ? $items["fechaEmisionInicio"] : null;
        if (!isset($fechaEmisionInicio)) {
            $fechaEmisionInicio = Carbon::createFromFormat('d/m/Y', "01/01/1900");
        }
        $fechaEmisionInicio = Carbon::createFromFormat("d/m/Y", $fechaEmisionInicio);
        $fechaEmisionInicio = $fechaEmisionInicio->subDay();
        $fechaEmisionFin = isset($items["fechaEmisionFin"]) ? $items["fechaEmisionFin"] : null;
        if (!isset($fechaEmisionFin) || empty($fechaEmisionFin) || is_null($fechaEmisionFin)) {
            $fechaEmisionFin = Carbon::now();
        }
        $fechaEmisionFin = Carbon::createFromFormat("d/m/Y", $fechaEmisionFin);
        $tipoDoc = isset($items["tipoDoc"]) ? $items["tipoDoc"] : null;
        $rucClient = isset($items["rucClient"]) ? $items["rucClient"] : null;
        $paginator = Documento::with('cliente')
            ->whereBetween('fecEmisionDoc', array($fechaEmisionInicio, $fechaEmisionFin))
            ->when($numSerie, function ($query, $numSerie) {
                return $query->where('numSerie', 'like', '%' . $numSerie . '%');
            })
            ->when($numero, function ($query, $numero) {
                return $query->where('numSerie', 'like', '%' . $numero . '%');
            })
            ->when($tipoDoc, function ($query, $tipoDoc) {
                return $query->where('tipoDoc', $tipoDoc);
            })
            ->when($rucClient, function ($query, $rucClient) {
                return $query->where('rucClient', $rucClient);
            })
            ->when($monedaTransaccion, function ($query, $monedaTransaccion) {
                return $query->where('monedaTransaccion', $monedaTransaccion);
            })
            ->orderBy($order, $direction)
            ->paginate($size);
        return response()->json($paginator, 200);
    }

    public function downloadFormatoImpreso(Request $request)
    {
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401,
                    ["success" => "false", "error" => 'Las credenciales proporcionadas para el servicio no son correctas']);
            }
            $idDocumento = $request->idDocumento;
            $documento = Documento::find($idDocumento);
            $docPath = $documento->docPdf;
            $exists = Storage::disk('custom')->exists($docPath);
            if ($exists) {
                return Storage::download($docPath, basename($docPath));
            } else {
                return response()->json(array("message" => "El documento no existe", "error" => basename($docPath)), 404);
            }
        } catch (\Exception $exception) {
            return response()->json(array("success" => false, "message" => "No se ha podido guardar la configuración general por: " . $exception->getMessage()), 500);
        }
    }

    public function downloadXmlFirmado(Request $request)
    {
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401,
                    ["success" => "false", "error" => 'Las credenciales proporcionadas para el servicio no son correctas']);
            }
            $idDocumento = $request->idDocumento;
            $documento = Documento::find($idDocumento);
            $docPath = $documento->docXml;
            $exists = Storage::disk('custom')->exists($docPath);
            if ($exists) {
                return Storage::download($docPath, basename($docPath));
            } else {
                return response()->json(array("message" => "El documento no existe", "error" => basename($docPath)), 404);
            }
        } catch (\Exception $exception) {
            return response()->json(array("success" => false, "message" => "No se ha podido guardar la configuración general por: " . $exception->getMessage()), 500);
        }
    }

    public function downloadRespuestaCdr(Request $request)
    {
        try {
            $hasher = new Md5Hash();
            $credentials = array("password" => $hasher->make($request->claveSesion), "nombUsuario" => $request->usuarioSesion);
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(["success" => false, 'message' => 'Las credenciales proporcionadas para el servicio no son correctas'], 401,
                    ["success" => "false", "error" => 'Las credenciales proporcionadas para el servicio no son correctas']);
            }
            $idDocumento = $request->idDocumento;
            $documento = Documento::find($idDocumento);
            $docPath = $documento->docCdr;
            $exists = Storage::disk('custom')->exists($docPath);
            if ($exists) {
                return Storage::download($docPath, basename($docPath));
            } else {
                return response()->json(array("message" => "El documento no existe", "error" => basename($docPath)), 404);
            }
        } catch (\Exception $exception) {
            return response()->json(array("success" => false, "message" => "No se ha podido guardar la configuración general por: " . $exception->getMessage()), 500);
        }
    }
}
