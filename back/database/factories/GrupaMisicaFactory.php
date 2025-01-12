<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\GrupaMisica;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GrupaMisica>
 */
class GrupaMisicaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = GrupaMisica::class;
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->unique()->word,
            'opis' => $this->faker->sentence,
            'slika' => $this->faker->imageUrl(640, 480, 'fitness', true),
        ];
    }
}
