const teacherHandler = {
    getTeacherByText: async (query: string, signal?: AbortSignal) => {
        const reqApi = await fetch(`http://localhost:8000/api/admin/teachers/search?q=${encodeURIComponent(query)}`, {
            signal,
        });
        if (!reqApi.ok) {
            throw new Error('Erreur API');
        }

        const json = await reqApi.json();

        return { data: json.data || [] };
    },
};

export default teacherHandler;
