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

    /**
     * Display companies that have internships (for students).
     */
    public function studentIndex(){
        // Récupérer tous les SIRET uniques des entreprises qui ont des stages
        $companySirets = Internship::distinct()->pluck('company_siret');

        // Enrichir avec les données des entreprises
        $companies = [];
        foreach($companySirets as $siret){
            $company = $this->companyService->getBySiret($siret);
            if($company){
                $company['internships_count'] = Internship::where('company_siret', $siret)->count();
                $companies[] = $company;
            }
        }

        return Inertia::render("StudentCompanies/Index", [
            'companies' => $companies,
        ]);
    }

}
