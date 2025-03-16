const api = useApi()

export default {
    getJobApplications(params?: object) {
        return api.get('job-applications', { params });
    },
    getJobApplication(id: number, params?: object) {
        return api.get(`job-applications/${id}`, { params });
    },
    createJobApplication(data: object) {
        return api.post('job-applications', data);
    },
    updateJobApplication(id: number, data: object) {
        return api.post(`job-applications/${id}`, data);
    },
    deleteJobApplication(id: number) {
        return api.delete(`job-applications/${id}`);
    },

    getJobApplicationsByJobCategoryId(job_category_id: number, params?: object) {
        return api.get(`job-categories/${job_category_id}/job-applications`, { params });
    },

    getJobApplicationsCurrentMonthCount() {
        return api.get('job-applications/current-month/count');
    }
}