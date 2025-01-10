<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Vezba;
use App\Models\GrupaMisica;
use App\Models\User;
use App\Models\KategorijaVezbe;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vezba>
 */
class VezbaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Vezba::class;
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->word,
            'opis' => $this->faker->paragraph,
            'misici_na_koje_utice' => $this->faker->sentence,
            'savet'=>$this->faker->sentence,
            'video_url' => $this->faker->url .'mp4',
            'grupa_misica_id' => GrupaMisica::inRandomOrder()->first()->id,
            'kategorija_id'=>KategorijaVezbe::inRandomOrder()->first()->id,
            'trener_id' => User::where('role', 'trener')->inRandomOrder()->first()->id,
        ];
    }
}
