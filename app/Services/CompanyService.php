<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class CompanyService
{
    protected string $apiUrl = 'https://recherche-entreprises.api.gouv.fr';

    /**
     * Recherche d'entreprises (utilisé par API Controller)
     */
    public function search(array $params): array
    {
        if (empty($params)) {
            return ['data' => [], 'total_pages' => 0];
        }

        try {
            $response = Http::withoutVerifying()
                ->timeout(10)
                ->get("{$this->apiUrl}/search", $params);

            if ($response->failed()) {
                return ['data' => [], 'total_pages' => 0];
            }

            return [
                'data' => $response->json('results', []),
                'total_pages' => $response->json('total_pages', 0)
            ];
        } catch (\Exception $e) {
            \Log::error('Company search error: ' . $e->getMessage());
            return ['data' => [], 'total_pages' => 0];
        }
    }

    /**
     * Récupérer une entreprise par SIRET (utilisé par Web Controller)
     */
    public function getBySiret(string $siret): ?array
    {

        try {
            $response = Http::withoutVerifying()
                ->timeout(10)
                ->get("{$this->apiUrl}/search", ['q' => $siret]);

            if (!$response->successful()) {
                return null;
            }

            $results = $response->json('results', []);

            if (empty($results)) {
                return null;
            }

            // Récupérer la première company
            $company = $results[0];

            // Vérifier si le SIRET correspond au siège
            $matchingEtablissements = $company['matching_etablissements'] ?? [];


            foreach ($matchingEtablissements as $etab) {
                if (($etab['siret'] ?? null) === $siret) {
                    return [
                        "siren" => $company['siren'] ?? null,
                        'nom_complet' => ($company['nom_complet'] ?? ''),
                        'nom_raison_sociale' => $company['nom_raison_sociale'] ?? '',
                        'siege' => [
                            'commune' => $etab['commune'] ?? null,
                            'adresse' => $etab['adresse'] ?? null,
                            'code_postal' => $etab['code_postal'] ?? null,
                            'siret' => $etab['siret'] ?? null,
                            'isEtablissement' => true,
                            'city' => null,
                        ],
                        "date_creation" => $etab['date_creation'] ?? null,
                        'matching_etablissements' => [],
                        'effectif_salarie' => $this->calculeCodeEffectif($etab['tranche_effectif_salarie'] ?? '')
                    ];
                }
            }
            return null;

        } catch (\Exception $e) {
            \Log::error("Error fetching company {$siret}: " . $e->getMessage());
            return null;
        }
    }
    private function calculeCodeEffectif($trancheEffectif): string
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
}


