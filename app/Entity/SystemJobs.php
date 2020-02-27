<?php


namespace App\Entity;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class SystemJobs extends Model
{
    const DELAY_IN_SECONDS = 10;
    protected $table = 'system_jobs';
    protected $primaryKey = 'id';
    protected $fillable = ['id', 'available_at'];
    public $timestamps = false;

    public static function addSecondsToQueue()
    {
        $job = SystemJobs::orderBy('available_at', 'desc')->first();
        $fechaActual = Carbon::now();
        $siguienteFecha = $fechaActual->addRealSeconds(self::DELAY_IN_SECONDS);
        if ($job) {
            $now = Carbon::now()->timestamp;
            $jobTimestamp = $job->available_at + self::DELAY_IN_SECONDS;
            $result = $jobTimestamp - $now;
            $data = array("id" => $job->id + 1, "available_at" => $siguienteFecha);
            $systemJobs = new SystemJobs();
            $systemJobs->fill($data)->save();
            return $result;
        } else {
            $data = array("id" => 1, "available_at" => $siguienteFecha);
            $systemJobs = new SystemJobs();
            $systemJobs->fill($data)->save();
            return 0;
        }
    }
}