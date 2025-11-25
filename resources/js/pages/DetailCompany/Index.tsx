import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import CompanySearchInput from '@/components/CompanySearchInput';
import StudentSearchInput from '@/components/StudentSearchInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { useValidation } from '@/hooks/useValidation';
import {ValidationRules} from '@/types';




export default function Index() {
    
    return (
        <>
        <Head title="Informations sur l'entreprise" />
                    <main className="flex min-h-screen bg-gray-50 p-8">
                        <AdminDashboardSidebar />
        <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
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
                    d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z"
                />
            </svg>
            <h1>Information sur l'entreprise</h1>
            
        </div>
            <h2 className="text-xl font-semibold text-gray-800">Numéro SIREN</h2>
            <h2 className="text-xl font-semibold text-gray-800">Nom de l'entreprise</h2>
            <h2 className="text-xl font-semibold text-gray-800">Coordonnées</h2>
            <h2 className="text-xl font-semibold text-gray-800">Adresse de l'entreprise</h2>
            <h2 className="text-xl font-semibold text-gray-800">Activité</h2>
            <h2 className="text-xl font-semibold text-gray-800">Nombre de stagiaire</h2>
        </div>
        </main>
        </>
    );
}
