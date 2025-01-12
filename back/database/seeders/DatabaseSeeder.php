<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\FitnesDnevnik;
use App\Models\StavkaDnevnika;
use App\Models\GrupaMisica;
use App\Models\Vezba;
use App\Models\PlanVezbe;
use App\Models\PlanTreninga;
use App\Models\KategorijaVezbe;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $korisnici = User::factory()->count(20)->create();
        $dnevnici = FitnesDnevnik::factory()->count(12)->create();
        $stavkeDnevnika = StavkaDnevnika::factory()->count(30)->create();
        $grupeMisica = GrupaMisica::factory()->count(7)->create();
        $kategorijeVezbi = KategorijaVezbe::factory()->count(10)->create();
        $vezbe = Vezba::factory()->count(80)->create();
        $planTreninga = PlanTreninga::factory()->count(12)->create();
        $planoviVezbi = PlanVezbe::factory()->count(100)->create();
    }
}
