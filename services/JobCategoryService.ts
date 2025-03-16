const api = useApi()

export default {
    getJobCategories(params?: object) {
        return api.get('job-categories', { params });
    },
    getJobCategory(id: number, params?: object) {
        return api.get(`job-categories/${id}`, { params });
    },
    createJobCategory(data: object) {
        return api.post('job-categories', data);
    },
    updateJobCategory(id: number, data: object) {
        return api.post(`job-categories/${id}`, data);
    },
    deleteJobCategory(id: number) {
        return api.delete(`job-categories/${id}`);
    }
}