import { Head, Link } from '@inertiajs/react';
import StudentNavbar from '@/components/StudentNavbar';
import { Company } from '@/types/model';
import { useEffect, useState } from 'react';
import locationHandler from '@/utils/locationHandler';

type StudentCompaniesProps = {
    companies: Company[];
}

export default function StudentCompaniesIndex({ companies: initialCompanies }: StudentCompaniesProps) {
    const [companies, setCompanies] = useState<Company[]>(initialCompanies);

    // Enrichir les entreprises avec les données de ville
    useEffect(() => {
        const enrichCompanies = async () => {
            const enrichedCompanies = await Promise.all(
                initialCompanies.map(async (company) => {
                    try {
                        const cityResponse = await locationHandler.getCityByText(company.siege.code_postal);
                        return {
                            ...company,
                            siege: {
                                ...company.siege,
                                city: cityResponse.data[0]
                            }
                        };
                    } catch (error) {
                        console.error('Erreur récupération ville:', error);
                        return company;
                    }
                })
            );
            setCompanies(enrichedCompanies);
        };

        enrichCompanies();
    }, [initialCompanies]);

    return (
        <>
            <Head title="Entreprises partenaires" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <StudentNavbar />

                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Info Banner */}
                    <div className="mb-8 rounded-lg bg-blue-50 p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5 text-blue-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-blue-900">Entreprises ayant accueilli des stagiaires</h3>
                                <p className="mt-1 text-sm text-blue-800">
                                    Vous trouverez ci-dessous la liste des entreprises qui ont déjà accueilli des
                                    stagiaires de votre établissement. Cliquez sur une entreprise pour voir plus de détails.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Companies Grid */}
                    {companies.length === 0 ? (
                        <div className="rounded-lg bg-white p-12 text-center shadow-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="mx-auto h-16 w-16 text-gray-400"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                                />
                            </svg>
                            <p className="mt-4 text-lg font-medium text-gray-600">Aucune entreprise trouvée</p>
                            <p className="mt-2 text-sm text-gray-500">
                                Il n'y a pas encore d'entreprise ayant accueilli des stagiaires.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {companies.map((company) => {
                                const isEtablissement = company.siege?.isEtablissement === true;

                                return (
                                    <Link
                                        key={company.siege.siret}
                                        href={`/companies/${company.siege.siret}`}
                                        className="group rounded-lg bg-white p-6 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl"
                                    >
                                        {/* Header */}
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                                                isEtablissement ? 'bg-green-100' : 'bg-blue-100'
                                            }`}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className={`h-6 w-6 ${
                                                        isEtablissement ? 'text-green-600' : 'text-blue-600'
                                                    }`}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                                                    />
                                                </svg>
                                            </div>
                                            {company.internships_count !== undefined && (
                                                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                    {company.internships_count} {company.internships_count > 1 ? 'stagiaires' : 'stagiaire'}
                                                </span>
                                            )}
                                        </div>

                                        {/* Company Name */}
                                        <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-2">
                                            {company.nom_complet}
                                        </h3>

                                        {/* Location */}
                                        <div className="mb-4 flex items-start gap-2 text-sm text-gray-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                                />
                                            </svg>
                                            <span className="line-clamp-2">
                                                {company.siege.city?.nom || company.siege.commune} ({company.siege.code_postal})
                                            </span>
                                        </div>

                                        {/* View Details */}
                                        <div className="flex items-center text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                                            Voir les détails
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                            </svg>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
