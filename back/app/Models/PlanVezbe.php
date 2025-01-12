<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class PlanVezbe extends Model
{
    protected $table = 'planovi_vezbi';
    use HasFactory;


    protected $fillable = [
        'plan_treninga_id',
        'broj_serija',
        'broj_ponavljanja',
        'vezba_id'
    ];

    
    public function planTreninga()
    {
        return $this->belongsTo(PlanTreninga::class, 'plan_treninga_id');
    }

    public function vezba()
    {
        return $this->belongsTo(Vezba::class,'vezba_id');
    }
}
