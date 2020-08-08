<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

class ResumenConfig extends Model
{
    protected $table = "fe_resumen_config";
    protected $primaryKey = "id";
    protected $fillable = ["id", "fecha", "hora"];
}
