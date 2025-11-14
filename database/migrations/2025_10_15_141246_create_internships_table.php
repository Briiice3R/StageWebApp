<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('internships', function (Blueprint $table) {
            $table->id();
            $table->string("company_siren");
            $table->date("start_date");
            $table->date("end_date");
            $table->boolean("is_remote");
            $table->boolean("is_paid");
            $table->string("internship_subject");
            $table->string("student_task");
            $table->longText("comment")->nullable();

            $table->string("student_id");
            $table->string("teacher_id");
            $table->string("supervisor_id");

            $table->foreign("student_id")->references("student_id")->on("students");
            $table->foreign("teacher_id")->references("id")->on("teachers");
            $table->foreign("supervisor_id")->references("id")->on("supervisors");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internships');
    }
};
