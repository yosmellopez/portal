<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    public $timestamps = false;
    protected $table = 'fe_docelectronico';
    protected $primaryKey = 'idDocumento';
    protected $fillable = ["idDocumento", "numSerie", "fecEmisionDoc", 'estadoSunat', 'estadoWeb', 'tipoDoc', "tipoTransaccion", "total", "docPdf", "docXml", "docCdr", "rucClient", "monedaTransaccion", "token"];
    protected $map = [
        'tipoDocumento' => 'tipoDoc'
    ];
    protected $casts = [
        'fecEmisionDoc' => 'datetime:Y-d-m',
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
