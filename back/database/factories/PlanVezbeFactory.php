<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PlanVezbe;
use App\Models\PlanTreninga;
use App\Models\Vezba;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PlanVezbe>
 */
class PlanVezbeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = PlanVezbe::class;
    public function definition(): array
    {
        return [
            'plan_treninga_id' =>  PlanTreninga::inRandomOrder()->first()->id,
            'vezba_id'=>Vezba::inRandomOrder()->first()->id,
            'broj_ponavljanja' => $this->faker->numberBetween(1, 5),
            'broj_serija'=>$this->faker->numberBetween(8, 15),
        ];
    }
}
