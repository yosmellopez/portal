<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UsuarioToken extends Model
{
    protected $table = 'fe_usuario_token';
    protected $primaryKey = 'id';
    protected $fillable = ['email', 'token', 'token_expiration'];
    public $timestamps = false;
}
