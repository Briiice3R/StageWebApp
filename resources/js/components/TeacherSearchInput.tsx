import { useAutoComplete } from '@/hooks/useAutoComplete';

import teacherHandler from '@/utils/teacherHandler';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label } from '@headlessui/react';
import { Teacher } from '@/types/model';


type FieldName = 'teacher.teacher_id';
type TeacherSearchInputProps = {
    onTeacherSelect: (teacher: Teacher) => void;
    onBlurEffect: (fieldName: FieldName, value: string) => void;
    error?: string;
};

export default function TeacherSearchInput({ onTeacherSelect, onBlurEffect, error }: TeacherSearchInputProps) {
    const {
        setQuery,
        data, setData,
        selected, setSelected,
        apiError, setApiError,
        isLoading
    } = useAutoComplete<Teacher>(
        teacherHandler.getTeacherByText,
        0,
        800
    );

    return (
        <Field className="w-full">
            <Label className="mb-2 block text-sm font-medium text-gray-700">
                Tuteur pédagogique <span className="text-red-500">*</span>
            </Label>
            <Combobox
                value={selected}
                onChange={(s: Teacher | null) => {
                    setSelected(s);
                    setData([]);
                    setApiError('');
                    if (s) {
                        onTeacherSelect(s);
                    }
                }}
            >
                <div className="relative">
                    <ComboboxInput
                        displayValue={(s: Teacher | null) => (s ? `${s.last_name} ${s.first_name}` : '')}
                        className={`w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'} }`}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelected(null);
                        }}
                        onBlur={() => {
                            if (selected) {
                                onBlurEffect('teacher.teacher_id', selected.teacher_id);
                            } else {
                                onBlurEffect('teacher.teacher_id', '');
                            }
                        }}
                        placeholder="Recherchez un professeur par son nom ou son prénom."
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? 'teacher.teacher_id-error' : undefined}
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

                    {(data.length > 0 || apiError) && (
                        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg focus:outline-none">
                            {data.length > 0
                                ? data.map((s: Teacher) => (
                                    <ComboboxOption
                                        className={({ focus }) =>
                                            `${focus ? 'bg-blue-50' : 'bg-white even:bg-gray-50'} relative cursor-pointer px-4 py-3 transition-colors select-none hover:bg-blue-100`
                                        }
                                        key={s.teacher_id}
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
