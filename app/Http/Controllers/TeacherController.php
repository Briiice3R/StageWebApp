<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Internship;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //Inertia::render("Admin/Teachers/Index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Teachers/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $data = $request->validate([
            'teacher.firstname' => ['required', 'string', 'max:255'],
            'teacher.lastname' => ['required', 'string', 'max:255'],
            'teacher.email' => ['required', 'email', 'max:255', 'unique:teachers,email'],
        ]);

        Teacher::create([
            'first_name' => $data['teacher']['firstname'],
            'last_name' => $data['teacher']['lastname'],
            'email' => $data['teacher']['email'],
        ]);

        return redirect()->route('teachers.index')
            ->with('success', 'Professeur créé avec succès !');
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
