<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('fe_cliente')) {
            Schema::create('fe_cliente', function (Blueprint $table) {
                $table->string("rucClient", 11);
                $table->primary("rucClient", "fe_cliente_pk");
                $table->string("direccionClient", 1000)->nullable();
                $table->string("email")->nullable();
                $table->string("estadoCliente", 2)->nullable();
                $table->string("nombreClient")->nullable();
                $table->string("rutaImagenClient", 500)->nullable();
                $table->timestamp("updated_at")->nullable();
                $table->softDeletes();
            });
        }
        if (Schema::hasTable('fe_cliente') && !Schema::hasColumn('fe_cliente', 'updated_at')) {
            Schema::table("fe_cliente", function (Blueprint $table) {
                $table->timestamp("updated_at")->nullable();
            });
        }
        if (Schema::hasTable('fe_cliente') && !Schema::hasColumn('fe_cliente', 'deleted_at')) {
            Schema::table("fe_cliente", function (Blueprint $table) {
                $table->softDeletes();
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
        Schema::dropIfExists('fe_cliente');
    }
}
