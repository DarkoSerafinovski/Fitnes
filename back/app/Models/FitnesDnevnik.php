<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class FitnesDnevnik extends Model
{
    protected $table = 'fitnes_dnevnici';
    use HasFactory;


    protected $fillable = [
        'naslov',
        'vezbac_id',
        'kratak_opis',
    ];


    public function vezbac()
    {
        return $this->belongsTo(User::class,'vezbac_id');
    }


    public function stavkeDnevnika()
    {
        return $this->hasMany(StavkaDnevnika::class,'dnevnik_id');
    }
}
