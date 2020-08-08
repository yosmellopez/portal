<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

class ReglaConfig extends Model
{
    protected $table = "fe_regla_formato";
    protected $primaryKey = "fEKey";
    protected $fillable = ["fEKey", "fETipoDOC", "fECampoDOC", "fEOperador", "fEValorComparativo", "fEDOCFinal"];
    public $timestamps = false;
}
