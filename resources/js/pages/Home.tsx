import { Head, Link } from '@inertiajs/react';
import Navbar from '@/components/Navbar';

export default function Home() {
    return (
        <>
            <Head title="Accueil - StageApp" />

            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    {/* Hero Section */}
                    <div className="rounded-lg bg-white p-8 shadow-md">
                        {/* Header avec icône */}
                        <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-7 w-7 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-gray-900">Bienvenue sur StageApp</h1>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <p className="text-lg leading-relaxed text-gray-700">
                                En tant qu'étudiant de l'<span className="font-semibold text-blue-600">Université de Caen Normandie</span>,
                                vous avez accès à <span className="font-semibold">StageApp</span>, la plateforme qui recense
                                l'ensemble des stages et entreprises partenaires des étudiants d'UNICAEN.
                                Explorez les opportunités professionnelles et enrichissez votre parcours académique !
                            </p>
                        </div>

                        {/* Actions rapides */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Card Stages */}
                            <Link
                                href="/internships"
                                className="group rounded-lg border border-blue-200 bg-blue-50 p-6 transition-all hover:shadow-md"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Consulter les stages</h2>
                                </div>
                                <p className="text-sm text-gray-700">
                                    Parcourez la liste complète des stages effectués par les étudiants d'UNICAEN et découvrez les entreprises partenaires.
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:gap-3 transition-all">
                                    Voir les stages
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </Link>

                            {/* Card Entreprises */}
                            <Link
                                href="/companies"
                                className="group rounded-lg border border-gray-200 bg-gray-50 p-6 transition-all hover:shadow-md"
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-700 text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="h-6 w-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Consulter les entreprises</h2>
                                </div>
                                <p className="text-sm text-gray-700">
                                    Explorez le répertoire des entreprises partenaires qui accueillent régulièrement nos étudiants en stage.
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:gap-3 transition-all">
                                    Voir les entreprises
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2}
                                        stroke="currentColor"
                                        className="h-4 w-4"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>
                            </Link>
                        </div>

                        {/* Call to action */}
                        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
                            <p className="mb-4 text-gray-700">
                                Vous n'avez pas encore de compte ?
                            </p>
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                    />
                                </svg>
                                Se connecter
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
