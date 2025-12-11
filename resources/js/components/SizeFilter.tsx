import { useState } from 'react';
import { Field, Label, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import SizeSections from '@/data/SizeSections.json';
import { SizeSection } from '@/types';
// ============================================
// DONNÉES Size
// ============================================

// ============================================
// TYPES
// ============================================


type SizeFilterProps = {
    onSectionsChange: (sections: SizeSection[]) => void;
    error?: string;
};

// ============================================
// COMPOSANT
// ============================================

export default function SizeFilter({ onSectionsChange, error }: SizeFilterProps) {
    const [selectedSections, setSelectedSections] = useState<SizeSection[]>([]);

    const handleToggle = (section: SizeSection) => {
        const newSelection = selectedSections.includes(section)
            ? selectedSections.filter(s => s !== section)
            : [...selectedSections, section];

        setSelectedSections(newSelection);
        onSectionsChange(newSelection);
    };

    const handleSelectAll = () => {
        const allCodes:SizeSection[] = SizeSections.map(s => s);
        setSelectedSections(allCodes);
        onSectionsChange(allCodes);
    };

    const handleDeselectAll = () => {
        setSelectedSections([]);
        onSectionsChange([]);
    };

    const getDisplayText = () => {
        if (selectedSections.length === 0) {
            return 'Toutes les tailles';
        }
        if (selectedSections.length === SizeSections.length) {
            return 'Toutes les tailles';
        }
        if (selectedSections.length === 1) {
            return `${selectedSections[0].id} - ${selectedSections[0].libelle}`;
        }
        return `${selectedSections.length} tailles sélectionnées`;
    };

    return (
        <Field className="w-full">
            <Label className="mb-2 block text-sm font-medium text-gray-700">
                Taille (en salariés)
            </Label>

            <Popover className="relative">
                {({ open }) => (
                    <>
                        <PopoverButton
                            className={`relative w-full cursor-pointer rounded-md border ${
                                error ? 'border-red-500' : 'border-gray-300'
                            } bg-white py-2 pl-3 pr-10 text-left focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                open ? 'ring-2 ring-blue-500' : ''
                            }`}
                        >
                            <span className={selectedSections.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                                {getDisplayText()}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg
                                    className={`h-5 w-5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </PopoverButton>

                        <PopoverPanel className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-300 bg-white shadow-lg">
                            {/* Header avec boutons */}
                            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">
                                        Sélectionnez les tailles
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={handleSelectAll}
                                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                                        >
                                            Tout
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleDeselectAll}
                                            className="text-xs text-gray-600 hover:text-gray-800 underline"
                                        >
                                            Aucun
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Liste des secteurs avec scroll */}
                            <div className="max-h-80 overflow-y-auto">
                                {SizeSections.map((section) => (
                                    <label
                                        key={section.id}
                                        className={`flex cursor-pointer items-start gap-3 border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 ${
                                            selectedSections.includes(section)
                                                ? 'bg-blue-50 hover:bg-blue-100'
                                                : 'bg-white hover:bg-gray-50'
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedSections.includes(section)}
                                            onChange={() => handleToggle(section)}
                                            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                        />
                                        <div className="flex flex-1 items-start gap-2">
                                            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-blue-100 text-xs font-bold text-blue-700">
                                                {section.id}
                                            </span>
                                            <span className="flex-1 text-sm text-gray-900 leading-relaxed">
                                                {section.libelle}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            {/* Footer avec compteur */}
                            {selectedSections.length > 0 && (
                                <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
                                    <p className="text-xs text-gray-600">
                                        {selectedSections.length} secteur{selectedSections.length > 1 ? 's' : ''} sélectionné{selectedSections.length > 1 ? 's' : ''}
                                    </p>
                                </div>
                            )}
                        </PopoverPanel>
                    </>
                )}
            </Popover>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}

            <p className="mt-1 text-xs text-gray-500">
                Filtrez par taille (optionnel)
            </p>
        </Field>
    );
}
