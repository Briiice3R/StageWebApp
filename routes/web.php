<?php
use App\Http\Controllers\Internships\InternshipController;
use App\Http\Controllers\Internships\Admin\AdminInternshipController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get("/internships", [InternshipController::class, "index"])
        ->name("internships");
Route::prefix("admin")->name("admin.")->group(function(){
        Route::get("/internships/create", [AdminInternshipController::class, "create"])
        ->name("internships.create");
        Route::post("/internships", [AdminInternshipController::class, "store"])
        ->name("internships.store");

});
