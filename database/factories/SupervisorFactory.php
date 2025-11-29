<?php

namespace Database\Factories;

use App\Models\Supervisor;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supervisor>
 */
class SupervisorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model
     *
     * @var string
     */
    protected $model = Supervisor::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'mail' => fake()->unique()->safeEmail(),
            'phone' => fake()->numerify('0# ## ## ## ##'),
            'company_siren' => Company::factory(), 
        ];
    }
}