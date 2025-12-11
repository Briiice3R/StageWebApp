<?php

use App\Http\Controllers\Api\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Student;
use App\Http\Controllers\Api\StudentController as ApiStudentController;
use App\Http\Controllers\Api\CompanyController as ApiCompanyController;
use App\Http\Controllers\Api\TeacherController as ApiTeacherController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix("admin")->group(function (){
    Route::get("students", [ApiStudentController::class, "index"]);
    Route::get("students/search", [ApiStudentController::class, "search"]);

    Route::get("teachers", [ApiTeacherController::class, "index"]);
    Route::get("teachers/search", [ApiTeacherController::class, "search"]);

    Route::get("companies", [ApiCompanyController::class, "index"]);
    Route::get("detailcompany", [ApiCompanyController::class, "index"]);

});
