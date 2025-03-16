const api = useApi()

export default {
    getGalleries(params?: object) {
        return api.get('galleries', { params });
    },
    getGallery(id: number, params?: object) {
        return api.get(`galleries/${id}`, { params });
    },
    createGallery(data: object) {
        return api.post('galleries', data);
    },
    updateGallery(id: number, data: object) {
        return api.post(`galleries/${id}`, data);
    },
    deleteGallery(id: number) {
        return api.delete(`galleries/${id}`);
    }
}