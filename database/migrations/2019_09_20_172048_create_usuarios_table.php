<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('fe_usuario')) {
            Schema::create('fe_usuario', function (Blueprint $table) {
                $table->bigIncrements("idUsuario");
                $table->string("email")->nullable();
                $table->string("nombUsuario")->nullable();
                $table->string("estadoUsuario")->nullable();
                $table->string("claveUsuario")->nullable();
                $table->string("rucClient")->nullable();
                $table->integer("idRoles");
                $table->foreign("idRoles")->references('idRoles')->on('fe_roles');
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
        Schema::dropIfExists('fe_usuario');
    }
}
