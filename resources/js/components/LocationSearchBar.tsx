import { useEffect, useState } from 'react';
import locationHandler from '@/utils/locationHandler';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions, Field, Label } from '@headlessui/react';
import { City, Department, Region } from '@/types';

// ============================================
// TYPES
// ============================================

type LocationItem =
    | { type: 'city'; data: City }
    | { type: 'department'; data: Department }
    | { type: 'region'; data: Region };

type LocationSearchProps = {
    onLocationSelect: (location: LocationItem | null) => void;
    onBlurEffect?: (fieldName: string, value: any) => void;
    error?: string;
};

// ============================================
// COMPOSANT
// ============================================

export default function LocationSearchBar({ onLocationSelect, error, onBlurEffect }: LocationSearchProps) {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<LocationItem[]>([]);
    const [selected, setSelected] = useState<LocationItem | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [apiError, setApiError] = useState<string>('');

    // Recherche dans les 3 APIs simultanément
    useEffect(() => {
        if (!query.trim() || query.trim().length < 2) {
            setResults([]);
            setApiError('');
            setIsLoading(false);
            return;
        }

        const abortController = new AbortController();

        const fetchAllLocations = async () => {
            setIsLoading(true);
            setApiError('');

            try {
                // Lancer les 3 recherches en parallèle
                const [citiesRes, departmentsRes, regionsRes] = await Promise.allSettled([
                    locationHandler.getCityByText(query, abortController.signal),
                    locationHandler.getDepartmentByText(query, abortController.signal),
                    locationHandler.getRegionByName(query, abortController.signal)
                ]);

                // Récupérer les résultats réussis
                const cities: City[] = citiesRes.status === 'fulfilled' ? citiesRes.value.data : [];
                const departments: Department[] = departmentsRes.status === 'fulfilled' ? departmentsRes.value.data : [];
                const regions: Region[] = regionsRes.status === 'fulfilled' ? regionsRes.value.data : [];

                // Limiter le nombre de résultats par type
                const limitedCities = cities.slice(0, 5);
                const limitedDepartments = departments.slice(0, 3);
                const limitedRegions = regions.slice(0, 3);

                // Formater les résultats
                const allResults: LocationItem[] = [
                    ...limitedRegions.map(r => ({ type: 'region' as const, data: r })),
                    ...limitedDepartments.map(d => ({ type: 'department' as const, data: d })),
                    ...limitedCities.map(c => ({ type: 'city' as const, data: c }))
                ];

                setResults(allResults);

                if (allResults.length === 0) {
                    setApiError('Aucun résultat trouvé.');
                }
            } catch (e: any) {
                if (e.name !== 'AbortError') {
                    setApiError('Erreur de connexion à l\'API.');
                    console.error('Erreur API:', e);
                }
            } finally {
                setIsLoading(false);
            }
        };

        const timeout = setTimeout(fetchAllLocations, 500);

        return () => {
            clearTimeout(timeout);
            abortController.abort();
        };
    }, [query]);

    // Fonction pour obtenir le label d'affichage
    const getDisplayValue = (item: LocationItem | null): string => {
        if (!item) return '';

        switch (item.type) {
            case 'city':
                { const city = item.data as City;
                return `${city.nom} (${city.codesPostaux[0] || city.code})`; }
            case 'department':
                { const dept = item.data as Department;
                return `${dept.nom} (${dept.code})`; }
            case 'region':
                { const region = item.data as Region;
                return region.nom; }
        }
    };

    // Fonction pour obtenir la clé unique
    const getItemKey = (item: LocationItem): string => {
        return `${item.type}-${item.data.code}`;
    };

    // Fonction pour rendre une option
    const renderOption = (item: LocationItem) => {
        switch (item.type) {
            case 'city':
                { const city = item.data as City;
                return (
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                                Ville
                            </span>
                            <span className="font-semibold text-gray-900">{city.nom}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                            <span className="font-medium">Code postal :</span> {city.codesPostaux.join(', ') || 'Non disponible'}
                        </div>
                        <div className="text-xs text-gray-600">
                            <span className="font-medium">Département :</span> {city.codeDepartement}
                        </div>
                    </div>
                ); }

            case 'department':
                { const dept = item.data as Department;
                return (
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                                Département
                            </span>
                            <span className="font-semibold text-gray-900">{dept.nom}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                            <span className="font-medium">Code :</span> {dept.code}
                        </div>
                    </div>
                ); }

            case 'region':
                { const region = item.data as Region;
                return (
                    <div>
                        <div className="mb-1 flex items-center gap-2">
                            <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                                Région
                            </span>
                            <span className="font-semibold text-gray-900">{region.nom}</span>
                        </div>
                        <div className="text-xs text-gray-600">
                            <span className="font-medium">Code :</span> {region.code}
                        </div>
                    </div>
                ); }
        }
    };

    return (
        <Field className="w-full" id="unified-location-search">
            <Label className="mb-2 block text-sm font-medium text-gray-700">
                Recherche de localisation
            </Label>
            <Combobox
                value={selected}
                onChange={(item: LocationItem | null) => {
                    setSelected(item);
                    setResults([]);
                    setApiError('');

                    if (item) {
                        onLocationSelect(item);
                    }
                }}
            >
                <div className="relative">
                    <ComboboxInput
                        displayValue={getDisplayValue}
                        className={`w-full rounded-md border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                            error ? 'border-red-500' : 'border-gray-300'
                        }`}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setSelected(null);
                            if(e.target.value.trim() === ''){
                                onLocationSelect(null);
                            }
                        }}
                        onBlur={() => {
                            if (onBlurEffect) {
                                if (selected) {
                                    onBlurEffect('location', {
                                        type: selected.type,
                                        code: selected.data.code
                                    });
                                } else {
                                    onBlurEffect('location', null);
                                }
                            }
                        }}
                        placeholder="Recherchez une ville, un département ou une région (min. 2 caractères)"
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

                    {(results.length > 0 || apiError) && (
                        <ComboboxOptions className="absolute z-10 mt-1 max-h-96 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg focus:outline-none">
                            {results.length > 0 ? (
                                results.map((item: LocationItem) => (
                                    <ComboboxOption
                                        className={({ focus }) =>
                                            `${focus ? 'bg-blue-50' : 'bg-white'} relative cursor-pointer select-none px-4 py-3 transition-colors hover:bg-blue-100`
                                        }
                                        key={getItemKey(item)}
                                        value={item}
                                    >
                                        {renderOption(item)}
                                    </ComboboxOption>
                                ))
                            ) : (
                                !isLoading && <div className="px-4 py-3 text-center text-sm text-gray-500">{apiError}</div>
                            )}
                        </ComboboxOptions>
                    )}
                </div>
            </Combobox>

            <p className="mt-1 text-xs text-gray-500">
                Tapez au moins 2 caractères. Les résultats incluent les régions, départements et villes.
            </p>
        </Field>
    );
}
