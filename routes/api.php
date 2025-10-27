<?php

use App\Http\Controllers\Api\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Student;
use App\Http\Controllers\Api\StudentController as ApiStudentController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix("admin")->group(function (){
    Route::get("students", [ApiStudentController::class, "index"]);

    Route::get("students/search", [ApiStudentController::class, "search"]);

});
