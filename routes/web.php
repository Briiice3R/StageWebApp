<?php
use App\Http\Controllers\Student\InternshipController as StudentInternshipController;
use App\Http\Controllers\Admin\InternshipController as AdminInternshipController;
use App\Http\Controllers\Admin\TeacherController as AdminTeacherController;
use App\Http\Controllers\Admin\StudentController as StudentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix("admin")->name("admin.")->group(function(){
        Route::prefix("internships")->name("internships.")->group(function(){
            Route::controller(AdminInternshipController::class)->group(function(){
                Route::get("/create", "create")->name("create");
                Route::post("/", "store")->name("store");
                Route::get("/", "index")->name("index");
            });
        });

        Route::prefix("students")->name("students.")->group(function(){
           Route::controller(StudentController::class)->group(function(){
                Route::get("/", "index")->name("index");
           });
        });

        Route::prefix("teachers")->name("teachers.")->group(function(){
            Route::controller(AdminTeacherController::class)->group(function(){
                Route::get("/", "index")->name("index");
                Route::get("/create", "create")->name("create");
            });
        });

});
