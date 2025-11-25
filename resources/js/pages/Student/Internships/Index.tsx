import React, { useState } from 'react';

// ====================================================================
// SECTION MOCK DATA & TYPES
// Types basés sur la structure de vos modèles Laravel (snake_case)
// ====================================================================

type Student = {
    student_id: number; // Ajouté depuis votre modèle
    first_name: string;
    last_name: string;
};

type CompanyDetail = {
    city: string; // Supposé être chargé via une relation Company
};

// Type Internship mis à jour pour correspondre aux noms de colonnes : is_paid, internship_subject
type Internship = {
    id: number;
    
    internship_subject: string; // Sujet de stage
    is_paid: boolean; // Rémunéré ou non
    
    company_name: string; // Nom de l'Entreprise 
    
    // Relations supposées chargées par Laravel pour afficher les informations requises
    student: Student | null; 
    company: CompanyDetail | null; 
    
    // Propriétés du modèle Internship non utilisées dans l'affichage final
    company_siren: string;
    start_date: string;
    end_date: string;
    is_remote: boolean;
};

// Simulation des données d'entrée (Mises à jour en snake_case)
const MOCK_INTERNSHIPS: Internship[] = [
    { id: 1, internship_subject: "Développement Full Stack", company_name: "TechInnov SARL", is_paid: true, student: { student_id: 101, first_name: "Alice", last_name: "Dupont" }, company: { city: "Paris" }, company_siren: '1234', start_date: '2023-09-01', end_date: '2024-02-28', is_remote: false },
    { id: 2, internship_subject: "Analyse de Données Junior", company_name: "DataCorp Inc.", is_paid: false, student: { student_id: 102, first_name: "Bob", last_name: "Martin" }, company: { city: "Lyon" }, company_siren: '5678', start_date: '2023-10-15', end_date: '2024-04-15', is_remote: true },
    { id: 3, internship_subject: "Design UX/UI Mobile", company_name: "Creative Labs", is_paid: true, student: { student_id: 103, first_name: "Charlie", last_name: "Lefevre" }, company: { city: "Paris" }, company_siren: '9012', start_date: '2024-01-01', end_date: '2024-06-30', is_remote: false },
    { id: 4, internship_subject: "Cybersécurité", company_name: "TechInnov SARL", is_paid: true, student: { student_id: 104, first_name: "Diana", last_name: "Rousseau" }, company: { city: "Bordeaux" }, company_siren: '3456', start_date: '2024-03-01', end_date: '2024-08-31', is_remote: true },
];

// ====================================================================
// SECTION MOCK COMPONENTS
// Composants simulés pour rendre le code autonome.
// ====================================================================

const MockAdminDashboardSidebar = () => (
    <div className="w-64 bg-white shadow-xl p-6 hidden lg:block rounded-r-xl">
        <p className="text-lg font-bold text-blue-600 mb-6">Menu (Mock)</p>
        <div className="space-y-2">
            <a href="#" className="block p-2 rounded-lg bg-blue-100 text-blue-800 font-medium">Stages</a>
            <a href="#" className="block p-2 rounded-lg text-gray-600 hover:bg-gray-50">Profils</a>
        </div>
    </div>
);

type MockFilterProps = {
    onCompanySelect: (company: { nom_complet: string } | null) => void;
};

