<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use App\Models\Supervisor;
use App\Services\CompanyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class InternshipController extends Controller
{
    public function __construct(protected CompanyService $companyService){}
    public function index(): Response
    {
        // Récupération des stages avec les étudiants (Eager Loading)
        $internships = Internship::with(['student'])->get();

        // Enrichir chaque stage avec les données de l'entreprise
        $internships->transform(function ($internship) {
            // Récupérer les données de l'entreprise via le service
            $company = $this->companyService->getBySiret($internship->company_siret);

            if ($company) {
                // Ajouter les données de l'entreprise à l'internship
                $internship->company_name = $company['nom_complet'];
                $internship->company_siren = $company['siren'];
                $internship->company_address = $company['siege']['adresse'];
                $internship->company_city = $company['siege']['commune'];
                $internship->company_postal_code = $company['siege']['code_postal'];
                $internship->company_effectif = $company['effectif_salarie'];
                $internship->company_is_etablissement = $company['siege']['isEtablissement'];

                // OU ajouter tout l'objet company (plus simple)
                $internship->company = $company;
            } else {
                // Si l'entreprise n'est pas trouvée
                $internship->company = null;
            }

            return $internship;
        });
        return Inertia::render("Internships/Index", [
            'internships' => $internships,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        /** @noinspection PhpParamsInspection */
        return Inertia::render("Internships/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $requestData = $request->all();

        // ...

// 1. Gérer isRemote
        if (isset($requestData['internship']['isRemote'])) {
            $isRemoteBool = filter_var($requestData['internship']['isRemote'], FILTER_VALIDATE_BOOLEAN);
            $request->merge(['internship.isRemote' => $isRemoteBool]);
        }

// 2. Gérer isPaid
        if (isset($requestData['internship']['isPaid'])) {
            $isPaidBool = filter_var($requestData['internship']['isPaid'], FILTER_VALIDATE_BOOLEAN);
            $request->merge(['internship.isPaid' => $isPaidBool]);
        }

// ... Le reste du code ne change pas

        $data = $request->validate([
            "internship.startDate" => ["required", "date_format:d/m/Y"],
            "internship.endDate" => ["required", "date_format:d/m/Y", "after:internship.startDate"],
            "internship.isRemote" => ["required", "boolean"],
            "internship.isPaid" => ["required", "boolean"],
            "internship.subject" => ["required", "string", "max:255"],
            "internship.studentTask" => ["required", "string", "max:255"],
            "internship.comment" => ["nullable", "string"],
            "teacher.teacher_id" => ["required", "exists:teachers,teacher_id"],
            "student.student_id" => ["required", "exists:students,student_id"],
            "company.siret" => ["required", "regex:/^\d{14}$/"], // ✅ SIRET = 14 chiffres, pas 9
            "supervisor.first_name" => ["required", "string", "max:255"],
            "supervisor.last_name" => ["required", "string", "max:255"],
            "supervisor.mail" => ["required", "email", "max:255"],
            "supervisor.phone" => ["required", "regex:/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/"],
        ]);

        // Créer le superviseur
        $supervisor = Supervisor::create([
            "first_name" => $data["supervisor"]["first_name"],
            "last_name" => $data["supervisor"]["last_name"],
            "mail" => $data["supervisor"]["mail"],
            "phone" => $data["supervisor"]["phone"],
            "company_siret" => $data["company"]["siret"],
        ]);

        // Créer le stage
        Internship::create([
            "company_siret" => $data["company"]["siret"],
            "start_date" => \DateTime::createFromFormat("d/m/Y", $data["internship"]["startDate"])->format("Y-m-d"),
            "end_date" => \DateTime::createFromFormat("d/m/Y", $data["internship"]["endDate"])->format("Y-m-d"),
            "is_remote" => $data["internship"]["isRemote"],
            "is_paid" => $data["internship"]["isPaid"],
            "internship_subject" => $data["internship"]["subject"],
            "student_task" => $data["internship"]["studentTask"],
            "comment" => $data["internship"]["comment"] ?? null,
            "student_id" => $data["student"]["student_id"],
            "teacher_id" => $data["teacher"]["teacher_id"],
            "supervisor_id" => $supervisor->id,
        ]);

        // ✅ Redirection au lieu de render
        return redirect()->route('admin.internships.index')
            ->with('success', 'Stage enregistré avec succès !');
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
