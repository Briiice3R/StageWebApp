const companyHandler = {
    getCompanyByText: async (query: string, signal?: AbortSignal) => {
        try {
            const response = await fetch(`https://recherche-entreprises.api.gouv.fr/search?q=${encodeURIComponent(query)}`, {
                signal,
            });
            
            if (!response.ok) {
                throw new Error('Erreur API');
            }
            
            const data = await response.json();
            return { data };
        } catch (error) {
            throw error;
        }
    }
};

export default companyHandler;