import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import { Head } from '@inertiajs/react';
import { Company } from '@/types/model';
import nafData from '@/data/naf.json';
import { NafActivity } from '@/types';
import { useEffect, useState } from 'react';
import locationHandler from '@/utils/locationHandler';
import useAuth from '@/hooks/useAuth';
import StudentNavbar from '@/components/StudentNavbar';

export default function DetailCompaniesPage({ company:initialCompany }: { company: Company }) {
    const [company, setCompany] = useState(initialCompany);
    const getNafLabel = (nafId: string): string=>{
        const section = (nafData as NafActivity[]).find(
            (item) => item.id === nafId
        );

        return section?.label || nafId; // Retourne l'ID si introuvable
    }

    const getCreationDate = () => {
        const date = company.date_creation
        console.log(date);
        return new Date(date).toLocaleDateString('fr-FR');
    };

    useEffect(() => {
        const fetchCityData = async () => {
            const updatedCompany = { ...initialCompany };

            try {
                // Enrichir le siège
                if (updatedCompany.siege?.code_postal) {
                    try {
                        const city = await locationHandler.getCityByText(updatedCompany.siege.code_postal);
                        updatedCompany.siege.city = city.data[0];
                    } catch (e) {
                        console.error('Erreur ville siège:', e);
                    }
                }

                setCompany(updatedCompany);
            } catch (error) {
                console.error("Erreur lors du fetch des villes:", error);
            }
        };

        fetchCityData();
    }, [initialCompany]); // ✅ Se déclenche à chaque changement de initialCompany

    // Vérifier si c'est un établissement ou un siège
    const isEtablissement = company.siege?.isEtablissement === true;
    console.log(company);
    const {isAdmin} = useAuth();
    return (
        <>
            <Head title="Informations sur l'entreprise" />

            {!isAdmin && <StudentNavbar />}

            <main className={`min-h-screen bg-gray-50 ${isAdmin ? 'flex p-8' : ''}`}>
                {isAdmin && <AdminDashboardSidebar />}

                <div className={`${isAdmin ? 'mx-auto w-full max-w-7xl' : 'mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'} rounded-lg bg-white p-8 shadow-md`}>
                    {/* Header */}
                    <div className="mb-8 flex items-center gap-3 border-b border-gray-200 pb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`h-6 w-6 ${isEtablissement ? 'text-green-600' : 'text-blue-600'}`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                            />
                        </svg>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isEtablissement ? "Information sur l'établissement" : "Information sur le siège social"}
                        </h1>
                    </div>

                    {company && (
                        <div className="space-y-8">
                            {/* Nom de l'entreprise */}
                            <section className={`rounded-lg border border-gray-200 bg-gradient-to-r p-6 ${
                                isEtablissement
                                    ? 'from-green-50 to-green-100'
                                    : 'from-blue-50 to-blue-100'
                            }`}>
                                <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">Nom de l'entreprise</h2>
                                <p className="mt-2 text-2xl font-bold text-gray-900">{company.nom_complet}</p>
                            </section>

                            {/* ========== SI C'EST UN ÉTABLISSEMENT ========== */}
                            {isEtablissement && (
                                <>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">SIREN du siège</h2>
                                            <p className="mt-2 text-xl font-semibold text-gray-900">{company.siren || 'Non renseigné'}</p>
                                        </section>

                                        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">SIRET de l'établissement</h2>
                                            <p className="mt-2 font-mono text-xl font-semibold text-gray-900">{company.siege.siret || 'Non renseigné'}</p>
                                        </section>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">Adresse de l'établissement</h2>
                                            <p className="mt-2 text-gray-900">{company.siege.adresse || 'Non renseignée'}</p>
                                            <p className="mt-1 text-sm font-medium text-green-600">
                                                {company.siege.city?.nom} ({company.siege.code_postal})
                                            </p>
                                        </section>

                                        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">Effectif</h2>
                                            <p className="mt-2 text-xl font-semibold text-gray-900">{company.effectif_salarie || 'Non renseigné'}</p>
                                        </section>
                                    </div>
                                </>
                            )}

                            {/* ========== SI C'EST UN SIÈGE ========== */}
                            {!isEtablissement && (
                                <>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">SIREN du siège</h2>
                                            <p className="mt-2 text-xl font-semibold text-gray-900">{company.siren || 'Non renseigné'}</p>
                                        </section>

                                        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">SIRET du siège</h2>
                                            <p className="mt-2 font-mono text-xl font-semibold text-gray-900">{company.siege.siret || 'Non renseigné'}</p>
                                        </section>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">Adresse du siège</h2>
                                            <p className="mt-2 text-gray-900">{company.siege.adresse || 'Non renseignée'}</p>
                                            <p className="mt-1 text-sm font-medium text-blue-600">
                                                {company.siege.city?.nom} ({company.siege.code_postal})
                                            </p>
                                        </section>

                                        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                            <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">Effectif du siège</h2>
                                            <p className="mt-2 text-xl font-semibold text-gray-900">{company.effectif_salarie || 'Non renseigné'}</p>
                                        </section>
                                    </div>
                                </>
                            )}

                            {/* ========== COMMUN AUX DEUX ========== */}

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                    <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">Activité principale (NAF)</h2>
                                    <p className="mt-2 text-gray-900">{getNafLabel(company.siege.activite_principale) || 'Non renseignée'}</p>
                                </section>

                                <section className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                    <h2 className="text-sm font-medium uppercase tracking-wide text-gray-600">Date de création</h2>
                                    <p className="mt-2 text-xl font-semibold text-gray-900">{getCreationDate()}</p>
                                </section>
                            </div>

                            {/* Nombre de stagiaires */}
                            {company.internships_count !== undefined && (
                                <section className={`rounded-lg border p-6 ${
                                    isEtablissement
                                        ? 'border-green-200 bg-green-50'
                                        : 'border-blue-200 bg-blue-50'
                                }`}>
                                    <h2 className={`text-sm font-medium uppercase tracking-wide ${
                                        isEtablissement ? 'text-green-700' : 'text-blue-700'
                                    }`}>
                                        Nombre de stagiaires accueillis
                                    </h2>
                                    <p className={`mt-2 text-3xl font-bold ${
                                        isEtablissement ? 'text-green-900' : 'text-blue-900'
                                    }`}>
                                        {company.internships_count} {company.internships_count > 1 ? 'stagiaires' : 'stagiaire'}
                                    </p>
                                </section>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
