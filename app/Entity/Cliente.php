<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use SoftDeletes;

    protected $table = 'fe_cliente';
    protected $primaryKey = 'rucClient';
    protected $fillable = ['direccionClient', 'email', 'estadoCliente', 'nombreClient', 'rucClient', 'rutaImagenClient', "correoSecundario", 'updated_at'];
    protected $casts = ['rucClient' => 'string'];

    protected $dates = ['deleted_at'];

    public $timestamps = false;
}
