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
                $table->increments('id');
                $table->string('token', 512)
                    ->unique()
                    ->nullable()
                    ->default(null);
                $table->string('email', 254)
                    ->nullable()
                    ->default(null);
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
