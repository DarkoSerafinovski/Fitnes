<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class GrupaMisica extends Model
{
    protected $table = 'grupe_misica';
    use HasFactory;


    protected $fillable = [
        'naziv',
        'opis',
        'slika',
    ];

    public function vezbe()
    {
        return $this->hasMany(Vezba::class,'grupa_misica_id');
    }
}
