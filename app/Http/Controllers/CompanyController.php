<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CompanyController extends Controller
{
    public function index()
    {
        return Inertia::render("Companies/Index");
    }

}
