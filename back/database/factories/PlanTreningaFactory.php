<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\PlanTreninga;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PlanTreninga>
 */
class PlanTreningaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = PlanTreninga::class;
    public function definition(): array
    {
        return [
            'vezbac_id' => User::where('role', 'vezbac')->inRandomOrder()->first()->id,
            'naziv' => $this->faker->sentence,
            'datum'=> $this->faker->dateTime,
        ];
    }
}
