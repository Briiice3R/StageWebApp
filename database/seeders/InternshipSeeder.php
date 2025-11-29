<?php

namespace Database\Seeders;

use App\Models\Internship;
use Illuminate\Database\Seeder;

class InternshipSeeder extends Seeder
{
    public function run()
    {
        Internship::factory()->count(20)->create();
    }
}