<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Teacher;

class TeacherController extends Controller
{
    public function index(Request $request){
        $teachers = Teacher::query()
            ->get();
        return response()->json([
            "data"=>$teachers
        ]);
    }

    public function search(Request $request){
        if(!$request->has("q")){
            return response()->json([
                "error" => "Vous devez spécifier un nom."
            ]);
        }
        $query = $request->query("q");
        $teachers = Teacher::query()
            ->whereRaw("LOWER(first_name || ' ' || last_name) LIKE LOWER(?) OR teacher_id LIKE ?", ["%".strtolower($query)."%", "%".strtolower($query)."%"])
            ->get();

        return response()->json([
            "data"=> $teachers
        ], 200);
    }
}
