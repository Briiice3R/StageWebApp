import { useEffect, useState } from "react";
import { Company } from '@/types/model';
import locationHandler from '@/utils/locationHandler';

export function useAutoComplete<T>(
    fetchFunction: (query:string, signal?:AbortSignal)=>Promise<any>,
    minChars: number=0,
    delay: number=800
){
    const [query, setQuery] = useState<string>("");
    const [data, setData] = useState<T[]>([]);
    const [selected, setSelected] = useState<T|null>(null);
    const [apiError, setApiError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(()=>{
        if(!query.trim() || query.trim().length < minChars){
            setData([]);
            setApiError("");
            setIsLoading(false);
            return;
        }

        const abortController = new AbortController();

        const interval = setTimeout(async ()=>{
            setIsLoading(true);
            setApiError("");
            try{
                // 1. Récupérer les entreprises
                const reqApi = await fetchFunction(query, abortController.signal);

                if(reqApi.data){
                    // 2. Enrichir avec les villes si c'est un tableau de Company
                    let enrichedData = reqApi.data;

                    // Vérifier si on a des entreprises (Company[])
                    if (Array.isArray(reqApi.data) && reqApi.data.length > 0 && reqApi.data[0].siege?.code_postal) {
                        enrichedData = await Promise.all(
                            reqApi.data.map(async (company: Company) => {
                                try {
                                    const cityResponse = await locationHandler.getCityByText(
                                        company.siege.code_postal,
                                        abortController.signal
                                    );
                                    company.siege.city = cityResponse.data[0];
                                } catch (error) {
                                    if (error.name !== 'AbortError') {
                                        console.error('Erreur récupération ville siège:', error);
                                    }
                                }
                                return company;
                            })
                        );
                    }

                    setData(enrichedData);
                    if(enrichedData.length === 0) setApiError("Aucun résultat trouvé.");
                } else {
                    setApiError("Erreur lors de la recherche.");
                }
            }catch(e:any){
                if(e.name !== "AbortError"){
                    setApiError("Erreur de connexion à l'API.");
                    console.error("Erreur API : ", e);
                }
            }finally{
                setIsLoading(false);
            }
        }, delay);

        return ()=>{
            clearTimeout(interval);
            abortController.abort();
        };
    }, [delay, fetchFunction, minChars, query]);

    return {
        query,
        setQuery,
        data,
        setData,
        selected,
        setSelected,
        apiError,
        setApiError,
        isLoading,
    }
}
