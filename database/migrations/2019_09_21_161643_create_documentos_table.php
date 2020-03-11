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
                $table->string("rucClient", 11)->nullable();
                $table->string("monedaTransaccion")->nullable();
                $table->string("token")->nullable();
                $table->foreign("rucClient")->references('rucClient')->on('fe_cliente');
            });
        }
        if (Schema::hasTable('fe_docelectronico') && !Schema::hasColumn('fe_docelectronico', 'token')) {
            Schema::table("fe_docelectronico", function (Blueprint $table) {
                $table->string("token")->nullable();
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
