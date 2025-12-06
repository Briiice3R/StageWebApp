import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import CompanySearchInput from '@/components/CompanySearchInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import {ValidationRules} from '@/types';
import { useValidation } from '@/hooks/useValidation';


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

type FieldName =
    | 'company.siren'
    | 'internship.subject'
    | "internship.isPaid"

const { data, setData, post, processing, errors, reset, transform } = useForm({
        internship: {
            subject: '',
            isPaid: ''
        },
        company: {
            siren: '',
        },
    });
    const rules: Partial<Record<FieldName, ValidationRules[]>> = {
        'company.siren': [
            {
                condition: (v) => !v,
                errorMessage: 'Vous devez sélectionner une entreprise.',
            },
        ],
        'internship.isPaid': [
            {
                condition: (v) => !v,
                errorMessage: 'Vous devez chosir si le stage est rémunéré.',
            },
        ],
        'internship.subject': [
            {
                condition: (v) => !v,
                errorMessage: 'Vous devez saisir un sujet de stage.',
            },
            {
                condition: (v) => v.length < 10,
                errorMessage: 'Le sujet doit faire au moins 10 caractères.',
            },
        ],
    };
    const handleSubmit: FormEventHandler = (e) => {
        const isValidate:boolean = validate(e);
        if(isValidate){
            transform((data) => ({
                ...data,
                internship: {
                    ...data.internship,
                    startDate: new Date(data.internship.startDate).toLocaleString('fr-FR').split(' ')[0],
                    endDate: new Date(data.internship.endDate).toLocaleString('fr-FR').split(' ')[0],
                },
            }));
            post('/admin/internships', {
                onSuccess: () => {
                    reset();
                    setFrontErrors({});
                    setHasTouched({});
                },
                onError: (errors) => {
                    console.error('Erreurs de validation backend:', errors);
                },
            });
        }
    };

    const {getError, validate, handleBlurField, setFrontErrors, setHasTouched} = useValidation(
            errors,
            rules,
            data

        );

// ====================================================================
// COMPOSANT PRINCIPAL (InternshipsIndex)
// ====================================================================

type InternshipsProps = {
    internships: Internship[];
}

export default function InternshipsIndex({ internships }: InternshipsProps){

    return (
        <>
            <Head title="Stages" />
            
            <div className="flex min-h-screen bg-gray-50 p-8">
                <AdminDashboardSidebar />

                <main className="flex-1 p-8">
                    <div className="mx-auto max-w-6xl">
                        
                        {/* 1. Header */}
                        <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={1.5} 
                                stroke="currentColor" 
                                className="h-8 w-8 text-blue-600"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                            </svg>
                            <h1 className="text-3xl font-bold text-gray-800">Liste des stages</h1>
                        </div>

                        {/* 2. Conteneur de Filtre (Nettoyé) */}
                        {/* Ce bloc est maintenant juste un placeholder simple sans logique de filtre client */}
                        <div className="mb-6 rounded-lg bg-white p-6 shadow-md border-b border-gray-200">
                            <h3 className="text-xl font-bold mb-3 text-gray-800">Filtrer les stages</h3>
                            <p className="text-sm text-gray-500">
                                <form onSubmit={handleSubmit}>
                                    {/* ENTREPRISE */}
                                    <div className="mb-8">
                                        <div className="mb-4 flex items-center gap-2">
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
                                            <h2 className="text-xl font-semibold text-gray-800">Entreprise</h2>
                                        </div>
                                        <CompanySearchInput
                                            onCompanySelect={(company) => {
                                                setData('company', {
                                                    siren: company.siren,
                                                });
                                            }}
                                            onBlurEffect={(fieldName, value) => handleBlurField(fieldName, value)}
                                            error={getError('company.siren')}
                                        />
                                        {getError('company.siren') && <p className="mt-1 text-sm text-red-600">{getError('company.siren')}</p>}
                                    </div>
                                </form>
                                <button className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>Rémunératation : Oui
                                </button>
                            </p>
                        </div>

                        {/* 3. Liste des Stages en Grille */}
                        {internships.length === 0 ? (
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
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                                <p className="mt-4 text-lg font-medium text-gray-600">Aucun stage trouvé</p>
                                <p className="mt-2 text-sm text-gray-500">Commencez par ajouter des stages à la base de données.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {internships.map((internship) => (
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