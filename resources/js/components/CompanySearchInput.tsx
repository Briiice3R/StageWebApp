import { useAutoComplete } from '@/hooks/useAutoComplete';
import companyHandler from '@/utils/companyHandler';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label } from '@headlessui/react';
import { Company } from '@/types/model';




type FieldName = 'company.siret';

type CompanySearchInputProps = {
    onCompanySelect: (company: Company) => void;
    onBlurEffect: (fieldName: FieldName, value: any) => void;
    error?: string;
};

export default function CompanySearchInput({ onCompanySelect, error, onBlurEffect }: CompanySearchInputProps) {
    const {
        setQuery,
        data, setData,
        selected, setSelected,
        apiError, setApiError,
        isLoading
    }
    = useAutoComplete<Company>(
        companyHandler.getCompanyByText,
        3,
        800
    );



    return (
        <Field className="w-full" id="companies">
            <Label className="mb-2 block text-sm font-medium text-gray-700">
                Nom de l'entreprise / SIRET <span className="text-red-500">*</span>
            </Label>
            <Combobox
                value={selected}
                onChange={(c: Company | null) => {
                    setSelected(c);
                    setData([]);
                    setApiError('');

                    if (c) {
                        onCompanySelect(c);
                    }
                }}
            >
                <div className="relative">
                    <ComboboxInput
                        displayValue={(c: Company | null) => (c ? `${c.nom_complet} (${c.siege.siret})` : '')}
                        className={`w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                            error ? 'border-red-500' : 'border-gray-300'
                        }`}
                        onChange={(e) => {
                            setQuery(`?q=${e.target.value}`);
                            setSelected(null);
                        }}
                        onBlur={() => {
                            if (selected) {
                                onBlurEffect('company.siret', selected.siege.siret);
                            } else {
                                onBlurEffect('company.siret', '');
                            }
                        }}
                        placeholder="Recherchez une entreprise par nom ou SIRET (min. 3 caractères)"
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? 'company-error' : undefined}
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

                    {(data.length > 0 || (apiError && data.length >= 3)) && (
                        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg focus:outline-none">
                            {data.length > 0 ? (
                                data.map((c: Company) => (
                                    <ComboboxOption
                                        className={({ focus }) =>
                                            `${focus ? 'bg-blue-50' : 'bg-white even:bg-gray-50'} relative cursor-pointer select-none px-4 py-3 transition-colors hover:bg-blue-100`
                                        }
                                        key={c.siege.siret}
                                        value={c}
                                    >
                                        <div>
                                            <div className="mb-1 font-semibold text-gray-900">{c.nom_complet}</div>
                                            <div className="text-xs text-gray-600">
                                                <span className="font-medium">SIRET :</span> {c.siege.siret}
                                            </div>
                                            <div className="text-xs text-gray-600">
                                                <span className="font-medium">Ville :</span> {c.siege.city?.nom || 'Inconnue'} ({c.siege.code_postal})
                                            </div>
                                        </div>
                                    </ComboboxOption>
                                ))
                            ) : (
                                !isLoading && <div className="px-4 py-3 text-center text-sm text-gray-500">{apiError}</div>
                            )}
                        </ComboboxOptions>
                    )}
                </div>
            </Combobox>

            <p className="mt-1 text-xs text-gray-500">Tapez au moins 3 caractères pour lancer la recherche</p>
        </Field>
    );
}
