<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $table = 'fe_docelectronico';
    protected $primaryKey = 'idDocumento';
    protected $fillable = ["idDocumento", "numSerie", "fecEmisionDoc", 'estadoSunat', 'estadoWeb', 'tipoDoc', "tipoTransaccion", "total", "docPdf", "docXml", "docCdr", "rucClient", "monedaTransaccion"];
    protected $map = [
        'tipoDocumento' => 'tipoDoc'
    ];

    public function cliente()
    {
        return $this->belongsTo('App\Entity\Cliente', 'rucClient');
    }

    protected $nombre;

    public function getNombreAttribute()
    {
        return $this->nombre = basename($this->docPdf);
    }

}
