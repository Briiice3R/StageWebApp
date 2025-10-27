<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use App\Models\Internship;
use Illuminate\Support\Facades\Route;

class InternshipController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/Internships/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        dd($request->all());
        $data = $request->validate([
            "company.siren"=>["required"],
            "internship.startDate"=>["required",Rule::date()->format("d/m/Y")],
            "internship.endDate"=>["required",Rule::date()->format("d/m/Y")],
            "internship.isRemote"=>["required", "boolean:strict"],
            "internship.subject"=>["required", "alpha_num:ascii"],
            "internship.studentTask"=>["required", "alpha_num:ascii"],
            "internship.student"=>["required", "alpha_dash:ascii"],
            "internship.teacher"=>["required"],
            "supervisor.name"=>["required", "alpha_dash:ascii"],
            "supervisor.mail"=>["required", "email"],
            "supervisor.phone"=>["required", "regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/"],
            
        ]);
        // dd($data);
        return redirect()->route("internships");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
