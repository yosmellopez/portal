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
        if (!Schema::hasTable('fe_roles') || !Schema::hasColumn('fe_roles', 'role')) {
            Schema::table('fe_roles', function (Blueprint $table) {
                $table->string("role")->nullable();
            });
            DB::table('fe_roles')->where('idRoles', 1)->update(["role" => "ROLE_ADMIN"]);
            DB::table('fe_roles')->where('idRoles', 2)->update(["role" => "ROLE_RECEPTOR"]);
            DB::table('fe_roles')->where('idRoles', 3)->update(["role" => "ROLE_USER"]);
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
