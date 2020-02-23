<?php

namespace App\Mail;

use App\Entity\Documento;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class DocumentoMail extends Mailable
{
    use Queueable, SerializesModels;
    protected $documento;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Documento $documento)
    {
        $this->documento = $documento;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $nombreCliente = $this->documento->cliente->nombreClient;
        return $this->from('ylopez@vsperu.com', 'Portal de Facturación Electrónica')
            ->subject('Documento Electrónico')
            ->markdown('emails.documento')
            ->with([
                "rucCliente" => $this->documento->rucClient,
                "nombreCliente" => $nombreCliente,
                "numSerie" => $this->documento->numSerie,
                "docPdf" => $this->documento->docPdf,
                "docXml" => $this->documento->docXml,
                "docCdr" => $this->documento->docCdr,
            ])
            ->attach($this->documento->docPdf, [
                'as' => basename($this->documento->docPdf),
                'mime' => 'application/pdf',
            ])
            ->attach($this->documento->docXml, [
                'as' => basename($this->documento->docXml),
                'mime' => 'application/vnd.mozilla.xul+xml',
            ])
            ->attach($this->documento->docCdr, [
                'as' => basename($this->documento->docCdr),
                'mime' => 'application/zip',
            ]);
    }
}
