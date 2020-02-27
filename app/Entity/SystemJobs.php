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
        if ($job) {
            $now = Carbon::now()->timestamp;
            $jobTimestamp = $job->available_at + self::DELAY_IN_SECONDS;
            $result = $jobTimestamp - $now;
            return $result;
        } else {
            return 0;
        }
    }
}