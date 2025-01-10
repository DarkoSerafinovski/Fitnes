<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\KategorijaVezbe;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KategorijaVezbe>
 */
class KategorijaVezbeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = KategorijaVezbe::class;
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->unique()->word,
        ];
    }
}
