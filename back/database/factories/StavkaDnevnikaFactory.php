<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\StavkaDnevnika;
use App\Models\FitnesDnevnik;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StavkaDnevnika>
 */
class StavkaDnevnikaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = StavkaDnevnika::class;
    public function definition(): array
    {
        return [
            'dnevnik_id'=>FitnesDnevnik::inRandomOrder()->first()->id,
            'datum'=>$this->faker->date('d-m-Y'),
            'naziv_aktivnosti'=>$this->faker->sentence,
            'komentar'=>$this->faker->paragraph,
        ];
    }
}
