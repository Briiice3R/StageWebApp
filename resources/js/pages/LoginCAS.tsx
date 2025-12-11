import React, { useState, FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';

// 1. On définit la structure de nos données
interface LoginForm {
    identifier: string;
    password: string;
}

// Type pour les erreurs (clés optionnelles, valeurs string)
type FormErrors = Partial<Record<keyof LoginForm, string>>;

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    // 2. On type le state des erreurs
    const [frontErrors, setFrontErrors] = useState<FormErrors>({});

    // On type le state des champs touchés
    const [hasTouched, setHasTouched] = useState<Partial<Record<keyof LoginForm, boolean>>>({});

    // 3. On passe le type générique à useForm
    const { data, setData, post, processing, errors } = useForm<LoginForm>({
        identifier: '',
        password: '',
    });

    // Fonction de validation CORRIGÉE et TYPÉE
    const validate = (): boolean => {
        const newErrors: FormErrors = {}; // On initialise VIDE

        if (!data.identifier.trim()) {
            newErrors.identifier = "Vous devez entrer votre identifiant.";
        }

        if (!data.password.trim()) {
            newErrors.password = "Vous devez entrer votre mot de passe.";
        }

        setFrontErrors(newErrors);

        // TypeScript est content car newErrors respecte le type FormErrors
        return Object.keys(newErrors).length === 0;
    };

    // Typage de l'argument 'field' pour qu'il n'accepte que 'identifier' ou 'password'
    const handleBlur = (field: keyof LoginForm) => {
        setHasTouched({ ...hasTouched, [field]: true });

        // Copie typée des erreurs existantes
        const newErrors: FormErrors = { ...frontErrors };

        if (field === 'identifier') {
            if (!data.identifier.trim()) {
                newErrors.identifier = "Vous devez entrer votre identifiant.";
            } else {
                delete newErrors.identifier;
            }
        }

        if (field === 'password') {
            if (!data.password.trim()) {
                newErrors.password = "Vous devez entrer votre mot de passe.";
            } else {
                delete newErrors.password;
            }
        }

        setFrontErrors(newErrors);
    };

    const getError = (field: keyof LoginForm): string | undefined => {
        return frontErrors[field] || errors[field];
    };

    // 4. Typage de l'événement de formulaire
    const submit = (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            setHasTouched({ identifier: true, password: true });
            return;
        }

        post("/auth/login", {
            preserveState: false,
            onSuccess: () => {
                console.log('✅ Connexion réussie !');
            },
            onError: (err) => {
                console.error('❌ Erreurs:', err);
                setFrontErrors({});
            }
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#e6e8ed] font-sans">
            <Head title="Connexion - Université Caen Normandie" />

            <header className="bg-[#182243] h-20 w-full flex items-center px-4 shadow-sm">
                {/* ... (Ton header inchangé) ... */}
            </header>

            <main className="flex-grow flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-[600px] p-8 border border-gray-200">

                    {/* ... (Ton icône cadenas inchangée) ... */}
                    <div className="flex justify-center mb-6">
                        <div className="bg-[#182243] rounded-full p-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-xl font-bold text-center text-black mb-8">
                        Entrez votre identifiant et votre mot de passe.
                    </h1>

                    {/* --- CORRECTION ICI : Ajout de la balise FORM --- */}
                    <form onSubmit={submit} className="space-y-6">

                        {/* Champ Identifiant */}
                        <div>
                            <div className="relative">
                                <input
                                    id="identifier"
                                    type="text"
                                    placeholder="Identifiant :"
                                    value={data.identifier}
                                    onChange={(e) => setData('identifier', e.target.value)}
                                    // Utilise errors (backend) OU frontErrors (frontend)
                                    className={`w-full px-4 py-3 border rounded text-base focus:outline-none focus:ring-1 focus:ring-blue-900 transition-colors
                                        ${(errors.identifier || frontErrors.identifier) ? 'border-red-600 text-red-700 placeholder-red-700' : 'border-gray-300 text-gray-700'}`}
                                />
                            </div>
                            {(errors.identifier || frontErrors.identifier) && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.identifier || frontErrors.identifier}
                                </p>
                            )}
                        </div>

                        {/* Champ Mot de passe */}
                        <div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe :"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full px-4 py-3 border rounded text-base focus:outline-none focus:ring-1 focus:ring-blue-900 pr-12
                                        ${(errors.password || frontErrors.password) ? 'border-red-600 text-red-700 placeholder-red-700' : 'border-gray-300 text-gray-700'}`}
                                />
                                <button
                                    type="button" // Celui-ci reste type button pour ne pas soumettre
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 px-3 flex items-center bg-[#182243] text-white rounded-r hover:bg-[#2a3b6e] transition"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>
                            {(errors.password || frontErrors.password) && (
                                <p className="text-red-600 text-sm mt-1">
                                    {errors.password || frontErrors.password}
                                </p>
                            )}
                        </div>

                        {/* Bouton de connexion */}
                        <button
                            type="submit" // --- CORRECTION : TYPE SUBMIT ---
                            disabled={processing}
                            className="w-full bg-[#182243] text-white font-bold py-3 rounded uppercase tracking-wide hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                        >
                            {processing ? 'CONNEXION...' : 'SE CONNECTER'}
                        </button>

                        <div className="text-center">
                            <a href="#" className="text-[#00749e] hover:underline text-sm font-medium">
                                Mot de passe oublié ?
                            </a>
                        </div>
                    </form>

                    <div className="mt-8 pt-4 text-sm text-black leading-relaxed">
                        Pour des raisons de sécurité, veuillez vous <a href="#" className="text-[#00749e] hover:underline">déconnecter</a> et fermer votre navigateur lorsque vous avez fini d'accéder aux services authentifiés.
                    </div>
                </div>
            </main>

            <footer className="py-6 text-center text-sm text-gray-700">
                <p>Copyright © 2005–2025 Apereo, Inc. &nbsp;&nbsp; Powered by <a href="#" className="underline">Apereo CAS</a></p>
            </footer>
        </div>
    );
}
