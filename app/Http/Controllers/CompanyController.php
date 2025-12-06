<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use App\Services\CompanyService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function __construct(protected CompanyService $companyService){}


    public function index(){
        return Inertia::render("Companies/Index");
    }

    public function show($siret){
        if(strlen($siret) != 14){
            abort(404, "SIRET invalide");
        }
        $company = $this->companyService->getBySiret($siret);
        if(!$company){
            abort(404, "Entreprise non trouvée");
        }
        $countInternships = Internship::where('company_siret', $siret)->count();
        $company['internships_count'] = $countInternships;
        return Inertia::render("Companies/Details", [
            'company' => $company,
        ]);
    }
}
