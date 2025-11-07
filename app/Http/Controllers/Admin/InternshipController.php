<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Models\Internship;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Inertia\Response;

class InternshipController extends Controller
{
    public function index(): Response{
        $internships = Internship::all();
        /** @noinspection PhpParamsInspection */
        return Inertia::render("Admin/Internships/Index", [
            "internships" => $internships
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        /** @noinspection PhpParamsInspection */
        return Inertia::render("Admin/Internships/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {

        $data = $request->validate([
            "internship.startDate"=>["required",Rule::date()->format("d/m/Y")],
            "internship.endDate"=>["required",Rule::date()->format("d/m/Y")],
            "internship.isRemote"=>["required", "boolean:strict"],
            "internship.subject"=>["required", "alpha_num:ascii"],
            "internship.studentTask"=>["required", "alpha_num:ascii"],
            "internship.teacher"=>["required"],
            "student.student_id"=>["required", "alpha_dash:ascii"],
            "company.siren" => ["required", "regex:/^\d{9}$/"],
            "supervisor.first_name"=>["required", "alpha_dash:ascii"],
            "supervisor.last_name"=>["required", "alpha_dash:ascii"],
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
