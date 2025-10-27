<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Student;

class StudentController extends Controller
{
    public function index(Request $request){
        $students = Student::query()
            ->get();
        return response()->json($students);
    }

    public function search(Request $request){
        if(!$request->has("q")){
            return response()->json([
                "error" => "Vous devez spécifier un nom."
            ]);
        }
        $query = $request->query("q");
        $students = Student::query()
            ->whereRaw("LOWER(CONCAT(first_name, last_name)) LIKE LOWER(?)% OR student_id LIKE ?%", [$query]);
        return response()->json($students, 200);
    }
}
