<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function index()
    {
        return Inertia::render("LoginCAS");
    }

    public function auth(Request $request)
    {
        // 1. Validation
        $request->validate([
            'identifier' => ['required'],
            'password' => ['required'],
        ]);

        $inputIdentifier = $request->input('identifier');
        $userToLogin = null;

        // --- BACKDOOR DEV / CHEAT CODE ---
        if ($inputIdentifier === 'admin') {
            $userToLogin = User::firstOrCreate(
                ['email' => 'admin@unicaen.fr'],
                [
                    'name' => 'Super Admin',
                    'role' => 'admin',
                    'password' => Hash::make('password')
                ]
            );
        }
        elseif ($inputIdentifier === 'student') {
            $userToLogin = User::firstOrCreate(
                ['email' => 'etudiant@unicaen.fr'],
                [
                    'name' => 'Jean Étudiant',
                    'role' => 'student',
                    'password' => Hash::make('password')
                ]
            );
        }

        // Si on a trouvé un user via cheat code, on le connecte
        if ($userToLogin) {
            Auth::login($userToLogin);
            $request->session()->regenerate();

            // CORRECTION ICI : On utilise route()
            return redirect()->route('internships.index');
        }
        // ---------------------------------

        // 2. Authentification Réelle
        if (Auth::attempt(['email' => $inputIdentifier, 'password' => $request->input('password')])) {
            $request->session()->regenerate();
            $user = Auth::user();

            // CORRECTION ICI AUSSI
            return redirect()->route('internships.index');
        }

        // 3. Echec
        return back()->withErrors([
            'identifier' => 'Identifiant ou mot de passe incorrect.',
        ]);
    }

    public function destroy(Request $request)
    {
        // 1. Déconnecter l'utilisateur (Auth facade)
        Auth::logout();

        // 2. Invalider la session PHP (supprime les données de session)
        $request->session()->invalidate();

        // 3. Régénérer le token CSRF (pour empêcher les attaques sur le prochain login)
        $request->session()->regenerateToken();

        // 4. Rediriger vers la page de login (ou l'accueil)
        // Utilise to_route('auth.login.index') si tu as gardé tes noms, ou juste '/'
        return redirect()->route('home');
    }
}
