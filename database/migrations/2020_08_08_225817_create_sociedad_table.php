<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSociedadTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('fe_sociedad')) {
            Schema::create('fe_sociedad', function (Blueprint $table) {
                $table->string("bdId");
                $table->primary("bdId", "fe_sociedad_pk");
                $table->string("servidorBaseDatos");
                $table->string("servidorLicencia");
                $table->string("tipoServidor");
                $table->string("nombreBaseDatos");
                $table->string("usuarioBaseDatos");
                $table->string("passwordBaseDatos");
                $table->string("usuarioERP");
                $table->string("passwordERP");
                $table->string("rucSociedad")->nullable();
                $table->string("rutaArchivos")->nullable();
                $table->string("rutaCertificadoDigital");
                $table->string("passwordCertificadoDigital");
                $table->string("usuarioSecundario");
                $table->string("passwordSecundario");
                $table->string("tipoErp");
                $table->string("logoSociedad");
                $table->string("tipoIntegracionSunat");
                $table->string("clienteSunat");
                $table->string("publicacionWebServiceUrl");
                $table->string("usuarioWebServicePublicacion");
                $table->string("passwordWebServicePublicacion");
                $table->integer("posicion")->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fe_sociedad');
    }
}
