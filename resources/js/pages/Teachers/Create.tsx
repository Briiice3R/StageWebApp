import { Head, useForm } from '@inertiajs/react';
import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import { useValidation } from '@/hooks/useValidation';
import { ValidationRules } from '@/types';

type FieldName =
    "teacher.firstname" |
    "teacher.lastname" |
    "teacher.email";
export default function CreateTeacher() {

    const { data, setData, post, processing, errors, reset } = useForm({
        teacher:{
            firstname: "",
            lastname: "",
            email: ""
        }
    });

    const rules:Partial<Record<FieldName, ValidationRules[]>> = {
        "teacher.firstname": [
            {
                condition: (v)=>!v,
                errorMessage: "Vous devez saisir le prénom du professeur."
            }
        ],
        "teacher.lastname": [
            {
                condition: (v)=>!v,
                errorMessage: "Vous devez saisir le nom du professeur."
            }
        ],
        "teacher.email": [
            {
                condition: (v)=>!v,
                errorMessage: "Vous devez saisir le mail du professeur."
            },
            {
                condition: (v)=>{
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return !emailRegex.test(v);
                },
                errorMessage: "Vous devez saisir le mail du professeur."
            }
        ],
    }

    const {getError, validate, handleBlurField, setFrontErrors, setHasTouched} = useValidation(
        errors,
        rules,
        data
    );
    return (
        <>
            <Head title="Ajouter un professeur"/>
            <main className="flex min-h-screen p-8 bg-gray-50">
                <AdminDashboardSidebar />
                <div className='flex-1 p-8'>
                    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-md">

                        {/* HEADER */}
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
                                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                                />
                            </svg>
                            <h1 className="text-3xl font-bold text-gray-800">Ajouter un professeur</h1>
                        </div>

                        <form>
                            {/* SECTION UNIQUE */}
                            <div className="mb-6">
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
                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                        />
                                    </svg>
                                    <h2 className="text-xl font-semibold text-gray-800">Informations du professeur</h2>
                                </div>

                                {/* PRÉNOM + NOM (côte à côte sur desktop) */}
                                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
                                            Prénom <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            id="firstName"
                                            type="text"
                                            placeholder="Jean"
                                            onBlur={(e)=>handleBlurField("teacher.firstname", e.target.value)}
                                        />
                                        {getError("teacher.firstname") && (
                                            <p id="firstname-error" className="mt-1 text-sm text-red-600">
                                                {getError('teacher.firstname')}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
                                            Nom <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            id="lastName"
                                            type="text"
                                            placeholder="Dupont"
                                            onBlur={(e)=>handleBlurField("teacher.lastname", e.target.value)}
                                        />
                                        {getError("teacher.lastname") && (
                                            <p id="firstname-error" className="mt-1 text-sm text-red-600">
                                                {getError('teacher.lastname')}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* EMAIL (pleine largeur) */}
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-5 w-5 text-gray-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            className="w-full rounded-md border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            id="email"
                                            type="email"
                                            placeholder="jean.dupont@ecole.fr"
                                            onBlur={(e)=>handleBlurField("teacher.email", e.target.value)}
                                        />
                                    </div>
                                    {getError("teacher.email") && (
                                        <p id="firstname-error" className="mt-1 text-sm text-red-600">
                                            {getError('teacher.email')}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* BOUTON SUBMIT */}
                            <button
                                type="submit"
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                Enregistrer le professeur
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
