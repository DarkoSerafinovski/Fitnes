<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Vezba extends Model
{
    protected $table = 'vezbe';
    use HasFactory;

    protected $fillable = [
        'naziv',
        'opis',
        'slika',
        'misici_na_koje_utice',
        'savet',
        'preporuceni_broj_serija',
        'preporuceni_broj_ponavljanja',
        'video_url',
        'grupa_misica_id',
        'kategorija_id',
        'trener_id',
    ];

   
    public function grupaMisica()
    {
        return $this->belongsTo(GrupaMisica::class, 'grupa_misica_id');
    }

    public function trener()
    {
        return $this->belongsTo(User::class, 'trener_id');
    }


    public function kategorija()
    {
        return $this->belongsTo(KategorijaVezbe::class,'kategorija_id');
    }
}
