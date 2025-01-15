<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\FitnesDnevnik;
use App\Models\User;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FitnesDnevnikFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = FitnesDnevnik::class;
    public function definition(): array
    {
        return [
            'naslov'=>$this->faker->sentence,
            'vezbac_id'=>User::where('role', 'vezbac')->inRandomOrder()->first()->id,
            'kratak_opis'=>$this->faker->paragraph,
        ];
    }
}
