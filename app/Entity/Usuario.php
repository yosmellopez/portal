<?php

namespace App\Entity;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $table = "fe_usuario";
    protected $primaryKey = "idUsuario";
    protected $fillable = ["idUsuario", "email", "nombUsuario", "estadoUsuario", "claveUsuario", "rucClient", "idRoles"];
    protected $hidden = ["claveUsuario"];
    public $timestamps = false;

//    protected $map = [
//        "username" => "nombUsuario",
//        "password" => "claveUsuario"
//    ];

    public function rol()
    {
        return $this->belongsTo('App\Entity\Rol', 'idRoles');
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getAuthIdentifier()
    {
        return $this->nombUsuario;
    }

    public function getAuthPassword()
    {
        return Hash::make($this->claveUsuario);
    }
}
