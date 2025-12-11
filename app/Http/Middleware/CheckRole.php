<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Vérifier si l'utilisateur est connecté
        if (!$request->user()) {
            return redirect()->route('auth.index');
        }

        // Vérifier si l'utilisateur a le bon rôle
        if ($request->user()->role !== $role) {
            abort(403, 'Accès non autorisé');
        }

        return $next($request);
    }
}
