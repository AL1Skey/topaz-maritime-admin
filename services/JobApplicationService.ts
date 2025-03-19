const api = useApi()

export default {
    getJobApplications(params?: object) {
        return api.get('job-applications', { params });
    },
    getJobApplication(id: any, params?: object) {
        return api.get(`job-applications/${id}`, { params });
    },
    createJobApplication(data: object) {
        return api.post('job-applications', data);
    },
    updateJobApplication(id: any, data: object) {
        return api.post(`job-applications/${id}`, data);
    },
    deleteJobApplication(id: any) {
        return api.delete(`job-applications/${id}`);
    },

    getJobApplicationsByJobCategoryId(job_category_id: any, params?: object) {
        return api.get(`job-categories/${job_category_id}/job-applications`, { params });
    },

    getJobApplicationsByAllJobCategoryId(params?: object) {
        return api.get('job-applicants', { params });
    },

    getJobApplicationsCurrentMonthCount() {
        return api.get('job-applications/current-month/count');
    }
}