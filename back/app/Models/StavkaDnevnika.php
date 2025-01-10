<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class StavkaDnevnika extends Model
{
    protected $table = 'stavke_dnevnika';
    use HasFactory;

    protected $fillable = [
        'dnevnik_id',
        'datum',
        'naziv_aktivnosti',
        'komentar'
    ];



    protected $casts = [
        'datum' => 'date', 
    ];


    public function dnevnik()
    {
        return $this->belongsTo(FitnesDnevnik::class,'dnevnik_id');
    }
}
