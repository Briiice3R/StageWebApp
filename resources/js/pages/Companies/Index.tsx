import LocationSearchBar from '@/components/LocationSearchBar';
import NafActivityFilter from '@/components/NafActivityFilter';
import { City, Department, NafSection, Region } from '@/types';
import { Company } from '@/types/model';
import companyHandler from '@/utils/companyHandler';
import locationHandler from '@/utils/locationHandler';
import { Field, Label } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import CompanyCard from '@/components/CompanyCard';



// ============================================
// TYPES
// ============================================

type LocationItem = { type: 'city'; data: City } | { type: 'department'; data: Department } | { type: 'region'; data: Region };

export default function CompaniesPage() {
    // État pour la recherche principale d'entreprise
    const [searchQuery, setSearchQuery] = useState<string>('');

    // État pour le filtre de localisation (optionnel)
    const [locationFilter, setLocationFilter] = useState<LocationItem | null>(null);

    // État pour les filtres NAF (optionnel - multiple)
    const [nafFilters, setNafFilters] = useState<NafSection[]>([]);

    // États pour les résultats
    const [companies, setCompanies] = useState<Company[]>([]);
    const [isLoadingCompanies, setIsLoadingCompanies] = useState<boolean>(false);
    const [companiesError, setCompaniesError] = useState<string>('');

    // États pour la pagination
    //const [currentPage, setCurrentPage] = useState<number>(1);
    const currentPageRef = useRef(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const fetchCompanies = useCallback(async (pageNumber: number=1, append:boolean=false, signal?:AbortController) => {
        // Ne rien faire si pas de recherche
        if (!searchQuery.trim() && locationFilter === null && nafFilters.length === 0) {
            setCompanies([]);
            setCompaniesError('');
            return;
        }
        if (searchQuery.trim() && searchQuery.trim().length < 3) {
            setCompanies([]);
            setCompaniesError('');
            return;
        }

        if(append){
            setIsLoadingMore(true)
        } else{
            setIsLoadingCompanies(true);
        }
        setCompaniesError('');

        try {
            const params = await buildSearchUrl(pageNumber);
            const response = await companyHandler.getCompanyByText(params, signal.signal);

            // Transformer les établissements en Company
            const etablissementsAsCompanies: Company[] = response.data.flatMap((company) => {
                if (!company.matching_etablissements || company.matching_etablissements.length === 0) {
                    return [];
                }

                return company.matching_etablissements
                    .filter((etab) => etab.siret !== company.siege.siret) // ✅ Exclure le siège
                    .map((etab) => ({
                        nom_complet: `${company.nom_complet} - Établissement`,
                        nom_raison_sociale: company.nom_raison_sociale,
                        siege: {
                            commune: etab.commune,
                            adresse: etab.adresse,
                            code_postal: etab.code_postal,
                            siret: etab.siret,
                            isEtablissement: true,
                            city: undefined,
                        },
                        matching_etablissements: [] as any,
                    }));
            });

            // Combiner les companies avec leurs établissements transformés
            const allCompaniesBeforeFilter = [...response.data, ...etablissementsAsCompanies];

            // Enrichir avec les données de ville
            const allCompaniesEnriched = await Promise.all(
                allCompaniesBeforeFilter.map(async (company: Company) => {
                    try {
                        const cityResponse = await locationHandler.getCityByText(company.siege.code_postal, signal.signal);
                        company.siege.city = cityResponse.data[0];
                    } catch (error) {
                        console.error('Erreur récupération ville siège:', error);
                    }
                    return company;
                }),
            );

            // Filtrer selon le filtre de localisation
            const filteredCompanies = allCompaniesEnriched.filter((company) => {
                if (!locationFilter) return true; // Pas de filtre → tout passer

                switch (locationFilter.type) {
                    case 'city':
                        return locationFilter.data.codesPostaux.includes(company.siege.code_postal);
                    case 'department':
                        return company.siege.code_postal?.startsWith(locationFilter.data.code);
                    case 'region':
                        return company.siege.city?.codeRegion === locationFilter.data.code;
                    default:
                        return true;
                }
            });

            // Supprimer les doublons
            const uniqueCompaniesMap = new Map(filteredCompanies.map((company) => [company.siege.siret, company]));
            const uniqueCompanies = Array.from(uniqueCompaniesMap.values());

            if(append){
                setCompanies(prev=>[...prev, ...uniqueCompanies]);
            } else{
                setCompanies(uniqueCompanies);

            }

            setHasMore(response.total_pages > currentPageRef.current);
            if (uniqueCompanies.length === 0) {
                setCompaniesError('Aucune entreprise trouvée.');
            }
        } catch (e: any) {
            if (e.name !== 'AbortError') {
                setCompaniesError("Erreur de connexion à l'API.");
                console.error('Erreur API:', e);
            }
        } finally {
            setIsLoadingCompanies(false);
            setIsLoadingMore(false);
        }
    },  [searchQuery, locationFilter, nafFilters]);

    // Fonction pour construire l'URL de recherche
    const buildSearchUrl = useCallback(async (pageNumber: number=1) => {
        const params = new URLSearchParams();

        // La recherche par nom est le paramètre principal
        if (searchQuery.trim()) {
            params.append('q', searchQuery);
        }
        params.append("page", pageNumber.toString());

        // Ajouter le filtre de localisation si présent
        if (locationFilter) {
            switch (locationFilter.type) {
                case 'city':
                    params.append('code_postal', locationFilter.data.codesPostaux.join(','));
                    console.log(params);
                    break;
                case 'department':
                    params.append('departement', locationFilter.data.code);
                    break;
                case 'region':
                    params.append('region', locationFilter.data.code);
                    break;
            }
        }

        // Ajouter les filtres NAF si présents (plusieurs possibles)
        if (nafFilters.length > 0) {
            // @ts-ignore
            const nafSectionLetter = nafFilters.map((section: NafSection) => {
                return section.id;
            });
            params.append('section_activite_principale', nafSectionLetter.join(','));
        }

        console.log('param:', params.toString());
        return params.toString();
    }, [searchQuery, locationFilter, nafFilters]);

    // Recherche des entreprises en temps réel
    useEffect(() => {
        const abortController = new AbortController();

        currentPageRef.current = 1;
        setHasMore(true);

        // Délai avant de lancer la recherche (debounce)
        const timeout = setTimeout(async() => await fetchCompanies(1, false, abortController), 400);

        return () => {
            clearTimeout(timeout);
            abortController.abort();
        };
    }, [searchQuery, locationFilter, nafFilters]); // Se déclenche quand la recherche ou les filtres changent

    // 👇 DEUXIÈME useEffect : Scroll infini
    useEffect(() => {
        const handleScroll = async() => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const isNearBottom = scrollTop + windowHeight >= docHeight - 300;

            if (isNearBottom && hasMore && !isLoadingMore) {
                currentPageRef.current+=1;

                // ✅ APPEL ICI
                const abortController = new AbortController();
                await fetchCompanies(currentPageRef.current, true, abortController);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, isLoadingMore, fetchCompanies]);

    // Handler pour réinitialiser la recherche et les filtres
    const handleReset = () => {
        setSearchQuery('');
        setLocationFilter(null);
        setNafFilters([]);
        setCompanies([]);
        setCompaniesError('');
    };

    return (
        <>
            <Head title="Recherche d'entreprises" />
            <main className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Recherche d'entreprises</h1>
                        <p className="mt-2 text-sm text-gray-600">Trouvez des entreprises par nom, localisation ou secteur d'activité</p>
                    </div>

                    {/* Section de recherche et filtres sur la même ligne */}
                    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* Recherche d'entreprise */}
                            <Field className="w-full">
                                <Label className="mb-2 block text-sm font-medium text-gray-700">
                                    Nom de l'entreprise ou SIRET <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 bg-white py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Nom d'entreprise ou SIRET..."
                                    />
                                </div>
                                <p className="mt-1 text-xs text-gray-500">Min. 3 caractères</p>
                            </Field>

                            {/* Filtre de localisation */}
                            <LocationSearchBar onLocationSelect={setLocationFilter} />

                            {/* Filtre NAF */}
                            <NafActivityFilter onSectionsChange={setNafFilters} />
                        </div>
                    </div>

                    {/* Section des résultats */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Résultats {companies.length > 0 && `(${companies.length})`}</h2>
                            {isLoadingCompanies && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg
                                        className="h-4 w-4 animate-spin text-blue-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Recherche en cours...
                                </div>
                            )}
                        </div>

                        {/* Message si aucune recherche */}
                        {searchQuery.trim().length < 3 && nafFilters.length == 0 && !locationFilter && (
                            <div className="py-16 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">Commencez votre recherche</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Entrez le nom d'une entreprise ou un numéro SIRET dans le champ de recherche
                                </p>
                            </div>
                        )}

                        {/* Message d'erreur */}
                        {companiesError && searchQuery.trim() && (
                            <div className="py-16 text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-600">{companiesError}</p>
                                {(locationFilter || nafFilters.length > 0) && (
                                    <div className="mt-4">
                                        <button
                                            onClick={() => {
                                                setLocationFilter(null);
                                                setNafFilters([]);
                                            }}
                                            className="text-sm text-blue-600 underline hover:text-blue-800"
                                        >
                                            Essayez de retirer tous les filtres
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Liste des entreprises */}
                        {!isLoadingCompanies && companies.length > 0 && (
                            <div className="space-y-6">
                                {companies.map((company: Company) => (
                                    <CompanyCard company={company} key={company.siege.siret}/>
                                ))}

                                {isLoadingMore && (
                                    <div className="flex justify-center py-8">
                                        <svg className="h-8 w-8 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="ml-2 text-gray-600">Chargement de plus de résultats...</span>
                                    </div>
                                )}


                                {!hasMore && !isLoadingMore && (
                                    <p className="py-8 text-center text-sm text-gray-500">
                                        ✓ Tous les résultats ont été chargés
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
