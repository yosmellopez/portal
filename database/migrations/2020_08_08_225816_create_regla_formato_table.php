<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReglaFormatoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('fe_regla_formato')) {
            Schema::create('fe_regla_formato', function (Blueprint $table) {
                $table->string("fEKey");
                $table->primary("fEKey", "fe_regla_pk");
                $table->string("fETipoDOC");
                $table->string("fECampoDOC");
                $table->string("fEOperador");
                $table->string("fEValorComparativo");
                $table->string("fEDOCFinal");
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
        Schema::dropIfExists('fe_regla_formato');
    }
}
