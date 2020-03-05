<?php

namespace App\Http\Controllers;

use App\Entity\Cliente;
use App\Entity\Documento;
use App\Entity\Usuario;
use http\Client;
use Illuminate\Http\Request;
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
        $documentos = Documento::all();
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
        $documentos = Documento::all();
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
    public function listNumeroSerie()
    {
        $documentos = Documento::all();
        $collection = collect($documentos);
        $seriesDocumentos = $collection->map(function ($item, $key) {
            $numSerie = preg_split("/[-]/", $item->numSerie);
            $pos = 0;
            if (count($numSerie) > 2 && $numSerie[0] != "RC") {
                $pos = 1;
            }
            return array("serie" => $numSerie[$pos]);
        })->unique("serie")->toArray();
        $series = array();
        foreach ($seriesDocumentos as $serie) {
            $series[] = $serie;
        }
        return response()->json($series, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchDocumentos(Request $request)
    {
        $data = $request->all();
        $numSerie = $data["numSerie"];
        $numero = $data["numero"];
        $monedaTransaccion = $data["monedaTransaccion"];
        $fechaEmisionInicio = $data["fechaEmisionInicio"];
        if (!isset($fechaEmisionInicio)) {
            $fechaEmisionInicio = "01/01/1900";
        }
        $fechaEmisionInicio = \DateTime::createFromFormat("d/m/Y", $fechaEmisionInicio);
        $fechaEmisionFin = $data["fechaEmisionFin"];
        if (!isset($fechaEmisionFin) || empty($fechaEmisionFin) || is_null($fechaEmisionFin)) {
            $fechaEmisionFin = date('d/m/Y');
        }
        $fechaEmisionFin = \DateTime::createFromFormat("d/m/Y", $fechaEmisionFin);
        $tipoDoc = $this->findTipoDoc($data["tipoDoc"]);
        $rucClient = $data["rucClient"];
        $estadoSunat = $data["estadoSunat"];
        $estadoSunat = $this->findEstado($estadoSunat);
//        \DB::connection()->enableQueryLog();
        $documentos = DB::table('fe_docelectronico')
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
            ->when($estadoSunat, function ($query, $estadoWeb) {
                return $query->where('estadoSunat', $estadoWeb);
            })
            ->when($monedaTransaccion, function ($query, $monedaTransaccion) {
                return $query->where('monedaTransaccion', $monedaTransaccion);
            })
            ->get();
        $interval = $fechaEmisionFin->diff($fechaEmisionInicio);
        $days = $interval->days;
        $documents = array();
        for ($i = 0; $i <= $days; $i++) {
            $filteredDocuments = collect($documentos)->filter(function ($item) use ($fechaEmisionInicio) {
                $currentDate = \DateTime::createFromFormat("d/m/Y", $item->fecEmisionDoc);
                if (!$currentDate) {
                    $currentDate = \DateTime::createFromFormat("Y-d-m", $item->fecEmisionDoc);
                }
                if ($currentDate) {
                    $diferencia = $fechaEmisionInicio->diff($currentDate);
                    return $diferencia->days == 0;
                }
                return false;
            });
            $fechaEmisionInicio = $fechaEmisionInicio->modify("+1 days");
            $documents = array_merge($filteredDocuments->toArray(), $documents);
        }
//        $queries = \DB::getQueryLog();
//        var_dump($queries);
        return response()->json($documents, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function searchUsuarios(Request $request)
    {
        $data = $request->all();
        $rucClient = $data["rucClient"];
        $nombreUsuario = $data["nombUsuario"];
        $correo = $data["email"];
        $rol = $data["rol"];
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
        $rucClient = $data["rucClient"];
        $nombreClient = $data["nombreClient"];
        $correo = $data["email"];
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
                return 'R';
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
