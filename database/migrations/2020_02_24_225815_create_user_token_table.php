<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTokenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('fe_usuario_token')) {
            Schema::create('fe_usuario_token', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('token', 512)
                    ->unique('token_unique')
                    ->nullable();
                $table->string('usuario', 255)
                    ->nullable();
                $table->string('email', 254)
                    ->nullable();
                $table->dateTime("token_expiration");
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
        Schema::drop('fe_usuario_token');
    }
}
