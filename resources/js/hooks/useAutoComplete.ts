import { useEffect, useState } from "react";

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
                const reqApi = await fetchFunction(query, abortController.signal);
                if(reqApi.data){
                    setData(reqApi.data);
                    if(reqApi.data.length === 0) setApiError("Aucun résultat trouvé.");
                } else setApiError("Erreur lors de la recherche.");
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
