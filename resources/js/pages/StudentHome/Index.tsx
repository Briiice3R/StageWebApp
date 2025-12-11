import { Head, Link } from '@inertiajs/react';
import StudentNavbar from '@/components/StudentNavbar';

export default function StudentHome() {
    return (
        <>
            <Head title="Portail Étudiant" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <StudentNavbar />

                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Welcome Section */}
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900">
                            Bienvenue sur votre portail de stage
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Découvrez les entreprises partenaires et trouvez le stage qui vous correspond
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Card 1: Liste des entreprises */}
                        <Link
                            href="/student/companies"
                            className="group rounded-xl bg-white p-8 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-8 w-8 text-blue-600 transition-colors group-hover:text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-gray-900">
                                Entreprises partenaires
                            </h3>
                            <p className="text-gray-600">
                                Consultez la liste des entreprises qui ont déjà accueilli des stagiaires
                                et découvrez leurs opportunités.
                            </p>
                            <div className="mt-6 flex items-center font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                                Voir les entreprises
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </Link>

                        {/* Card 2: Rechercher une entreprise */}
                        <Link
                            href="/companies"
                            className="group rounded-xl bg-white p-8 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                        >
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 transition-colors group-hover:bg-indigo-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-8 w-8 text-indigo-600 transition-colors group-hover:text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-2xl font-bold text-gray-900">
                                Rechercher une entreprise
                            </h3>
                            <p className="text-gray-600">
                                Recherchez une entreprise spécifique par nom, localisation ou secteur
                                d'activité pour votre stage.
                            </p>
                            <div className="mt-6 flex items-center font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700">
                                Rechercher
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    {/* Info Section */}
                    <div className="mt-12 rounded-xl bg-white p-8 shadow-md">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
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
                                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-900">À propos de ce portail</h4>
                                <p className="mt-2 text-gray-600">
                                    Ce portail vous permet de découvrir les entreprises qui ont déjà accueilli des
                                    stagiaires de votre établissement. Vous pouvez consulter leurs informations,
                                    leur localisation et leurs secteurs d'activité pour mieux cibler vos candidatures.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
