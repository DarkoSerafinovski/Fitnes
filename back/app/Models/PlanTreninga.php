<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class PlanTreninga extends Model
{
    protected $table = 'planovi_treninga';
    use HasFactory;


    protected $fillable = [
        'vezbac_id',
        'naziv',
        'datum',
    ];

    
    public function vezbac()
    {
        return $this->belongsTo(User::class, 'vezbac_id');
    }



    public function planoviVezbi()
    {
        return $this->hasMany(PlanVezbe::class,'plan_treninga_id');
    }

    protected $casts = [
        'datum' => 'datetime', 
    ];

    
}
