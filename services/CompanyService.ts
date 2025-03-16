const api = useApi()

export default {
    getCompanies(params?: object) {
        return api.get('companies', { params });
    },
    getCompany(id: number, params?: object) {
        return api.get(`companies/${id}`, { params });
    },
    createCompany(data: object) {
        return api.post('companies', data);
    },
    updateCompany(id: number, data: object) {
        return api.post(`companies/${id}`, data);
    },
    deleteCompany(id: number) {
        return api.delete(`companies/${id}`);
    }
}