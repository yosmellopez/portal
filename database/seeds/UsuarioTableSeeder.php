<?php

use App\Entity\Usuario;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class UsuarioTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        Usuario::create([
            "idUsuario" => 1,
            "email" => "vaguilar@vsperu.com",
            "nombUsuario" => "admin",
            "claveUsuario" => "43f6892b19a725cbb5c4048f88337c79",
            "estadoUsuario" => "1",
            "rucClient" => "20510910517",
            "idRoles" => 1
        ]);
        Model::reguard();
    }
}
