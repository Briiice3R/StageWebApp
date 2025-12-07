<?php

use App\Http\Controllers\CompanyController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Support\Facades\Route;
use Subfission\Cas\Middleware\CASAuth;

Route::get('/', function () {
    $user = cas()->user();
    $attributes = cas()->getAttributes();
    return view('CAS', compact('user', 'attributes'));
})->middleware(CASAuth::class);


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
           });
        });

        Route::prefix("teachers")->name("teachers.")->group(function(){
            Route::controller(TeacherController::class)->group(function(){
                Route::get("/", "index")->name("index");
                Route::get("/create", "create")->name("create");
            });
        });

        Route::prefix("companies")->name("companies.")->group(function(){
            Route::controller(CompanyController::class)->group(function(){
                Route::get("/", "index")->name("index");
                Route::get("/create", "create")->name("create");
            });
        });

});
