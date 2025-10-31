const studentHandler = {
    getStudentByText: async (query:string, signal?: AbortSignal)=>{
        try{
            const reqApi = await fetch(`http://localhost:8000/api/admin/students/search?q=${encodeURIComponent(query)}`, {
                signal,
            });
            if(!reqApi.ok){
                throw new Error("Erreur API");
            }
            
            const data = await reqApi.json();
            
            
            
            return {data};
        } catch(e){
            throw e;
        }
    }

};

export default studentHandler;