<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\DetailCompanyController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;


    // --- ZONE PUBLIQUE ---
    // On isole la route index ici pour qu'elle soit accessible sans connexion


Route::prefix("admin")->name("admin.")->group(function(){

    // --- ZONE PRIVÉE (Nécessite AUTH) ---
    // Tout ce qui est dans ce groupe nécessite d'être connecté
    Route::middleware(['auth', "role:admin"])->group(function(){

        // Le reste des routes Internships (Create, Store...)
        Route::prefix("internships")->name("internships.")->group(function(){
            Route::controller(InternshipController::class)->group(function(){
                Route::get("/create", "create")->name("create");
                Route::post("/", "store")->name("store");
                Route::get("/", "index")->name("index");
            });
        });

        // Les routes Students (Entièrement protégées)
        Route::prefix("students")->name("students.")->group(function(){
            Route::controller(StudentController::class)->group(function(){
                Route::get("/", "index")->name("index");
                Route::get("/{student_id}/internships", "internships")->name("internships");
           });
            });
        });

        // Les routes Teachers (Entièrement protégées)
        Route::prefix("teachers")->name("teachers.")->group(function(){
            Route::controller(TeacherController::class)->group(function(){
                Route::get("/", "index")->name("index");
                Route::get("/create", "create")->name("create");
                Route::post("/", "store")->name("store");
            });
        });
});

Route::middleware(['auth'])->group(function() {
    Route::prefix("internships")->name("internships.")->group(function(){
        Route::get("/", [InternshipController::class, 'index'])->name("index");
    });

    Route::prefix("companies")->name("companies.")->group(function () {
        Route::controller(CompanyController::class)->group(function () {
            Route::get("/", "index")->name("index");
            Route::get("/{siret}", "show")->name("show");
        });
    });
});

Route::prefix("auth")->name("auth.")->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::get("/login", "index")->name("index");
        Route::post("/login", "auth")->name("auth");
    });
});
Route::middleware('auth')->post('/logout', [AuthController::class, 'destroy'])->name('logout');



Route::get('/home', [HomeController::class, 'index'])->name('home');

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
