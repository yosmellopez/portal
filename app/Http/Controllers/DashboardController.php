<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use Carbon\Carbon;
use DateTimeZone;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function lastEmmitedDocuments()
    {
        $usuario = auth()->user();
        $idRol = $usuario->idRoles;
        if ($idRol == 2 || $idRol == 3) {
            $documentos = Documento::where("rucClient", $usuario->rucClient)->orderBy("idDocumento", "desc")->get();
            $collection = collect($documentos);
            $lastFiveDocuments = $collection->take(5)->toArray();
            return response()->json($lastFiveDocuments, 200);
        } else {
            $documentos = Documento::orderBy("idDocumento", "desc")->get();
            $collection = collect($documentos);
            $lastFiveDocuments = $collection->take(5)->toArray();
            return response()->json($lastFiveDocuments, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function lastAprovedDocuments()
    {
        $usuario = auth()->user();
        $idRol = $usuario->idRoles;
        if ($idRol == 2 || $idRol == 3) {
            $documentos = Documento::where(["rucClient" => $usuario->rucClient, "estadoSunat" => "V"])->orderBy("idDocumento", "desc")->get();
            $collection = collect($documentos);
            $lastFiveDocuments = $collection->take(5)->toArray();
            return response()->json($lastFiveDocuments, 200);
        } else {
            $documentos = Documento::where("estadoSunat", "V")->orderBy("idDocumento", "desc")->get();
            $collection = collect($documentos);
            $lastFiveDocuments = $collection->take(5)->toArray();
            return response()->json($lastFiveDocuments, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function lastRejectedDocuments()
    {
        $usuario = auth()->user();
        $idRol = $usuario->idRoles;
        if ($idRol == 2 || $idRol == 3) {
            $documentos = Documento::where(["rucClient" => $usuario->rucClient, "estadoSunat" => "R"])->orderBy("idDocumento", "desc")->get();
            $collection = collect($documentos);
            $lastFiveDocuments = $collection->take(5)->toArray();
            return response()->json($lastFiveDocuments, 200);
        } else {
            $documentos = Documento::where("estadoSunat", "R")->orderBy("idDocumento", "desc")->get();
            $collection = collect($documentos);
            $lastFiveDocuments = $collection->take(5)->toArray();
            return response()->json($lastFiveDocuments, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function lastLowedDocuments()
    {
        $usuario = auth()->user();
        $idRol = $usuario->idRoles;
        if ($idRol == 2 || $idRol == 3) {
            $documentos = Documento::where(["rucClient" => $usuario->rucClient, "tipoTransaccion" => "B"])->orderBy("idDocumento", "desc")->get();
            $collection = collect($documentos);
            $lastFiveDocuments = $collection->take(5)->toArray();
            return response()->json($lastFiveDocuments, 200);
        } else {
            $documentos = Documento::where("tipoTransaccion", "B")->orderBy("idDocumento", "desc")->get();
            $collection = collect($documentos);
            $lastFiveDocuments = $collection->take(5)->toArray();
            return response()->json($lastFiveDocuments, 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function weekDocuments()
    {
        $fechaEmisionFin = Carbon::now(new DateTimeZone('America/Lima'));
        $tiposDocumento = array("factura", "boleta", "nota-credito", "nota-debito");
        $documentos = array();
        $days = array();
//        \DB::connection()->enableQueryLog();
        foreach ($tiposDocumento as $tipo) {
            $tipoDoc = $this->findTipoDoc($tipo);
            $data = array();
            $today = $fechaEmisionFin->subDays(6);
            for ($i = 0; $i < 7; $i++) {
                $listaDocumentos = DB::table('fe_docelectronico')
                    ->where("tipoDoc", $tipoDoc)
                    ->where('fecEmisionDoc', '=', $today)
                    ->get();
                $collection = collect($listaDocumentos);
                $total = $collection->sum("total");
                $date = $today->format("d");
                if (count($days) < 7) {
                    $days[] = $date;
                }
                $today = $today->addDay();
                $data[] = number_format($total, 2, '.', '');
            }
            $documentos[] = array("label" => $this->findNombreTipo($tipo), "data" => $data);
//            $queries = \DB::getQueryLog();
//            var_dump($queries);
        }
        return response()->json(array("documentos" => $documentos, "columns" => $days), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function monthDocuments()
    {
        $fechaEmisionFin = Carbon::now(new DateTimeZone('America/Lima'));
        $fechaEmisionInicio = $fechaEmisionFin->copy()->subMonths(6);
        $listaDocumentos = DB::table('fe_docelectronico')->whereBetween('fecEmisionDoc', array($fechaEmisionInicio, $fechaEmisionFin))->get();
        $collection = collect($listaDocumentos);
        $tiposDocumento = array("factura", "boleta", "nota-credito", "nota-debito");
        $documentos = array();
        $days = array();
        foreach ($tiposDocumento as $tipo) {
            $tipoDoc = $this->findTipoDoc($tipo);
            $data = array();
            $today = Carbon::now(new DateTimeZone('America/Lima'));
            $today = $today->subMonths(6);
            for ($i = 0; $i < 6; $i++) {
                $formattedDate = $today->format("m/Y");
                $total = $collection->filter(function ($value, $key) use ($tipoDoc, $formattedDate) {
                    $fecha = date_create_from_format("d/m/Y", $value->fecEmisionDoc);
                    if (!$fecha) {
                        $fecha = date_create_from_format("Y-d-m", $value->fecEmisionDoc);
                    }
                    $mes = $fecha->format("m/Y");
                    return $formattedDate == $mes && $tipoDoc == $value->tipoDoc;
                })->sum("total");
                $mes = $today->format("m");
                if (count($days) < 6) {
                    $days[] = $this->getMonth($mes - 1);
                }
                $today = $today->addMonth();
                $data[] = number_format($total, 2, '.', '');
            }
            $documentos[] = array("label" => $this->findNombreTipo($tipo), "data" => $data);
        }
        return response()->json(array("documentos" => $documentos, "columns" => $days), 200);
    }

    public function getMonth($monthNumber)
    {
        $meses = array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
        return $meses[$monthNumber];
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function yearDocuments()
    {
        $tiposDocumentos = array("factura", "boleta", "nota-credito", "nota-debito");
        $documentos = array();
        $years = array();
        foreach ($tiposDocumentos as $tipo) {
            $tipoDoc = $this->findTipoDoc($tipo);
            $data = array();
            $today = Carbon::now(new DateTimeZone('America/Lima'));
            $today->subYears(4);
            for ($i = 0; $i < 5; $i++) {
                $formattedDate = $today->format("Y");
                $listaDocumentos = DB::table('fe_docelectronico')
                    ->where("tipoDoc", $tipoDoc)
                    ->whereYear('fecEmisionDoc', $formattedDate)
                    ->get();
                $collection = collect($listaDocumentos);
                $total = $collection->sum("total");
                if (count($years) < 5) {
                    $years[] = $today->format("Y");
                }
                $today = $today->addYear();
                $data[] = number_format($total, 2, '.', '');
            }
            $documentos[] = array("label" => $this->findNombreTipo($tipo), "data" => $data);
        }
        return response()->json(array("documentos" => $documentos, "columns" => $years), 200);
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
                return "RC";
            default:
                return "01";
        }
    }

    private function findNombreTipo($tipo = "factura")
    {
        switch ($tipo) {
            case "factura":
                return "Facturas";
            case "boleta":
                return "Boletas";
            case "nota-credito":
                return "Notas de Crédito";
            case "nota-debito":
                return "Notas de Débito";
            case "comprobante-percepcion":
                return "Comprobante de Percepción";
            case "comprobante-retencion":
                return "Comprobante de Retención";
            case "comunicacion-baja":
                return "Comunicación de Baja";
            case "guia-remision":
                return "Guía ";
            case "resumen-boleta":
                return "Resumen de Boletas";
            default:
                return "01";
        }
    }
}
