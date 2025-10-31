import studentHandler from '@/utils/studentHandler';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label } from '@headlessui/react';
import { useEffect, useState } from 'react';
type Student = {
    student_id: string;
    first_name: string;
    last_name: string;
};

type FieldName = 'student.student_id';
type StudentSearchInputProps = {
    onStudentSelect: (student: Student) => void;
    onBlurEffect: (fieldName: FieldName, value: any) => void;
    error?: string;
};

export default function StudentSearchInput({ onStudentSelect, onBlurEffect, error }: StudentSearchInputProps) {
    const [studentQuery, setStudentQuery] = useState<string>('');
    const [studentData, setStudentData] = useState<Student[]>([]);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [apiError, setApiError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!studentQuery.trim()) {
            setStudentData([]);
            setApiError('');
            setIsLoading(false);
            return;
        }
        const abortController = new AbortController();

        const interval = setTimeout(async () => {
            setIsLoading(true);
            setApiError('');
            try {
                const reqApi = await studentHandler.getStudentByText(studentQuery.trim(), abortController.signal);
                
                
                if (reqApi.data && reqApi.data.data) {
                    setStudentData(reqApi.data.data);
                    if (reqApi.data.data.length === 0) setApiError('Aucun étudiant trouvé.');
                } else setApiError('Erreur lors de la recherche.');
            } catch (e: any) {
                if (e.name !== 'AbortError') {
                    setApiError("Erreur de connexion à l'API.");
                    console.error('Erreur API : ', e);
                }
            } finally {
                setIsLoading(false);
            }
        }, 800);
        return () => {
            clearTimeout(interval);
            abortController.abort();
        };
    }, [studentQuery]);

    return (
        <Field className="w-full">
            <Label className="mb-2 block text-sm font-medium text-gray-700">
                Étudiant <span className="text-red-500">*</span>
            </Label>
            <Combobox
                value={selectedStudent}
                onChange={(s: Student | null) => {
                    setSelectedStudent(s);
                    setStudentData([]);
                    setApiError('');
                    if (s) {
                        onStudentSelect(s);
                    }
                }}
            >
                <div className="relative">
                    <ComboboxInput
                        displayValue={(s: Student | null) => (s ? `${s.last_name} ${s.first_name}` : '')}
                        className={`w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} }`}
                        onChange={(e) => {
                            setStudentQuery(e.target.value);
                            setSelectedStudent(null);
                        }}
                        onBlur={() => {
                            if (selectedStudent) {
                                onBlurEffect('student.student_id', selectedStudent.student_id);
                            } else {
                                onBlurEffect('student.student_id', '');
                            }
                        }}
                        placeholder="Recherchez un étudiant par son nom ou son prénom."
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? 'student.student_id-error' : undefined}
                    />

                    {isLoading && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg className="h-5 w-5 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </div>
                    )}

                    {(studentData.length > 0 || apiError) && (
                        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg focus:outline-none">
                            {studentData.length > 0
                                ? studentData.map((s: Student) => (
                                      <ComboboxOption
                                          className={({ focus }) =>
                                              `${focus ? 'bg-blue-50' : 'bg-white even:bg-gray-50'} relative cursor-pointer px-4 py-3 transition-colors select-none hover:bg-blue-100`
                                          }
                                          key={s.student_id}
                                          value={s}
                                      >
                                          <div>
                                              <div className="mb-1 font-semibold text-gray-900">
                                                  {s.last_name} {s.first_name}
                                              </div>
                                          </div>
                                      </ComboboxOption>
                                  ))
                                : !isLoading && <div className="px-4 py-3 text-center text-sm text-gray-500">{apiError}</div>}
                        </ComboboxOptions>
                    )}
                </div>
            </Combobox>
            
        </Field>
    );
}
