const companyHandler = {
    getCompanyByText: async (query: string, signal?: AbortSignal) => {
        const response = await fetch(`http://localhost:8000/api/admin/companies?q=${encodeURIComponent(query)}`, {
            signal,
        });

        if (!response.ok) {
            throw new Error('Erreur API');
        }

        const json = await response.json();

        return { data: json.data || [] };
    },
};

export default companyHandler;
