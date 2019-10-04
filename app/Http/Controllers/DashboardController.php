<?php

namespace App\Http\Controllers;

use App\Entity\Documento;
use Jenssegers\Date\Date;

class DashboardController extends Controller
{

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function lastEmmitedDocuments()
    {
        $documentos = Documento::orderBy("idDocumento", "desc")->get();
        $collection = collect($documentos);
        $lastFiveDocuments = $collection->take(5)->toArray();
        return response()->json($lastFiveDocuments, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function lastAprovedDocuments()
    {
        $documentos = Documento::where("estadoSunat", "V")->orderBy("idDocumento", "desc")->get();
        $collection = collect($documentos);
        $lastFiveDocuments = $collection->take(5)->toArray();
        return response()->json($lastFiveDocuments, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function lastRejectedDocuments()
    {
        $documentos = Documento::where("estadoSunat", "R")->orderBy("idDocumento", "desc")->get();
        $collection = collect($documentos);
        $lastFiveDocuments = $collection->take(5)->toArray();
        return response()->json($lastFiveDocuments, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function lastLowedDocuments()
    {
        $documentos = Documento::where("tipoTransaccion", "B")->orderBy("idDocumento", "desc")->get();
        $collection = collect($documentos);
        $lastFiveDocuments = $collection->take(5)->toArray();
        return response()->json($lastFiveDocuments, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function weekDocuments()
    {
        $documentos = Documento::all();
        $collection = collect($documentos);
        $tiposDocumento = array("factura", "boleta", "nota-credito", "nota-debito");
        $documentos = array();
        $days = array();
        foreach ($tiposDocumento as $tipo) {
            $tipoDoc = $this->findTipoDoc($tipo);
            $data = array();
            $today = new \DateTime();
            $today->modify("-6 day");
            for ($i = 0; $i < 7; $i++) {
                $formattedDate = $today->format("d/m/Y");
                $total = $collection->filter(function ($value, $key) use ($tipoDoc, $formattedDate) {
                    return $formattedDate == $value->fecEmisionDoc && $tipoDoc == $value->tipoDoc;
                })->sum("total");
                $date = $today->format("d");
                if (count($days) < 7) {
                    $days[] = $date;
                }
                $today->modify("+1 day");
                $data[] = number_format($total, 2, '.', '');
            }
            $documentos[] = array("label" => $this->findNombreTipo($tipo), "data" => $data);
        }
        return response()->json(array("documentos" => $documentos, "columns" => $days), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function monthDocuments()
    {
        $documentos = Documento::all();
        $collection = collect($documentos);
        $tiposDocumento = array("factura", "boleta", "nota-credito", "nota-debito");
        $documentos = array();
        $days = array();
        foreach ($tiposDocumento as $tipo) {
            $tipoDoc = $this->findTipoDoc($tipo);
            $data = array();
            $today = Date::now();
            $today->subMonths(5);
            for ($i = 0; $i < 6; $i++) {
                $formattedDate = $today->format("m/Y");
                $total = $collection->filter(function ($value, $key) use ($tipoDoc, $formattedDate) {
                    $fecha = date_create_from_format("d/m/Y", $value->fecEmisionDoc);
                    $mes = $fecha->format("m/Y");
                    return $formattedDate == $mes && $tipoDoc == $value->tipoDoc;
                })->sum("total");
                $date = $today->format("MMM");
                if (count($days) < 6) {
                    $days[] = ucfirst($date);
                }
                $today->addMonth();
                $data[] = number_format($total, 2, '.', '');
            }
            $documentos[] = array("label" => $this->findNombreTipo($tipo), "data" => $data);
        }
        return response()->json(array("documentos" => $documentos, "columns" => $days), 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function yearDocuments()
    {
        $documentos = Documento::all();
        $collection = collect($documentos);
        $tiposDocumento = array("factura", "boleta", "nota-credito", "nota-debito");
        $documentos = array();
        $days = array();
        foreach ($tiposDocumento as $tipo) {
            $tipoDoc = $this->findTipoDoc($tipo);
            $data = array();
            $today = new \DateTime();
            $today->modify("-4 year");
            for ($i = 0; $i < 5; $i++) {
                $formattedDate = $today->format("Y");
                $total = $collection->filter(function ($value, $key) use ($tipoDoc, $formattedDate) {
                    $fecha = date_create_from_format("d/m/Y", $value->fecEmisionDoc);
                    $mes = $fecha->format("Y");
                    return $formattedDate == $mes && $tipoDoc == $value->tipoDoc;
                })->sum("total");
                $date = $today->format("Y");
                if (count($days) < 5) {
                    $days[] = $date;
                }
                $today->modify("+1 year");
                $data[] = number_format($total, 2, '.', '');
            }
            $documentos[] = array("label" => $this->findNombreTipo($tipo), "data" => $data);
        }
        return response()->json(array("documentos" => $documentos, "columns" => $days), 200);
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
