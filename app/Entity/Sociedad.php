<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

class Sociedad extends Model
{
    protected $table = 'fe_sociedad';
    protected $primaryKey = 'bdId';
    protected $fillable = ["bdId", "servidorBaseDatos", "servidorLicencia", 'tipoServidor', 'nombreBaseDatos', 'usuarioBaseDatos', "passwordBaseDatos", "usuarioERP", "passwordERP", "rucSociedad",
        "rutaArchivos", "rutaCertificadoDigital", "passwordCertificadoDigital", "usuarioSecundario", "passwordSecundario", "tipoErp", "logoSociedad", "tipoIntegracionSunat", "clienteSunat",
        "publicacionWebServiceUrl", "usuarioWebServicePublicacion", "passwordWebServicePublicacion", "posicion"];
    public $timestamps = false;
}
