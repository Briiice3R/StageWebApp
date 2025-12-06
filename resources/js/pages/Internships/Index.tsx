import AdminDashboardSidebar from '@/components/AdminDashboardSidebar'; 
import { useState, useMemo, ChangeEvent } from 'react';
import { Head } from '@inertiajs/react';

// ====================================================================
// SECTION TYPES
// ====================================================================

type Student = {
    student_id: number;
    first_name: string;
    last_name: string;
};

type CompanyDetail = {
    city: string;
};

type Internship = {
    id: number;
    
    internship_subject: string;
    is_paid: boolean;
    
    company_name: string;
    
    student: Student | null; 
    company: CompanyDetail | null; 
    
    company_siren: string;
    start_date: string;
    end_date: string;
    is_remote: boolean;
};

// ====================================================================
// COMPOSANT PRINCIPAL (InternshipsIndex)
// ====================================================================

type InternshipsProps = {
    internships: Internship[];
}

export default function InternshipsIndex({ internships }: InternshipsProps){
    
    // NOUVEL ÉTAT POUR LES FILTRES
    const INITIAL_FILTER_STATE = {
        companyName: '', // Filtre par nom d'entreprise
        subject: '',     // Filtre par sujet de stage
        isPaid: 'all',   // 'all', 'paid', 'unpaid'.
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

    // LOGIQUE DE FILTRAGE
    // Réalise le filtrage côté client en temps réel
    const filteredInternships = useMemo(() => {
        let currentInternships = internships;
        
        // 1. Filtre par Nom d'Entreprise (Recherche insensible à la casse)
        if (filterData.companyName) {
            const search = filterData.companyName.toLowerCase();
            currentInternships = currentInternships.filter(
                (internship) => 
                    internship.company_name && internship.company_name.toLowerCase().includes(search)
            );
        }

        // 2. Filtre par Sujet de Stage (Recherche insensible à la casse)
        if (filterData.subject) {
            const search = filterData.subject.toLowerCase();
            currentInternships = currentInternships.filter(
                (internship) => 
                    internship.internship_subject && internship.internship_subject.toLowerCase().includes(search)
            );
        }

        // 3. Filtre par Rémunération
        if (filterData.isPaid !== 'all') {
            const isPaidFilter = filterData.isPaid === 'paid'; 
            currentInternships = currentInternships.filter(
                (internship) => Boolean(internship.is_paid) === isPaidFilter
            );
        }

        return currentInternships;
    }, [internships, filterData]);


    return (
        <>
            <Head title="Stages" />
            
            <div className="flex min-h-screen bg-gray-50 p-8">
                <AdminDashboardSidebar />

                <main className="flex-1 p-8">
                    <div className="mx-auto max-w-6xl">
                    
                    {/* 1. Header */}
                    <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                        </svg>
                        <h1 className="text-3xl font-bold text-gray-800">Liste des stages</h1>
                    </div>

                    {/* 2. Conteneur de Filtre */}
                    <div className="mb-6 rounded-lg bg-white p-6 shadow-xl">
                        <h3 className="text-xl font-bold mb-5 text-gray-800 border-b pb-3">Filtrer les stages</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            {/* 1. Filtre : Nom de l'Entreprise */}
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom de l'entreprise
                                </label>
                                <input id="companyName" name="companyName" type="text" value={filterData.companyName} onChange={handleFilterChange} placeholder="Rechercher par nom..." className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"/>
                            </div>

                            {/* 2. Filtre : Sujet du Stage */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    Sujet du stage
                                </label>
                                <input id="subject" name="subject" type="text" value={filterData.subject} onChange={handleFilterChange} placeholder="Rechercher par sujet..." className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"/>
                            </div>

                            {/* 3. Filtre : Rémunération */}
                            <div>
                                <label htmlFor="isPaid" className="block text-sm font-medium text-gray-700 mb-1">
                                    Statut de Rémunération
                                </label>
                                <select id="isPaid" name="isPaid" value={filterData.isPaid} onChange={handleFilterChange} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                                    <option value="all">Tous les stages</option>
                                    <option value="paid">Rémunéré (Oui)</option>
                                    <option value="unpaid">Non Rémunéré (Non)</option>
                                </select>
                            </div>
                            <div>
                                <button onClick={resetFilters} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0-.97-4.276M9 9h6m3.615-5.586a1.5 1.5 0 0 0-.256-1.258A1.5 1.5 0 0 0 14.5 2h-5c-.75 0-1.442.278-1.993.714a1.5 1.5 0 0 0-.256 1.258C7.573 5.4 7.25 6 7 6h10c-.25 0-.5.4-.673.414ZM4.5 6a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v1H4.5V6Z M19.5 7h-15V20c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7Z" />
                                    </svg>
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Affichage du nombre de stages trouvés */}
                    <div className="mb-4 text-sm font-medium text-gray-600">
                        {filteredInternships.length} stage(s) trouvé(s).
                    </div>

                    {/* 3. Liste des Stages en Grille (UTILISATION DE LA LISTE FILTRÉE) */}
                    {filteredInternships.length === 0 ? (
                        <div className="rounded-lg bg-white p-12 text-center shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-auto h-16 w-16 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
                            </svg>
                            <p className="mt-4 text-lg font-medium text-gray-600">Aucun stage trouvé avec ces critères.</p>
                            <p className="mt-2 text-sm text-gray-500">Veuillez ajuster vos filtres.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {/* Mappage sur la liste FILTRÉE */}
                            {filteredInternships.map((internship) => (
                                <div
                                    key={internship.id}
                                    className="group rounded-lg bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg"
                                >
                                    
                                    {/* Avatar / Détails Principaux de la Carte */}
                                    <div className="mb-4 flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs font-medium text-gray-500">ID du Stage</p>
                                            <p className="text-sm font-semibold text-blue-600">{internship.id}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Sujet du Stage */}
                                    <h3 className="mb-4 text-xl font-bold text-gray-800">
                                        {internship.internship_subject || `Stage #${internship.id}`}
                                    </h3>
                                    
                                    {/* Détails du Stage */}
                                    <div className="space-y-3 text-sm text-gray-600 border-t pt-4"> 
                                        
                                        {/* Nom de l'Entreprise */}
                                        <p className="flex justify-between items-center">
                                            <span className="font-medium text-gray-500">Entreprise :</span> 
                                            <span className="truncate font-semibold text-gray-800">{internship.company_name || 'N/A'}</span>
                                        </p>

                                        {/* Ville */}
                                        <p className="flex justify-between items-center">
                                            <span className="font-medium text-gray-500">Ville :</span> 
                                            <span className="font-semibold text-gray-800">{internship.company?.city || 'Inconnue'}</span>
                                        </p>

                                        {/* Nom de l'Étudiant */}
                                        <p className="flex justify-between items-center">
                                            <span className="font-medium text-gray-500">Étudiant :</span> 
                                            <span className="truncate font-semibold text-gray-800">
                                                {internship.student 
                                                    ? `${internship.student.first_name} ${internship.student.last_name}` 
                                                    : 'Non assigné'}
                                            </span>
                                        </p>

                                        {/* Rémunération oui ou non */}
                                        <p className="flex justify-between items-center">
                                            <span className="font-medium text-gray-500">Rémunération :</span>
                                            <span className={`font-semibold ${internship.is_paid ? 'text-green-600' : 'text-red-500'}`}>
                                                {internship.is_paid ? 'Oui' : 'Non'}
                                            </span>
                                        </p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
        </>
    );
}