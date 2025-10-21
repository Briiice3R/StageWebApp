const HOST = "https://recherche-entreprises.api.gouv.fr";

const companyHandler = {
    getCompanyByText: async (text: String)=>{
        try{
            const reqApi = await fetch(`${HOST}/search?q=${text}`);
            if(!reqApi.ok){
                throw new Error(`Error ${reqApi.status}`);
            }
            const resApi = await reqApi.json();
            return {data: resApi};
        } catch(e){
            console.error(e);
            return {error: `Erreur ${e}`};
        }
    }

};

export default companyHandler;