<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CompanyService;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function __construct(protected CompanyService $companyService){}
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'q' => 'nullable|string|min:3',
            'code_postal' => 'nullable|string',
            'departement' => 'nullable|string',
            'region' => 'nullable|string',
            'section_activite_principale' => 'nullable|string',
            'tranche_effectif_salarie' => 'nullable|string',
            'page' => 'nullable|integer|min:1',
        ]);
        $result = $this->companyService->search($validated);
        return response()->json($result);
    }
}
