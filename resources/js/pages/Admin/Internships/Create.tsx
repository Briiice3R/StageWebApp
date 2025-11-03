import AdminDashboardSidebar from '@/components/AdminDashboardSidebar';
import CompanySearchInput from '@/components/CompanySearchInput';
import StudentSearchInput from '@/components/StudentSearchInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

type FieldName =
    | 'company.siren'
    | 'internship.startDate'
    | 'internship.endDate'
    | 'internship.subject'
    | 'internship.studentTask'
    | 'internship.comment'
    | 'internship.teacher'
    | 'internship.isRemote'
    | 'supervisor.first_name'
    | 'supervisor.last_name'
    | 'supervisor.mail'
    | 'supervisor.phone'
    | 'student.student_id';

// noinspection JSUnusedGlobalSymbols
export default function CreateInternship() {
    const [frontErrors, setFrontErrors] = useState<Partial<Record<FieldName, string>>>({});
    const [, setHasTouched] = useState<Partial<Record<FieldName, boolean>>>({});

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        internship: {
            startDate: '',
            endDate: '',
            subject: '',
            studentTask: '',
            comment: '',
            teacher: '',
            isRemote: '',
        },
        student: {
            student_id: '',
        },
        company: {
            siren: '',
        },
        supervisor: {
            first_name: '',
            last_name: '',
            mail: '',
            phone: '',
        },
    });

    const getError = (fieldName: FieldName) => {
        return frontErrors[fieldName] || errors[fieldName as keyof typeof errors];
    };

    const handleBlurField = (fieldName: FieldName, value: string) => {
        setHasTouched((prev) => ({ ...prev, [fieldName]: true }));

        const error = validationFields(fieldName, value);

        setFrontErrors((prev) => {
            const newErrors = { ...prev };
            if (error) {
                newErrors[fieldName] = error;
            } else {
                delete newErrors[fieldName];
            }
            return newErrors;
        });
    };

    const validationFields = (fieldName: FieldName, value: string) => {
        switch (fieldName) {
            case 'company.siren':
                if (!value) return 'Vous devez sélectionner une entreprise.';
                break;

            case 'internship.startDate':
                if (!value) return 'Vous devez saisir une date de début.';
                break;

            case 'internship.endDate':
                if (!value) return 'Vous devez saisir une date de fin.';
                if (data.internship.startDate && value <= data.internship.startDate) {
                    return 'La date de fin doit être supérieure à la date de début.';
                }
                break;

            case 'internship.isRemote':
                if (!value) return 'Vous devez choisir une option de télétravail.';
                break;

            case 'internship.subject':
                if (!value) return 'Le sujet du stage est requis.';
                if (value.length < 10) return 'Le sujet doit faire au moins 10 caractères.';
                break;

            case 'internship.studentTask':
                if (!value) return "Les tâches de l'étudiant sont requises.";
                if (value.length < 20) return 'Veuillez décrire les tâches plus en détail (min. 20 caractères).';
                break;

            case 'student.student_id':
                if (!value) return 'Vous devez sélectionner un étudiant.';
                break;

            case 'internship.teacher':
                if (!value) return 'Le nom du maître de stage est requis.';
                break;

            case 'supervisor.first_name':
                if (!value) return 'Le prénom du tuteur est requis.';
                break;
            case 'supervisor.last_name':
                if (!value) return 'Le nom du tuteur est requis.';
                break;

            case 'supervisor.mail': {
                if (!value) return "L'email du tuteur est requis.";
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return "L'email doit être valide.";
                break;
            }

            case 'supervisor.phone':{
                if (!value) return 'Le téléphone du tuteur est requis.';
                const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
                if (!phoneRegex.test(value)) return 'Le numéro de téléphone doit être valide (format français).';
                break;
            }
        }
        return null;
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const validationErrors: Partial<Record<FieldName, string>> = {};

        validationErrors['company.siren'] = validationFields('company.siren', data.company.siren) || undefined;
        validationErrors['internship.startDate'] = validationFields('internship.startDate', data.internship.startDate) || undefined;
        validationErrors['internship.endDate'] = validationFields('internship.endDate', data.internship.endDate) || undefined;
        validationErrors['internship.isRemote'] = validationFields('internship.isRemote', data.internship.isRemote) || undefined;
        validationErrors['internship.subject'] = validationFields('internship.subject', data.internship.subject) || undefined;
        validationErrors['internship.studentTask'] = validationFields('internship.studentTask', data.internship.studentTask) || undefined;
        validationErrors['internship.teacher'] = validationFields('internship.teacher', data.internship.teacher) || undefined;
        validationErrors['student.student_id'] = validationFields('student.student_id', data.student.student_id) || undefined;
        validationErrors['supervisor.first_name'] = validationFields('supervisor.first_name', data.supervisor.first_name) || undefined;
        validationErrors['supervisor.last_name'] = validationFields('supervisor.last_name', data.supervisor.last_name) || undefined;
        validationErrors['supervisor.mail'] = validationFields('supervisor.mail', data.supervisor.mail) || undefined;
        validationErrors['supervisor.phone'] = validationFields('supervisor.phone', data.supervisor.phone) || undefined;

        Object.keys(validationErrors).forEach((key) => {
            if (!validationErrors[key as FieldName]) delete validationErrors[key as FieldName];
        });

        if (Object.keys(validationErrors).length > 0) {
            setFrontErrors(validationErrors);

            setHasTouched({
                'company.siren': true,
                'internship.startDate': true,
                'internship.endDate': true,
                'internship.isRemote': true,
                'internship.subject': true,
                'internship.studentTask': true,
                'internship.teacher': true,
                'student.student_id': true,
                'supervisor.first_name': true,
                'supervisor.last_name': true,
                'supervisor.mail': true,
                'supervisor.phone': true,
            });

            return;
        }

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
    };


    return (
        <>
            <Head title="Ajouter un stage" />

            <div className="flex min-h-screen bg-gray-50 p-8">
                <AdminDashboardSidebar />
                <main className='flex-1 p-8'>
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
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                />
                            </svg>
                            <h1 className="text-3xl font-bold text-gray-800">Ajouter un stage</h1>
                        </div>

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

                            {/* PÉRIODE DU STAGE */}
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
                                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                                        />
                                    </svg>
                                    <h2 className="text-xl font-semibold text-gray-800">Période du stage</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="startDate" className="mb-2 block text-sm font-medium text-gray-700">
                                            Date de début <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className={`w-full rounded-md border ${getError('internship.startDate') ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                            type="date"
                                            id="startDate"
                                            value={data.internship.startDate}
                                            onChange={(e) =>
                                                setData('internship', {
                                                    ...data.internship,
                                                    startDate: e.target.value,
                                                })
                                            }
                                            onBlur={(e) => handleBlurField('internship.startDate', e.target.value)}
                                            aria-invalid={getError('internship.startDate') ? 'true' : 'false'}
                                            aria-describedby={getError('internship.startDate') ? 'startDate-error' : undefined}
                                        />
                                        {getError('internship.startDate') && (
                                            <p id="startDate-error" className="mt-1 text-sm text-red-600">
                                                {getError('internship.startDate')}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-gray-700">
                                            Date de fin <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className={`w-full rounded-md border ${getError('internship.endDate') ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                            type="date"
                                            id="endDate"
                                            value={data.internship.endDate}
                                            onChange={(e) =>
                                                setData('internship', {
                                                    ...data.internship,
                                                    endDate: e.target.value,
                                                })
                                            }
                                            onBlur={(e) => handleBlurField('internship.endDate', e.target.value)}
                                            aria-invalid={getError('internship.endDate') ? 'true' : 'false'}
                                            aria-describedby={getError('internship.endDate') ? 'endDate-error' : undefined}
                                        />
                                        {getError('internship.endDate') && (
                                            <p id="endDate-error" className="mt-1 text-sm text-red-600">
                                                {getError('internship.endDate')}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <p className="mb-2 block text-sm font-medium text-gray-700">
                                        Télétravail <span className="text-red-500">*</span>
                                    </p>
                                    <div className={`flex gap-6`}>
                                        <label htmlFor="remoteYes" className="flex cursor-pointer items-center">
                                            <input
                                                name="isRemote"
                                                id="remoteYes"
                                                type="radio"
                                                value="Oui"
                                                checked={data.internship.isRemote === 'true'}
                                                onBlur={(e) => handleBlurField('internship.isRemote', e.target.value)}
                                                onChange={() => setData('internship.isRemote', 'true')}
                                                className="mr-2"
                                            />
                                            Oui
                                        </label>
                                        <label htmlFor="remoteNo" className="flex cursor-pointer items-center">
                                            <input
                                                name="isRemote"
                                                id="remoteNo"
                                                type="radio"
                                                value="Non"
                                                checked={data.internship.isRemote === 'false'}
                                                onBlur={(e) => handleBlurField('internship.isRemote', e.target.value)}
                                                onChange={() => setData('internship.isRemote', 'false')}
                                                className="mr-2"
                                            />
                                            Non
                                        </label>
                                    </div>
                                    {getError('internship.isRemote') && (
                                        <p className="mt-1 text-sm text-red-600">{getError('internship.isRemote')}</p>
                                    )}
                                </div>
                            </div>

                            {/* DÉTAILS DU STAGE */}
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
                                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                                        />
                                    </svg>
                                    <h2 className="text-xl font-semibold text-gray-800">Détails du stage</h2>
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="internshipSubject" className="mb-2 block text-sm font-medium text-gray-700">
                                        Sujet de stage <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className={`w-full rounded-md border ${getError('internship.subject') ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                        id="internshipSubject"
                                        type="text"
                                        value={data.internship.subject}
                                        onChange={(e) =>
                                            setData('internship', {
                                                ...data.internship,
                                                subject: e.target.value,
                                            })
                                        }
                                        onBlur={(e) => handleBlurField('internship.subject', e.target.value)}
                                        aria-invalid={getError('internship.subject') ? 'true' : 'false'}
                                        aria-describedby={getError('internship.subject') ? 'subject-error' : undefined}
                                        placeholder="Ex: Développement d'une application web"
                                    />
                                    {getError('internship.subject') && (
                                        <p id="subject-error" className="mt-1 text-sm text-red-600">
                                            {getError('internship.subject')}
                                        </p>
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="studentTask" className="mb-2 block text-sm font-medium text-gray-700">
                                        Tâches de l'étudiant <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        className={`w-full rounded-md border ${getError('internship.studentTask') ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                        id="studentTask"
                                        rows={4}
                                        value={data.internship.studentTask}
                                        onChange={(e) =>
                                            setData('internship', {
                                                ...data.internship,
                                                studentTask: e.target.value,
                                            })
                                        }
                                        onBlur={(e) => handleBlurField('internship.studentTask', e.target.value)}
                                        aria-invalid={getError('internship.studentTask') ? 'true' : 'false'}
                                        aria-describedby={getError('internship.studentTask') ? 'studentTask-error' : undefined}
                                        placeholder="Décrivez les tâches effectuées pendant le stage"
                                    />
                                    {getError('internship.studentTask') && (
                                        <p id="studentTask-error" className="mt-1 text-sm text-red-600">
                                            {getError('internship.studentTask')}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="comment" className="mb-2 block text-sm font-medium text-gray-700">
                                        Commentaire
                                    </label>
                                    <textarea
                                        className={`w-full rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                        id="comment"
                                        rows={3}
                                        value={data.internship.comment}
                                        onChange={(e) =>
                                            setData('internship', {
                                                ...data.internship,
                                                comment: e.target.value,
                                            })
                                        }
                                        placeholder="Commentaires additionnels (optionnel)"
                                    />
                                </div>
                            </div>

                            {/* PARTICIPANTS */}
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
                                            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                        />
                                    </svg>
                                    <h2 className="text-xl font-semibold text-gray-800">Participants</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <StudentSearchInput
                                            onStudentSelect={(student) => {
                                                setData('student', {
                                                    student_id: student.student_id,
                                                });
                                            }}
                                            onBlurEffect={(fieldName, value) => handleBlurField(fieldName, value)}
                                            error={getError('student.student_id')}
                                        />
                                        {getError('student.student_id') && (
                                            <p className="mt-1 text-sm text-red-600">{getError('student.student_id')}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="teacher" className="mb-2 block text-sm font-medium text-gray-700">
                                            Maître de stage <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className={`w-full rounded-md border ${frontErrors['internship.teacher'] || errors['internship.teacher'] ? 'border-red-500' : 'border-gray-300'} px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                            id="teacher"
                                            type="text"
                                            value={data.internship.teacher}
                                            onChange={(e) =>
                                                setData('internship', {
                                                    ...data.internship,
                                                    teacher: e.target.value,
                                                })
                                            }
                                            onBlur={(e) => handleBlurField('internship.teacher', e.target.value)}
                                            aria-invalid={getError('internship.teacher') ? 'true' : 'false'}
                                            aria-describedby={getError('internship.teacher') ? 'teacher-error' : undefined}
                                            placeholder="Nom et prénom du maître de stage"
                                        />
                                        {getError('internship.teacher') && (
                                            <p id="teacher-error" className="mt-1 text-sm text-red-600">
                                                {getError('internship.teacher')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* TUTEUR DE STAGE */}
                            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-6">
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
                                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                                        />
                                    </svg>
                                    <h2 className="text-xl font-semibold text-gray-800">Tuteur de stage</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="supervisorFirstName" className="mb-2 block text-sm font-medium text-gray-700">
                                            Prénom <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className={`w-full rounded-md border ${frontErrors['supervisor.first_name'] || errors['supervisor.first_name'] ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                            id="supervisorFirstName"
                                            type="text"
                                            value={data.supervisor.first_name}
                                            onChange={(e) =>
                                                setData('supervisor', {
                                                    ...data.supervisor,
                                                    first_name: e.target.value,
                                                })
                                            }
                                            onBlur={(e) => handleBlurField('supervisor.first_name', e.target.value)}
                                            aria-invalid={getError('supervisor.first_name') ? 'true' : 'false'}
                                            aria-describedby={getError('supervisor.first_name') ? 'supervisorFirstName-error' : undefined}
                                            placeholder="Prénom du tuteur"
                                        />
                                        {getError('supervisor.first_name') && (
                                            <p id="supervisorFirstName-error" className="mt-1 text-sm text-red-600">
                                                {getError('supervisor.first_name')}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="supervisorLastName" className="mb-2 block text-sm font-medium text-gray-700">
                                            Nom <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className={`w-full rounded-md border ${frontErrors['supervisor.last_name'] || errors['supervisor.last_name'] ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                            id="supervisorLastName"
                                            type="text"
                                            value={data.supervisor.last_name}
                                            onChange={(e) =>
                                                setData('supervisor', {
                                                    ...data.supervisor,
                                                    last_name: e.target.value,
                                                })
                                            }
                                            onBlur={(e) => handleBlurField('supervisor.last_name', e.target.value)}
                                            aria-invalid={getError('supervisor.last_name') ? 'true' : 'false'}
                                            aria-describedby={getError('supervisor.last_name') ? 'supervisorLastName-error' : undefined}
                                            placeholder="Nom du tuteur"
                                        />
                                        {getError('supervisor.last_name') && (
                                            <p id="supervisorLastName-error" className="mt-1 text-sm text-red-600">
                                                {getError('supervisor.last_name')}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="supervisorMail" className="mb-2 block text-sm font-medium text-gray-700">
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
                                            className={`w-full rounded-md border ${frontErrors['supervisor.mail'] || errors['supervisor.mail'] ? 'border-red-500' : 'border-gray-300'} bg-white py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                            id="supervisorMail"
                                            type="email"
                                            value={data.supervisor.mail}
                                            onChange={(e) =>
                                                setData('supervisor', {
                                                    ...data.supervisor,
                                                    mail: e.target.value,
                                                })
                                            }
                                            onBlur={(e) => handleBlurField('supervisor.mail', e.target.value)}
                                            aria-invalid={getError('supervisor.mail') ? 'true' : 'false'}
                                            aria-describedby={getError('supervisor.mail') ? 'supervisorMail-error' : undefined}
                                            placeholder="email@exemple.com"
                                        />
                                    </div>
                                    {getError('supervisor.mail') && (
                                        <p id="supervisorMail-error" className="mt-1 text-sm text-red-600">
                                            {getError('supervisor.mail')}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="supervisorPhone" className="mb-2 block text-sm font-medium text-gray-700">
                                        Téléphone <span className="text-red-500">*</span>
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
                                                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            className={`w-full rounded-md border ${frontErrors['supervisor.phone'] || errors['supervisor.phone'] ? 'border-red-500' : 'border-gray-300'} bg-white py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500`}
                                            id="supervisorPhone"
                                            type="tel"
                                            value={data.supervisor.phone}
                                            onChange={(e) =>
                                                setData('supervisor', {
                                                    ...data.supervisor,
                                                    phone: e.target.value,
                                                })
                                            }
                                            onBlur={(e) => handleBlurField('supervisor.phone', e.target.value)}
                                            aria-invalid={getError('supervisor.phone') ? 'true' : 'false'}
                                            aria-describedby={getError('supervisor.phone') ? 'supervisorPhone-error' : undefined}
                                            placeholder="06 12 34 56 78"
                                        />
                                    </div>
                                    {getError('supervisor.phone') && (
                                        <p id="supervisorPhone-error" className="mt-1 text-sm text-red-600">
                                            {getError('supervisor.phone')}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {processing ? (
                                    <>
                                        <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Envoi en cours...
                                    </>
                                ) : (
                                    <>
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
                                        Enregistrer le stage
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
}
