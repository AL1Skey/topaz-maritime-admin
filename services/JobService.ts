const api = useApi()

export default {
    getJobs(params?: object) {
        return api.get('job-vacancies', { params });
    },
    getJob(id: number, params?: object) {
        return api.get(`job-vacancies/${id}`, { params });
    },
    createJob(data: object) {
        return api.post('job-vacancies', data);
    },
    updateJob(id: number, data: object) {
        return api.post(`job-vacancies/${id}`, data);
    },
    deleteJob(id: number) {
        return api.delete(`job-vacancies/${id}`);
    }
}