<?php

use App\Entity\Cliente;
use App\Entity\Usuario;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (!Cliente::where('rucClient', '=', "20510910517")->exists()) {
            $this->call(ClienteTableSeeder::class);
        }

        if (!Usuario::where('idUsuario', '=', 1)->exists()) {
            $this->call(UsuarioTableSeeder::class);
        }
    }
}
