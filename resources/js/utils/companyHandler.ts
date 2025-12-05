const companyHandler = {
    getCompanyByText: async (query: string, signal?: AbortSignal) => {
        const response = await fetch(`http://localhost:8000/api/admin/companies?${query}`, {
            signal,
        });

        if (!response.ok) {
            throw new Error('Erreur API');
        }

        const json = await response.json();
        return {
            data: json.data || [],
            total_pages: json.total_pages
        };
    },
};

export default companyHandler;



