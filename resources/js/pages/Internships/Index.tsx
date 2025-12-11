import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import { Head } from '@inertiajs/react';
import { Internship, Student, Company } from '@/types/model';
import { useState, useMemo, ChangeEvent } from 'react';
import useAuth from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

// ====================================================================
// TYPES
// ====================================================================

type InternshipWithRelations = Internship & {
    student: Student | null;
    company: Company | null;
};

type InternshipsProps = {
    internships: InternshipWithRelations[];
}

// ====================================================================
// COMPOSANT PRINCIPAL
// ====================================================================

export default function InternshipsIndex({ internships }: InternshipsProps) {
    // État pour les filtres
    const INITIAL_FILTER_STATE = {
        companyName: '',
        subject: '',
        isPaid: 'all',
    }
    const [filterData, setFilterData] = useState(INITIAL_FILTER_STATE);

    // Fonction pour réinitialiser les filtres
    const resetFilters = () => {
        setFilterData(INITIAL_FILTER_STATE);
    }

    // Fonction pour mettre à jour l'état des filtres
    const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Logique de filtrage
    const filteredInternships = useMemo(() => {
        let currentInternships = internships;

        if (filterData.companyName) {
            const search = filterData.companyName.toLowerCase();
            currentInternships = currentInternships.filter(
                (internship) =>
                    internship.company?.nom_complet && internship.company.nom_complet.toLowerCase().includes(search)
            );
        }

        if (filterData.subject) {
            const search = filterData.subject.toLowerCase();
            currentInternships = currentInternships.filter(
                (internship) =>
                    internship.internship_subject && internship.internship_subject.toLowerCase().includes(search)
            );
        }

        if (filterData.isPaid !== 'all') {
            const isPaidFilter = filterData.isPaid === 'paid';
            currentInternships = currentInternships.filter(
                (internship) => Boolean(internship.is_paid) === isPaidFilter
            );
        }

        return currentInternships;
    }, [internships, filterData]);

    const { isAdmin } = useAuth();

    return (
        <>
            <Head title="Stages" />

            {/* Navbar */}
            {!isAdmin && <Navbar />}

            <div className="flex min-h-screen bg-gray-50 p-8">
                {/* Sidebar Admin */}
                {isAdmin && <AdminDashboardSidebar />}

                <main className="flex-1 p-8">
                    <div className="mx-auto max-w-6xl">
                        {/* Header avec icône */}
                        <div className="mb-8 flex items-center gap-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="h-10 w-10 text-blue-600"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                />
                            </svg>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Liste des stages</h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Filtrez et consultez tous les stages des étudiants d'UNICAEN
                                </p>
                            </div>
                        </div>

                        {/* Section de recherche et filtres */}
                        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                                {/* Filtre : Nom de l'Entreprise */}
                                <div>
                                    <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-gray-700">
                                        Nom de l'entreprise
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            id="companyName"
                                            name="companyName"
                                            type="text"
                                            value={filterData.companyName}
                                            onChange={handleFilterChange}
                                            placeholder="Rechercher par nom..."
                                            className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Filtre : Sujet du Stage */}
                                <div>
                                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                                        Sujet du stage
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            id="subject"
                                            name="subject"
                                            type="text"
                                            value={filterData.subject}
                                            onChange={handleFilterChange}
                                            placeholder="Rechercher par sujet..."
                                            className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Filtre : Rémunération */}
                                <div>
                                    <label htmlFor="isPaid" className="mb-2 block text-sm font-medium text-gray-700">
                                        Rémunération
                                    </label>
                                    <select
                                        id="isPaid"
                                        name="isPaid"
                                        value={filterData.isPaid}
                                        onChange={handleFilterChange}
                                        className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="all">Tous les stages</option>
                                        <option value="paid">Rémunéré</option>
                                        <option value="unpaid">Non rémunéré</option>
                                    </select>
                                </div>

                                {/* Bouton réinitialiser */}
                                <div className="flex items-end">
                                    <button
                                        onClick={resetFilters}
                                        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                        Réinitialiser
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Section des résultats */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Résultats {filteredInternships.length > 0 && `(${filteredInternships.length})`}
                                </h2>
                            </div>

                            {/* Message si aucun résultat */}
                            {filteredInternships.length === 0 ? (
                                <div className="py-16 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">Aucun stage trouvé</h3>
                                    <p className="mt-2 text-sm text-gray-500">
                                        {filterData.companyName || filterData.subject || filterData.isPaid !== 'all'
                                            ? 'Essayez d\'ajuster vos filtres'
                                            : 'Aucun stage disponible pour le moment'}
                                    </p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredInternships.map((internship) => (
                                        <div
                                            key={internship.id}
                                            className="group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
                                        >
                                            {/* Avatar / Header */}
                                            <div className="mb-4 flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-medium text-gray-500">Stage #{internship.id}</p>
                                                    <p className={`text-sm font-semibold ${internship.is_paid ? 'text-green-600' : 'text-gray-600'}`}>
                                                        {internship.is_paid ? 'Rémunéré' : 'Non rémunéré'}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Sujet du Stage */}
                                            <h3 className="mb-4 text-lg font-bold text-gray-900 line-clamp-2">
                                                {internship.internship_subject || `Stage #${internship.id}`}
                                            </h3>

                                            {/* Détails */}
                                            <div className="space-y-3 border-t border-gray-100 pt-4 text-sm">
                                                {/* Entreprise */}
                                                <div className="flex items-start gap-2">
                                                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-gray-500">Entreprise</p>
                                                        <p className="truncate font-medium text-gray-900">
                                                            {internship.company?.nom_complet || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Ville */}
                                                <div className="flex items-start gap-2">
                                                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-gray-500">Ville</p>
                                                        <p className="font-medium text-gray-900">
                                                            {internship.company?.siege.city?.nom || 'Inconnue'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Étudiant */}
                                                <div className="flex items-start gap-2">
                                                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-gray-500">Étudiant</p>
                                                        <p className="truncate font-medium text-gray-900">
                                                            {internship.student
                                                                ? `${internship.student.first_name} ${internship.student.last_name}`
                                                                : 'Non assigné'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
