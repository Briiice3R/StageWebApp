<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\DetailCompanyController;
use Illuminate\Support\Facades\Route;

Route::prefix("admin")->name("admin.")->group(function(){
        Route::prefix("internships")->name("internships.")->group(function(){
            Route::controller(InternshipController::class)->group(function(){
                Route::get("/create", "create")->name("create");
                Route::post("/", "store")->name("store");
                Route::get("/", "index")->name("index");
            });
        });

        Route::prefix("students")->name("students.")->group(function(){
           Route::controller(StudentController::class)->group(function(){
                Route::get("/", "index")->name("index");
                Route::get("/{student_id}/internships", "internships")->name("internships");
           });
        });

        Route::prefix("teachers")->name("teachers.")->group(function(){
            Route::controller(TeacherController::class)->group(function(){
                Route::get("/", "index")->name("index");
                Route::get("/create", "create")->name("create");
                Route::post("/", "store")->name("store");
            });
        });

});

Route::prefix("companies")->name("companies.")->group(function(){
    Route::controller(CompanyController::class)->group(function(){
        Route::get("/", "index")->name("index");
        Route::get("/{siret}", "show")->name("show");
    });
});

Route::prefix("student")->name("student.")->group(function(){
    Route::get("/", function(){
        return \Inertia\Inertia::render("StudentHome/Index");
    })->name("home");

    Route::prefix("companies")->name("companies.")->group(function(){
        Route::controller(CompanyController::class)->group(function(){
            Route::get("/", "studentIndex")->name("index");
        });
    });
});
