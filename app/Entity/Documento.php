<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

class Documento extends Model
{
    protected $table = 'fe_docelectronico';
    protected $primaryKey = 'idDocumento';
    protected $fillable = ["idDocumento", "numSerie", "fecEmisionDoc", 'estadoSunat', 'estadoWeb', 'tipoDoc', "tipoTransaccion", "total", "docPdf", "docXml", "docCdr",
        "rucClient", "rsRuc", "monedaTransaccion", "token", "correoSecundario", "emailEmisor", "serie", "created_at", "updated_at", "start_at", "end_at"];
    protected $hidden = ["created_at", "updated_at"];
    protected $map = [
        'tipoDocumento' => 'tipoDoc'
    ];
    protected $casts = [
        'fecEmisionDoc' => 'datetime:Y-d-m',
    ];
    protected $dates = ['created_at', 'updated_at'];

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
