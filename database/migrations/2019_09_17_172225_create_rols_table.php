<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable('fe_roles') && !Schema::hasColumn('fe_roles', 'role')) {
            Schema::table('fe_roles', function (Blueprint $table) {
                $table->string("role")->nullable();
            });
            DB::table('fe_roles')->where('idRoles', 1)->update(["role" => "ROLE_ADMIN"]);
            DB::table('fe_roles')->where('idRoles', 2)->update(["role" => "ROLE_RECEPTOR"]);
            DB::table('fe_roles')->where('idRoles', 3)->update(["role" => "ROLE_USER"]);
        }
        if (!Schema::hasTable('fe_roles')) {
            Schema::create('fe_roles', function (Blueprint $table) {
                $table->integer("idRoles");
                $table->primary("idRoles", "fe_rol_pk");
                $table->string("nombRoles")->nullable();
                $table->string("role")->nullable();
            });
            if (Schema::hasTable('fe_roles')) {
                DB::table('fe_roles')->insert(["idRoles" => 1, "nombRoles" => "Emisor Administrador", "role" => "ROLE_ADMIN"]);
                DB::table('fe_roles')->insert(["idRoles" => 2, "nombRoles" => "Receptor Administrador", "role" => "ROLE_RECEPTOR"]);
                DB::table('fe_roles')->insert(["idRoles" => 3, "nombRoles" => "Receptor Usuario", "role" => "ROLE_USER"]);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fe_roles');
    }
}
