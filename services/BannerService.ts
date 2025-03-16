const api = useApi()

export default {
    getBanners(params?: object) {
        return api.get('banners', { params });
    },
    getBanner(id: number, params?: object) {
        return api.get(`banners/${id}`, { params });
    },
    createBanner(data: object) {
        return api.post('banners', data);
    },
    updateBanner(id: number, data: object) {
        return api.post(`banners/${id}`, data);
    },
    deleteBanner(id: number) {
        return api.delete(`banners/${id}`);
    }
}