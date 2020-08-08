<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

class GeneralConfig extends Model
{
    protected $table = "fe_general_config";
    protected $primaryKey = "id";
    protected $fillable = ["id", "fecha", "configuracion"];
    public $timestamps = false;
}
