<?php

namespace Database\Factories;

use App\Models\Internship;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Supervisor;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Internship>
 */
class InternshipFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Internship::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Générer une période de stage cohérente
        $startDate = fake()->dateTimeBetween('-1 year', 'now');
        $endDate = fake()->dateTimeBetween($startDate, '+6 months');

        return [
            'student_id' => Student::factory(), // Crée et lie un nouvel étudiant via son ID (colonne student_id)
            'teacher_id' => Teacher::factory(), // Crée et lie un nouveau professeur via son ID (colonne teacher_id)
            'supervisor_id' => Supervisor::factory(), // Crée et lie un nouveau superviseur via son ID (colonne supervisor_id)


            // --- Autres champs ---
            'internship_subject' => fake()->randomElement([
                'Développement Full Stack',
                'Analyse de Données Junior',
                'Design UX/UI Mobile',
                'Cybersécurité et Réseaux',
                'Marketing Digital et SEO',
            ]),
            "company_siret" => fake()->numerify('##############'), // Génère un SIRET de 14 chiffres
            'student_task' => fake()->paragraphs(3,true),
            'is_paid' => fake()->boolean(80), // 80% de chance d'être payé
            'start_date' => $startDate->format('Y-m-d'),
            'end_date' => $endDate->format('Y-m-d'),
            'is_remote' => fake()->boolean(30), // 30% de chance d'être en remote
        ];
    }
}
