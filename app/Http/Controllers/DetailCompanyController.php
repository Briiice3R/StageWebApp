<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Inertia\Response;
use App\Models\Internship;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;


class DetailCompanyController extends Controller
{
    protected CompanyController $controller;

    /**
     * Affiche la page principale sans données
     */
    public function index(): Response
    {
        return Inertia::render("DetailCompany/Index");
    }

    /**
     * Affiche les détails d'une entreprise via son SIRET
     */
    public function show($siret)
    {
        
        try {
            // Appel à l'API Recherche Entreprises
            $response = Http::get('https://recherche-entreprises.api.gouv.fr/search', [
                'q' => $siret,
                'per_page' => 1
            ]);

            if (!$response->successful()) {
                return Inertia::render('DetailCompany/Index', [
                    'error' => 'Impossible de récupérer l’entreprise',
                    'siret' => $siret,
                ]);
            }

            $data = $response->json();
            $result = $data['results'][0] ?? null;

            if (!$result) {
                return Inertia::render('DetailCompany/Index', [
                    'error' => 'Entreprise non trouvée',
                    'siret' => $siret,
                ]);
            }

            // Mapper l'objet pour la vue
            $company = [
                'siren' => $result['siren'] ?? null,
                'siret' => $result['siege']['siret'] ?? $siret,
                'nom_complet' => $result['nom_complet'] ?? $result['nom_raison_sociale'] ?? null,

                // Infos établissement principal / siège
                'siege' => $result['siege'] ?? null,
                'etablissement' => [
                    'adresse' => $result['siege']['adresse'] ?? null,
                    'code_postal' => $result['siege']['code_postal'] ?? null,
                    'commune' => $result['siege']['libelle_commune'] ?? null,
                    'siret' => $result['siege']['siret'] ?? null,
                ],

                // Détails
                'activite_principale' => $result['activite_principale'] ?? null,
                $libelle = $this->convertitCodeNaf($result['section_activite_principale'] ?? null),
                'libelle_activite_principale' => $libelle,
                '$internship_count' => $this->countInternships($result['siren'] ?? null),
                'tranche_effectif_salarie' => $result['tranche_effectif_salarie'] ?? null,

                // Dates
                'date_creation' => $result['date_creation'] ?? null,

                // Établissements associés avec calcul d'effectif
                'matching_etablissements' => array_map(function ($etab) {
                    $effectif = $this->calculeCodeEffectif($etab['tranche_effectif_salarie'] ?? null);
                    return [
                        'siret' => $etab['siret'] ?? null,
                        'adresse' => $etab['adresse'] ?? null,
                        'activite_principale' => $etab['activite_principale'] ?? null,
                        'tranche_effectif_salarie' => $etab['tranche_effectif_salarie'] ?? null,
                        'effectif' => $effectif,
                    ];
                }, $result['matching_etablissements'] ?? []),
            ];

            return Inertia::render('DetailCompany/Index', [
                'company' => $company,
                'siret' => $siret,
            ]);

        } catch (\Exception $e) {
            return Inertia::render('DetailCompany/Index', [
                'error' => 'Erreur lors de la récupération des données',
                'siret' => $siret,
            ]);
        }
    }

    /**
     * Transforme le code de tranche effectif en texte lisible
     */
    public function calculeCodeEffectif($trancheEffectif)
    {
        switch ($trancheEffectif) {
            case '01': return '1 à 2 salariés';
            case '02': return '3 à 5 salariés';
            case '03': return '6 à 9 salariés';
            case '11': return '10 à 19 salariés';
            case '12': return '20 à 49 salariés';
            case '21': return '50 à 99 salariés';
            case '22': return '100 à 199 salariés';
            case '31': return '200 à 249 salariés';
            case '32': return '250 à 499 salariés';
            case '41': return '500 à 999 salariés';
            case '42': return '1 000 à 1 999 salariés';
            case '51': return '2 000 à 4 999 salariés';
            case '52': return '5 000 à 9 999 salariés';
            case '53': return '10 000 salariés et plus';
            default: return '0 salariés';
        }
    }

    public function convertitCodeNaf($code){
        switch($code){
            case 'A' : return "AGRICULTURE, SYLVICULTURE ET PÊCHE";
            case 'B' : return "INDUSTRIES EXTRACTIVES";
            case 'C' : return "INDUSTRIE MANUFACTURIÈRE";
            case 'D' : return "PRODUCTION ET DISTRIBUTION D’ÉLECTRICITÉ, DE GAZ, DE VAPEUR ET D’AIR CONDITIONNÉ";
            case 'E' : return "PRODUCTION ET DISTRIBUTION D’EAU ; ASSAINISSEMENT, GESTION DES DÉCHETS ET DÉPOLLUTION";
            case 'F' : return "CONSTRUCTION";
            case 'G' : return "COMMERCE";
            case 'H' : return "TRANSPORTS ET ENTREPOSAGE";
            case 'I' : return "HÉBERGEMENT ET RESTAURATION";
            case 'J' : return "ÉDITION, DIFFUSION ET ACTIVITÉS DE PRODUCTION ET DE DISTRIBUTION DE CONTENU";
            case 'K' : return "TÉLÉCOMMUNICATIONS, PROGRAMMATION INFORMATIQUE, CONSEIL, INFRASTRUCTURE INFORMATIQUE ET AUTRES ACTIVITÉS DE SERVICE INFORMATIQUE";
            case 'L' : return "ACTIVITÉS FINANCIÈRES ET D’ASSURANCE";
            case 'M' : return "Activités IMMOBILIÈRES";
            case 'N' : return "ACTIVITÉS SPÉCIALISÉES, SCIENTIFIQUES ET TECHNIQUES";
            case 'O' : return "ACTIVITÉS DE SERVICE ADMINISTRATIF ET DE SOUTIEN";
            case 'P' : return "ADMINISTRATION PUBLIQUE ET DÉFENSE ; SÉCURITÉ SOCIALE OBLIGATOIRE";
            case 'Q' : return "ENSEIGNEMENT";
            case 'R' : return "SANTÉ HUMAINE ET ACTIVITÉS D’ACTION SOCIALE";
            case 'S' : return "ARTS, SPORTS ET ACTIVITÉS RÉCRÉATIVES";
            case 'T' : return "AUTRES ACTIVITÉS DE SERVICES";
            case 'U' : return "ACTIVITÉS DES MÉNAGES EN TANT QU’EMPLOYEURS ; ACTIVITÉS INDIFFÉRENCIÉES DES MÉNAGES EN TANT QUE PRODUCTEURS DE BIENS ET SERVICES POUR USAGE PROPRE";
            case 'V' : return "ACTIVITÉS DES ORGANISATIONS ET ORGANISMES EXTRATERRITORIAUX";
        }
    }
    public function countInternships(string $siren): int
    {
        return Internship::where('company_siren', $siren)->count();
    }
}