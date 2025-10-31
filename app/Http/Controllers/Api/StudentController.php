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
        return response()->json([
            "data"=>$students
        ]);
    }

    public function search(Request $request){
        if(!$request->has("q")){
            return response()->json([
                "error" => "Vous devez spécifier un nom."
            ]);
        }
        $query = $request->query("q");
        $students = Student::query()
            ->whereRaw("LOWER(first_name || ' ' || last_name) LIKE LOWER(?) OR student_id LIKE ?", ["%".strtolower($query)."%", "%".strtolower($query)."%"])
            ->get();
        
        return response()->json([
            "data"=> $students
        ], 200);
    }
}
