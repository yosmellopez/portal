<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocumentosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('fe_docelectronico')) {
            Schema::create('fe_docelectronico', function (Blueprint $table) {
                $table->bigIncrements("idDocumento");
                $table->string("serie")->nullable();
                $table->string("numSerie")->nullable();
                $table->date("fecEmisionDoc")->nullable();
                $table->string("estadoSunat")->nullable();
                $table->string("estadoWeb")->nullable();
                $table->string("tipoDoc")->nullable();
                $table->string("tipoTransaccion")->nullable();
                $table->double("total", null, 4)->nullable();
                $table->string("docPdf", 500)->nullable();
                $table->string("docXml", 500)->nullable();
                $table->string("docCdr", 500)->nullable();
                $table->string("correoSecundario", 1000)->nullable();
                $table->string("emailEmisor", 254)->nullable();
                $table->string("rucClient", 11)->nullable();
                $table->string("rsRuc", 11)->nullable();
                $table->string("monedaTransaccion")->nullable();
                $table->string("token")->nullable();
                $table->foreign("rucClient")->references('rucClient')->on('fe_cliente');
                $table->timestamps();
            });
        }
        if (Schema::hasTable('fe_docelectronico') && !Schema::hasColumn('fe_docelectronico', 'serie')) {
            Schema::table("fe_docelectronico", function (Blueprint $table) {
                $table->string("serie")->nullable();
            });
        }
        if (Schema::hasTable('fe_docelectronico') && !Schema::hasColumn('fe_docelectronico', 'token')) {
            Schema::table("fe_docelectronico", function (Blueprint $table) {
                $table->string("token")->nullable();
            });
        }
        if (Schema::hasTable('fe_docelectronico') && !Schema::hasColumn('fe_docelectronico', 'correoSecundario')) {
            Schema::table("fe_docelectronico", function (Blueprint $table) {
                $table->string("correoSecundario", 1000)->nullable();
            });
        }
        if (Schema::hasTable('fe_docelectronico') && !Schema::hasColumn('fe_docelectronico', 'emailEmisor')) {
            Schema::table("fe_docelectronico", function (Blueprint $table) {
                $table->string("emailEmisor", 254)->nullable();
            });
        }
        if (Schema::hasTable('fe_docelectronico') && !Schema::hasColumn('fe_docelectronico', 'rsRuc') && !Schema::hasColumn('fe_docelectronico', 'rsRuc')) {
            Schema::table("fe_docelectronico", function (Blueprint $table) {
                $table->string("rsRuc", 11)->nullable();
            });
        }
        if (Schema::hasTable('fe_docelectronico') && !Schema::hasColumn('fe_docelectronico', 'created_at') && !Schema::hasColumn('fe_docelectronico', 'updated_at')) {
            Schema::table("fe_docelectronico", function (Blueprint $table) {
                $table->timestamps();
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
        Schema::dropIfExists('fe_docelectronico');
    }
}
