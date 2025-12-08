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
        Schema::create('supervisors', function (Blueprint $table) {
            $table->id();
            $table->string("first_name");
            $table->string("last_name");
            $table->string("mail")->nullable();
            $table->string("phone")->nullable();

            $table->string("company_siret");
            $table->string("internship_id");

            $table->foreign("company_siret")->references("company_siret")->on("internships")->cascadeOnDelete();
            $table->foreign("internship_id")->references("id")->on("internships")->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supervisors');
    }
};
