<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        if (!$request->has("q")) {
            return response()->json([
                "data" => []
            ], 400);
        }
        try{
            $companies = Http::withoutVerifying()->get("https://recherche-entreprises.api.gouv.fr/search?q=" . urlencode($request->query("q")));
            if ($companies->failed()) {
                return response()->json([
                    "data" => []
                ], 501);
            }
            return response()->json([
                "data" => $companies->json("results")
            ]);
        } catch (ConnectionException $e){
            return response()->json([
                "data"=>[],
                "error"=>$e->getMessage()
            ], 503);
        }
    }
}
