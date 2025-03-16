const api = useApi()

export default {
    getServices(params?: object) {
        return api.get('services', { params });
    },
    getService(id: number, params?: object) {
        return api.get(`services/${id}`, { params });
    },
    createService(data: object) {
        return api.post('services', data);
    },
    updateService(id: number, data: object) {
        return api.post(`services/${id}`, data);
    },
    deleteService(id: number) {
        return api.delete(`services/${id}`);
    }
}