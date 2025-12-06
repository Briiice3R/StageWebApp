import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import { Head } from '@inertiajs/react';

interface AddressBlock {
    siret?: string;
    adresse?: string;
    code_postal?: string;
    commune?: string;
    tranche_effectif_salarie?: string;
    effectif?: string;
}

interface MatchingEtablissement {
    siret?: string;
    adresse?: string;
    activite_principale?: string;
    tranche_effectif_salarie?: string;
    effectif?: string;
}

export interface CompanyData {
    siren?: string;
    siret?: string;
    effectif?: string;
    nom_complet?: string;
    nom_raison_sociale?: string;
    siege?: AddressBlock;
    etablissement?: AddressBlock;
    activite_principale?: string;
    libelle_activite_principale?: string;
    nature_juridique?: string;
    date_creation?: string;
    date_creation_etablissement?: string;
    matching_etablissements?: MatchingEtablissement[];
}

interface Props {
    company?: CompanyData;
    error?: string;
    siret?: string;
    internship_count?: number;
}

export default function DetailCompany({ company, error, siret, internship_count = 0 }: Props) {
    /** --- UTIL FUNCTIONS --- */

    const getCompanyName = () =>
        company?.nom_complet || company?.nom_raison_sociale || 'Non renseigné';

    const getCreationDate = () => {
        const date = company?.date_creation;
        return date ? new Date(date).toLocaleDateString('fr-FR') : 'Non renseignée';
    };

    return (
        <>
            <Head title="Informations sur l'entreprise" />
            <main className="flex min-h-screen bg-gray-50 p-8">
                <AdminDashboardSidebar />

                <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
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
                        <h1 className="text-2xl font-bold text-gray-800">
                            Information sur l'établissement
                        </h1>
                    </div>

                    {/* Affichage erreur */}
                    {error && (
                        <div className="rounded-lg bg-red-50 p-4 text-red-800 mb-6">
                            {error}
                        </div>
                    )}

                    {/* Aucune information */}
                    {!company && !error && (
                        <p className="text-center text-gray-500 py-6">
                            Aucune information disponible pour ce SIRET : {siret}
                        </p>
                    )}

                    {/* Informations entreprise */}
                    {company && (
                        <div className="space-y-8">

                            {/* Nom de l'entreprise */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800">Nom de l'entreprise</h2>
                                <p className="mt-1 text-lg text-gray-900">{getCompanyName()}</p>
                            </section>

                            {/* SIREN / SIRET */}
                            {company.matching_etablissements && company.matching_etablissements.length > 0 && (
                            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">SIREN</h2>
                                    <p>{company.siren || 'Non renseigné'}</p>
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">SIRET</h2>
                                    {company.matching_etablissements.map((etab, idx) => (
                                            <p key={idx}>{etab.siret || 'Non renseignée'}</p>
                                        ))}
                                </div>
                        </section>
                        )}

                            {/* Adresse des établissements */}
                            {company.matching_etablissements && company.matching_etablissements.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-semibold text-gray-800">Adresse de l'établissement</h2>
                                        {company.matching_etablissements.map((etab, idx) => (
                                            <p key={idx}>{etab.adresse || 'Non renseignée'}</p>
                                        ))}
                                </section>
                            )}

                            {/* Effectif par établissement */}
                            {company.matching_etablissements && company.matching_etablissements.length > 0 && (
                                <section>
                                    <h2 className="text-xl font-semibold text-gray-800">Effectif</h2>
                                        {company.matching_etablissements.map((etab, idx) => (
                                            <p key={idx}>{etab.effectif || 'Non renseigné'}</p>
                                        ))}
                                </section>
                            )}

                            {/* Activité principale */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800">Activité principale (NAF)</h2>
                                <p>{company.activite_principale || 'Non renseignée'}</p>
                                <p>{company.libelle_activite_principale}</p>
                            </section>

                            {/* Date de création */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800">Date de création</h2>
                                <p>{getCreationDate()}</p>
                            </section>

                            {/* Nombre de stagiaires */}
                            <section>
                                <h2 className="text-xl font-semibold text-gray-800">Nombre de stagiaires accueillis</h2>
                                <p>
                                    {internship_count} {internship_count > 1 ? 'stagiaires' : 'stagiaire'}
                                </p>
                            </section>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}