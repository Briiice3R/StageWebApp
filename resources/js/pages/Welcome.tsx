import { Head, Link } from '@inertiajs/react';
import useAuth from '@/hooks/useAuth';

export default function Welcome() {
    const { isLogged } = useAuth();

    return (
        <>
            <Head title="Bienvenue" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                {/* Header simple */}
                <header className="bg-white/80 shadow-sm backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-8 w-8 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                    />
                                </svg>
                                <h1 className="text-2xl font-bold text-gray-900">Gestion de Stages</h1>
                            </div>

                            {!isLogged && (
                                <Link
                                    href="/auth/login"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    Se connecter
                                </Link>
                            )}

                            {isLogged && (
                                <Link
                                    href="/home"
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    Accéder au portail
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-5xl font-extrabold text-gray-900">
                            Plateforme de Gestion de Stages
                        </h2>
                        <p className="mt-6 text-xl text-gray-600">
                            Trouvez et gérez vos stages en toute simplicité
                        </p>

                        <div className="mt-10 flex justify-center gap-4">
                            {!isLogged ? (
                                <Link
                                    href="/auth/login"
                                    className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700"
                                >
                                    Commencer
                                </Link>
                            ) : (
                                <Link
                                    href="/home"
                                    className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700"
                                >
                                    Accéder au portail
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="mt-24 grid gap-8 md:grid-cols-3">
                        <div className="rounded-xl bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-900">
                                Recherche d'entreprises
                            </h3>
                            <p className="text-gray-600">
                                Accédez à une base de données complète d'entreprises partenaires
                            </p>
                        </div>

                        <div className="rounded-xl bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6 text-indigo-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-900">
                                Gestion de stages
                            </h3>
                            <p className="text-gray-600">
                                Suivez vos stages et ceux de vos étudiants en temps réel
                            </p>
                        </div>

                        <div className="rounded-xl bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-6 w-6 text-purple-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-gray-900">
                                Interface intuitive
                            </h3>
                            <p className="text-gray-600">
                                Une plateforme simple et facile à utiliser pour tous
                            </p>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="mt-20 border-t border-gray-200 bg-white/50 py-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-gray-600">
                            Plateforme de Gestion de Stages - Université de Caen Normandie
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
