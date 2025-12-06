const HOST_API = "https://geo.api.gouv.fr";

const fetchApi = async (endpoint: string, param: string, signal?:AbortSignal)=>{
    const response = await fetch(`${HOST_API}/${endpoint}?${param}`, { signal });
    if(!response.ok){
        throw new Error("Erreur avec l'API GeoAPIGouv.");
    }
    const json = await response.json();

    return {
        data: json || []
    };
}

const locationHandler = {
    getRegionByName: async (query: string, signal?:AbortSignal) => {
        return await fetchApi("regions", `nom=${encodeURIComponent(query)}`, signal);
    },
    getDepartmentByText: async (query:string, signal?:AbortSignal)=>{
        const param = !(isNaN(Number(query))) ? "code" : "nom";
        return await fetchApi("departements", `${param}=${encodeURIComponent(query)}`, signal);
    },
    getCityByText: async (query:string, signal?: AbortSignal)=>{
        const param = !(isNaN(Number(query))) ? "codePostal" : "nom";
        return await fetchApi("communes", `${param}=${encodeURIComponent(query)}&limit=10`, signal);
    }
};

export default locationHandler;
