<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use App\Http\Controllers\Api\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DetailCompanyController extends Controller
{
    public function index(): Response
    {
        $company = 
        return Inertia::render("DetailCompany/Index");
    }
    
    public function create(): Response
    {
        return Inertia::render("DetailCompany/Index");
    }
}
