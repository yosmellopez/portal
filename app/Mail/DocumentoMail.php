<?php

namespace App\Mail;

use App\Entity\Documento;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class DocumentoMail extends Mailable
{
    use Queueable, SerializesModels;
    protected $documento;
    protected $userEmail;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Documento $documento, $userEmail)
    {
        $this->userEmail = $userEmail;
        $this->documento = $documento;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $prefixPath = Storage::disk("custom")->getDriver()->getAdapter()->getPathPrefix();
        $docPdf = join(DIRECTORY_SEPARATOR, array($prefixPath, $this->documento->docPdf));
        $docXml = join(DIRECTORY_SEPARATOR, array($prefixPath, $this->documento->docXml));
        $docCdr = join(DIRECTORY_SEPARATOR, array($prefixPath, $this->documento->docCdr));
        $nombreCliente = $this->documento->cliente->nombreClient;
        $tipoDocumento = $this->findTipoDoc($this->documento->tipoDoc);
        $estadoDocumento = $this->findEstado($this->documento->estadoSunat);
        $numeroSerie = $this->documento->numSerie;
        return $this->from($this->userEmail, 'Portal de Facturación Electrónica')
            ->subject($tipoDocumento . " [$numeroSerie] $estadoDocumento")
            ->view('emails.documento')
            ->with([
                "rucCliente" => $this->documento->rucClient,
                "nombreCliente" => $nombreCliente,
                "numSerie" => $numeroSerie,
                "docPdf" => $this->documento->docPdf,
                "docXml" => $this->documento->docXml,
                "docCdr" => $this->documento->docCdr,
                "total" => $this->documento->total,
                "moneda" => $this->documento->monedaTransaccion,
                "tipoDocumento" => $tipoDocumento,
                "serieNumero" => $numeroSerie,
                "fechaEmision" => $this->documento->fecEmisionDoc,
                "estadoDocumento" => $estadoDocumento,
            ])
            ->attach($docPdf, [
                'as' => basename($this->documento->docPdf),
                'mime' => 'application/pdf',
            ])
            ->attach($docXml, [
                'as' => basename($this->documento->docXml),
                'mime' => 'application/vnd.mozilla.xul+xml',
            ])
            ->attach($docCdr, [
                'as' => basename($this->documento->docCdr),
                'mime' => 'application/zip',
            ]);
    }


    private function findTipoDoc($tipo = "factura")
    {
        switch ($tipo) {
            case "01":
                return "Factura de Venta";
            case "03":
                return "Boleta de Venta";
            case "07":
                return "Nota de Crédito";
            case "08":
                return "Nota de Débito";
            case "40":
                return "Comprobante Percepción";
            case "20":
                return "Comprobante Retencion";
            case "09":
                return "Guía Remisión";
//            case "03":
//                return "Resumen Boleta";
            default:
                return "01";
        }
    }

    private function findEstado($estado = "R")
    {
        switch ($estado) {
            case 'R':
                return 'Aprobado';
            case 'Z':
                return 'Rechazado';
            case 'D':
                return 'Pendiente Respuesta';
            case 'P':
                return 'Baja Aprobada';
            case 'J':
                return 'Baja Rechazada';
        }
    }
}
