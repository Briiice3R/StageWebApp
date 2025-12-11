import { Head, Link } from '@inertiajs/react';
import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import { Student } from '@/types/model';

type InternshipsProps = {
    student: Student;
    internships: any[];
}

export default function Internships({ student, internships }: InternshipsProps) {
    return (
        <>
            <Head title={`Stages de ${student.first_name} ${student.last_name}`} />

            <div className="flex min-h-screen bg-gray-50 p-8">
                <AdminDashboardSidebar />

                <main className="flex-1 p-8">
                    <div className="mx-auto max-w-6xl">
                        {/* Header */}
                        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                            <div className="flex items-center gap-3">
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
                                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                    />
                                </svg>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-800">
                                        Stages de {student.first_name} {student.last_name}
                                    </h1>
                                    <p className="text-sm text-gray-500">Numéro étudiant : {student.student_id}</p>
                                </div>
                            </div>
                            <Link
                                href="/admin/students"
                                className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                                </svg>
                                Retour
                            </Link>
                        </div>

                        {/* Liste des stages */}
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
                                        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                                    />
                                </svg>
                                <p className="mt-4 text-lg font-medium text-gray-600">Aucun stage trouvé</p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Cet étudiant n'a pas encore de stage enregistré.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {internships.map((internship) => (
                                    <div
                                        key={internship.id}
                                        className="rounded-lg bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg"
                                    >
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800">
                                                    {internship.internship_subject}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    SIRET : {internship.company_siret}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                {internship.is_remote && (
                                                    <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                                                        Télétravail
                                                    </span>
                                                )}
                                                {internship.is_paid && (
                                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                        Rémunéré
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="text-xs font-medium uppercase text-gray-500">
                                                    Date de début
                                                </p>
                                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                                    {new Date(internship.start_date).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium uppercase text-gray-500">
                                                    Date de fin
                                                </p>
                                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                                    {new Date(internship.end_date).toLocaleDateString('fr-FR')}
                                                </p>
                                            </div>
                                        </div>

                                        {internship.student_task && (
                                            <div className="mt-4">
                                                <p className="text-xs font-medium uppercase text-gray-500">
                                                    Tâches de l'étudiant
                                                </p>
                                                <p className="mt-1 text-sm text-gray-700">{internship.student_task}</p>
                                            </div>
                                        )}

                                        {internship.comment && (
                                            <div className="mt-4">
                                                <p className="text-xs font-medium uppercase text-gray-500">
                                                    Commentaire
                                                </p>
                                                <p className="mt-1 text-sm text-gray-700">{internship.comment}</p>
                                            </div>
                                        )}
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
