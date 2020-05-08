<?php

use App\Entity\Cliente;
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
        Cliente::create([
            "rucClient" => "20510910517",
            "email" => "vaguilar@vsperu.com",
            "direccionClient" => "Av. Jose Pardo Nro. 575 Dpto. 301 (Alt Cdra 7 Av Pardo Alt de Plaza Vea), Miraflores, Lima, Perú",
            "estadoCliente" => "1",
            "nombreClient" => "VENTURA SOLUCIONES S.A.C.",
            "rutaImagenClient" => null,
            "updated_at" => null
        ]);
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
