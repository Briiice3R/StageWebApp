<?php
use App\Http\Controllers\Student\InternshipController as StudentInternshipController;
use App\Http\Controllers\Admin\InternshipController as AdminInternshipController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get("/internships", [StudentInternshipController::class, "index"])
        ->name("internships");
Route::prefix("admin")->name("admin.")->group(function(){
        Route::get("/internships/create", [AdminInternshipController::class, "create"])
        ->name("internships.create");
        Route::post("/internships", [AdminInternshipController::class, "store"])
        ->name("internships.store");

});
