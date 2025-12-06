import { Company } from '@/types/model';
import { Link } from '@inertiajs/react'

// @ts-ignore
export default function CompanyCard({company} : Company) {
    return (
        <div
            key={company.siege.siret}
            className={`rounded-lg border p-6 shadow-sm transition-all hover:shadow-md ${
                company.siege.isEtablissement ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'
            }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    {/* Nom de l'entreprise avec badge */}
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-gray-900">{company.nom_complet}</h3>
                        {company.siege.isEtablissement && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Établissement
                            </span>
                        )}
                    </div>

                    {/* Info du siège ou établissement */}
                    <div className={`mt-4 rounded-lg p-4 ${company.siege.isEtablissement ? 'border border-green-200 bg-white' : 'bg-blue-50'}`}>
                        <h4
                            className={`mb-3 flex items-center gap-2 text-sm font-semibold ${
                                company.siege.isEtablissement ? 'text-green-900' : 'text-blue-900'
                            }`}
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {company.siege.isEtablissement ? (
                                    // Icône localisation pour établissement
                                    <>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </>
                                ) : (
                                    // Icône building pour siège
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                )}
                            </svg>
                            {company.siege.isEtablissement ? 'Établissement' : 'Siège social'}
                        </h4>
                        <div className="space-y-1.5 text-sm text-gray-700">
                            <p>
                                <span className="font-medium">SIRET : </span>
                                <span className="font-mono">{company.siege.siret || 'Inconnu'}</span>
                            </p>
                            <p>
                                <span className="font-medium">Adresse : </span>
                                {company.siege.adresse || 'Inconnue'}
                            </p>
                            <p>
                                <span className="font-medium">Ville : </span>
                                {company.siege.city?.nom || company.siege.commune || 'Inconnue'}
                                {company.siege.code_postal && ` (${company.siege.code_postal})`}
                            </p>
                        </div>
                    </div>
                </div>

                <Link href={`/companies/${company.siege.siret}`} className="ml-4 flex-shrink-0 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                    Voir détails
                </Link>
            </div>
        </div>
    );
}
