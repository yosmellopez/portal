<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = "fe_roles";
    protected $primaryKey = "idRoles";
    protected $fillable = ["idRoles", "nombRoles", "role"];
}
