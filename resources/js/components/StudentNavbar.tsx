import { Link, usePage } from '@inertiajs/react';

export default function StudentNavbar() {
    const { url } = usePage();

    const isActivePage = (path: string, exact = false) => {
        if (exact) {
            return url === path;
        }
        return url.startsWith(path);
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo et titre */}
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
                        <h1 className="text-xl font-bold text-gray-900">Portail Étudiant</h1>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/home"
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                isActivePage('/home', true)
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            Accueil
                        </Link>

                        <Link
                            href="/companies"
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                isActivePage('/companies')
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            Entreprises
                        </Link>

                        <Link
                            href="/internships"
                            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                isActivePage('/internships')
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                        >
                            Stages
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