const MockCompanyFilter = ({ onCompanySelect }: MockFilterProps) => (
    <div className="flex flex-wrap gap-3">
        <button 
            onClick={() => onCompanySelect({ nom_complet: "TechInnov SARL" })}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
            Filtrer: TechInnov SARL
        </button>
        <button 
            onClick={() => onCompanySelect({ nom_complet: "Creative Labs" })}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
            Filtrer: Creative Labs
        </button>
        <button 
            onClick={() => onCompanySelect(null)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
        >
            Réinitialiser le filtre
        </button>
    </div>
);


// ====================================================================
// COMPOSANT PRINCIPAL (InternshipsIndex)
// ====================================================================

type InternshipsProps = {
    internships?: Internship[];
}

export default function InternshipsIndex({ internships = MOCK_INTERNSHIPS }: InternshipsProps){
    const [selectedCompany, setSelectedCompany] = useState<any>(null);

    const handleCompanySelect = (company: any) => {
        setSelectedCompany(company);
    };

    const handleBlur = (fieldName: string, value: any) => {
        console.log(`Champ ${fieldName} flouté. Valeur: ${value}`);
    };

    const filteredInternships = selectedCompany
        ? internships.filter((internship: Internship) => 
            internship.company_name === selectedCompany.nom_complet
        )
        : internships;

    return (
        <div className="flex min-h-screen bg-gray-50 font-[Inter]">
            <MockAdminDashboardSidebar />

            <main className="flex-1 p-4 sm:p-8">
                <div className="mx-auto max-w-6xl">
                    {/* Header */}
                    <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-blue-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                        </svg>
                        <h1 className="text-3xl font-bold text-gray-800">Liste des stages</h1>
                    </div>

                    {/* Champ de recherche pour le filtre (simulé) */}
                    <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700">Filtrer par entreprise</h3>
                        <MockCompanyFilter 
                            onCompanySelect={handleCompanySelect}
                        />
                        {selectedCompany && (
                            <p className="mt-3 text-sm text-blue-600 font-medium">
                                Filtre actuel : {selectedCompany.nom_complet}
                            </p>
                        )}
                    </div>


                    {/* Liste des Stages en Grille */}
                    {filteredInternships.length === 0 ? (
                        <div className="rounded-lg bg-white p-12 text-center shadow-md">
                            <p className="mt-4 text-lg font-medium text-gray-600">
                                {selectedCompany ? `Aucun stage trouvé pour l'entreprise sélectionnée : ${selectedCompany.nom_complet}` : 'Aucun stage trouvé.'}
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredInternships.map((internship) => (
                                <div
                                    key={internship.id}
                                    className="group rounded-xl bg-white p-6 shadow-lg border-t-4 border-blue-600 transition-all duration-200 hover:shadow-xl"
                                >
                                    
                                    {/* Sujet du Stage (internship_subject) */}
                                    <h3 className="mb-3 text-xl font-bold text-gray-800 border-b pb-2">
                                        {internship.internship_subject || `Stage #${internship.id}`}
                                    </h3>
                                    
                                    {/* Détails du Stage (5 champs requis) */}
                                    <div className="space-y-3 text-sm text-gray-600 pt-2">
                                        
                                        {/* Nom de l'Entreprise */}
                                        <p className="flex items-center">
                                            <span className="font-semibold text-gray-700 w-2/5">Entreprise :</span> 
                                            <span className="w-3/5 truncate font-medium text-gray-800">{internship.company_name || 'N/A'}</span>
                                        </p>

                                        {/* Ville */}
                                        <p className="flex items-center">
                                            <span className="font-semibold text-gray-700 w-2/5">Ville :</span> 
                                            <span className="w-3/5 truncate">{internship.company?.city || 'Inconnue'}</span>
                                        </p>

                                        {/* Nom de l'Étudiant */}
                                        <p className="flex items-center">
                                            <span className="font-semibold text-gray-700 w-2/5">Étudiant :</span> 
                                            <span className="w-3/5 truncate">
                                                {internship.student 
                                                    ? `${internship.student.first_name} ${internship.student.last_name}` 
                                                    : 'Non assigné'}
                                            </span>
                                        </p>

                                        {/* Rémunéré ou non (is_paid) */}
                                        <p className="flex items-center">
                                            <span className="font-semibold text-gray-700 w-2/5">Rémunération :</span>
                                            <span className={`font-bold ${internship.is_paid ? 'text-green-600' : 'text-red-500'}`}>
                                                {internship.is_paid ? ' Oui' : ' Non'}
                                            </span>
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-6 border-t pt-4">
                                        <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                                            Voir
                                        </button>
                                        <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}