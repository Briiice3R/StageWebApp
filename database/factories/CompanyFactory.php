<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Le nom du modèle correspondant.
     *
     * @var string
     */
    protected $model = Company::class;

    /**
     * Définit l'état par défaut du modèle.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Assurez-vous que ces colonnes (name, city, siren) existent bien dans votre table 'companies'
        return [
            'name' => $this->faker->company(),
            'city' => $this->faker->city(),
            'company_siren' => $this->faker->numerify('#########'), // Génère un numéro SIREN à 9 chiffres
            // Ajoutez ici tout autre champ obligatoire de votre modèle Company
        ];
    }
}