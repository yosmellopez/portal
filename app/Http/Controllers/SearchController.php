<?php

namespace App\Http\Controllers;

use App\Entity\Cliente;
use App\Entity\Documento;
use App\Entity\Usuario;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendEmail($idDocumento)
    {
        $documento = Documento::find($idDocumento);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listTipoMoneda()
    {
        $documentos = Documento::select("monedaTransaccion")->distinct()->get();
        $collection = collect($documentos);
        $tiposMoneda = $collection->map(function ($item, $key) {
            return array("monedaTransaccion" => $item->monedaTransaccion);
        })->unique("monedaTransaccion");
        $monedasFinales = array();
        $contador = 0;
        foreach ($tiposMoneda as $moneda) {
            $monedasFinales[$contador++] = $moneda;
        }
        return response()->json($monedasFinales, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listEstadoSunat()
    {
        $documentos = Documento::select("estadoSunat")->distinct()->get();
        $collection = collect($documentos);
        $estadosSunat = $collection->map(function ($item, $key) {
            return array("estadoSunat" => $item->estadoSunat);
        })->unique("estadoSunat");
        $estadosFinales = array();
        $contador = 0;
        foreach ($estadosSunat as $estado) {
            $estadosFinales[$contador++] = $estado;
        }
        return response()->json($estadosFinales, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function listNumeroSerie(Request $request)
    {
        $usuario = auth()->user();
        $idRol = $usuario->idRoles;
        $rucCliente = $usuario->rucClient;
        $tipoDocumento = $request->tipo;
        if ($idRol == 2 || $idRol == 3) {
            $series = Documento::select("serie")
                ->where('tipoDoc', $this->findTipoDoc($tipoDocumento))
                ->where("rucClient", $rucCliente)
                ->distinct('serie')->get();
            return response()->json($series, 200);
        } else {
            $series = Documento::select("serie")->where('tipoDoc', $this->findTipoDoc($tipoDocumento))->distinct('serie')->get();
            return response()->json($series, 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchDocumentos(Request $request)
    {
        $size = $request->size;
        $order = $request->sort;
        $direction = $request->direction;
        $usuario = auth()->user();
        $idRol = $usuario->idRoles;
        $items = $request->all();
        $numSerie = isset($items["numSerie"]) ? $items["numSerie"] : null;
        $numero = isset($items["numero"]) ? $items["numero"] : null;
        $razonSocial = isset($items["razonSocial"]) ? $items["razonSocial"] : null;
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
        $tipoDoc = $this->findTipoDoc($items["tipoDoc"]);
        $rucClient = isset($items["rucClient"]) ? $items["rucClient"] : null;
        $estadoSunat = isset($items["estadoSunat"]) ? $items["estadoSunat"] : null;
        $estadoSunat = $this->findEstado($estadoSunat);
//        \DB::connection()->enableQueryLog();
        if ($idRol == 2 || $idRol == 3) {
            $rucCliente = $usuario->rucClient;
            $paginator = Documento::with('cliente')
                ->where("rucClient", $rucCliente)
                ->whereBetween('fecEmisionDoc', array($fechaEmisionInicio, $fechaEmisionFin))
                ->when($numSerie, function ($query, $numSerie) {
                    return $query->where('numSerie', 'like', '%' . $numSerie . '%');
                })
                ->when($razonSocial, function ($query, $razonSocial) {
                    return $query->join('fe_cliente', 'fe_docelectronico.rucClient', '=', 'fe_cliente.rucClient')
                        ->where('fe_cliente.nombreClient', 'like', '%' . $razonSocial . '%');
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
                ->when($estadoSunat, function ($query, $estadoWeb) {
                    return $query->where('estadoSunat', $estadoWeb);
                })
                ->when($monedaTransaccion, function ($query, $monedaTransaccion) {
                    return $query->where('monedaTransaccion', $monedaTransaccion);
                })
                ->orderBy($order, $direction)
                ->paginate($size);
            return response()->json($paginator, 200);
        } else {
            $paginator = Documento::with('cliente')
                ->whereBetween('fecEmisionDoc', array($fechaEmisionInicio, $fechaEmisionFin))
                ->when($numSerie, function ($query, $numSerie) {
                    return $query->where('numSerie', 'like', '%' . $numSerie . '%');
                })
                ->when($razonSocial, function ($query, $razonSocial) {
                    return $query->join('fe_cliente', 'fe_docelectronico.rucClient', '=', 'fe_cliente.rucClient')
                        ->where('fe_cliente.nombreClient', 'like', '%' . $razonSocial . '%');
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
                ->when($estadoSunat, function ($query, $estadoWeb) {
                    return $query->where('estadoSunat', $estadoWeb);
                })
                ->when($monedaTransaccion, function ($query, $monedaTransaccion) {
                    return $query->where('monedaTransaccion', $monedaTransaccion);
                })
                ->orderBy($order, $direction)
                ->paginate($size);
//            $queries = \DB::getQueryLog();
//            var_dump($queries);
            return response()->json($paginator, 200);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchUsuarios(Request $request)
    {
        $rucClient = $request->rucClient;
        $nombreUsuario = $request->nombUsuario;
        $correo = $request->email;
        $rol = $request->rol;
        $usuarios = Usuario::with('rol')
            ->when($nombreUsuario, function ($query, $nombreUsuario) {
                return $query->where('nombUsuario', 'like', '%' . $nombreUsuario . '%');
            })
            ->when($correo, function ($query, $correo) {
                return $query->where('email', 'like', '%' . $correo . '%');
            })
            ->when($rucClient, function ($query, $rucClient) {
                return $query->where('rucClient', $rucClient);
            })
            ->when($rol, function ($query, $rol) {
                return $query->where('idRoles', $rol);
            })
            ->get();
        return response()->json($usuarios, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchClientes(Request $request)
    {
        $data = $request->all();
        $rucClient = isset($data["rucClient"]) ? $data["rucClient"] : null;
        $nombreClient = isset($data["nombreClient"]) ? $data["nombreClient"] : null;
        $correo = isset($data["email"]) ? $data["email"] : null;
        $usuarios = Cliente::when($nombreClient, function ($query, $nombreClient) {
            return $query->where('nombreClient', 'like', '%' . $nombreClient . '%');
        })->when($correo, function ($query, $correo) {
            return $query->where('email', 'like', '%' . $correo . '%');
        })->when($rucClient, function ($query, $rucClient) {
            return $query->where('rucClient', $rucClient);
        })->get();
        return response()->json($usuarios, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function downloadDocument(Request $request, $id)
    {
        $tipoDocumento = $request->tipoDocumento;
        $documento = Documento::find($id);
        switch ($tipoDocumento) {
            case "pdf":
                $docPath = $documento->docPdf;
                break;
            case "xml":
                $docPath = $documento->docXml;
                break;
            case "cdr":
                $docPath = $documento->docCdr;
                break;
            default:
                $docPath = $documento->docPdf;
                break;
        }
        $filePath = public_path() . $docPath;
        $name = basename($filePath);
        $headers = array('Content-Type' => mime_content_type($filePath));
        return response()->download($filePath, $name, $headers);
    }

    private function findTipoDoc($tipo = "factura")
    {
        switch ($tipo) {
            case "factura":
                return "01";
            case "boleta":
                return "03";
            case "nota-credito":
                return "07";
            case "nota-debito":
                return "08";
            case "comprobante-percepcion":
                return "40";
            case "comprobante-retencion":
                return "20";
            case "comunicacion-baja":
                return "01";
            case "guia-remision":
                return "09";
            case "resumen-boleta":
                return "03";
            default:
                return "01";
        }
    }

    private function findEstado($estado = "Aprobado")
    {
        switch ($estado) {
            case 'Aprobado':
                return 'V';
            case 'Rechazado':
                return 'Z';
            case 'Pendiente Respuesta':
                return 'D';
            case 'Leido':
                return 'L';
            case 'Baja Aprobada':
                return 'P';
            case 'Baja Rechazada':
                return 'J';
            case 'P':
                return 'Publicado';
        }
    }
}
