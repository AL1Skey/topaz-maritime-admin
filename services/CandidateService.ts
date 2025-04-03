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
    getCandidates(params?:object){
        return api.get('candidates', {params});
    },
    getCandidatesByJobCategory(job_category: any, params?: object) {
        return api.get(`candidates?rank_to_apply=${job_category}`, { params });
    },
    getCandidatesDetail(candidate_id:any,params?:object){
        return api.get(`candidates/show/${candidate_id}`, {params});
    },
    RejectCandidates(candidate_id:any,params?:object){
        return api.post(`candidates/reject/${candidate_id}`, {params});
    },
    ApproveCandidates(candidate_id:any,params?:object){
        return api.post(`candidates/accept/${candidate_id}`, {params});
    },
    DeleteCandidates(candidate_id:any,params?:object){
        return api.delete(`candidates/delete/${candidate_id}`, {params});
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