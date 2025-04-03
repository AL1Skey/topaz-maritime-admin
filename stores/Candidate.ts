import { defineStore } from 'pinia'
import JobApplicationService from '@/services/CandidateService'
import { Meta } from '@/types'
import { JobApplication, Data, DataSingle } from '@/types/jobApplication'

export const useJobApplicationStore = defineStore('jobApplication', () => {
    const toast = useToast()

    const jobApplications = ref<JobApplication[]>([])
    const jobApplicationsMeta = ref<Meta|null>(null)
    // const JobApplicationsLinks = ref<Links|null>(null)
    const fetchJobApplications = async (params?: object) => {
        loadingStart()
        try {
            const data = await JobApplicationService.getJobApplications(params) as Data
            console.log("🚀 | fetchJobApplications | data:", data)
            jobApplications.value = data.data
            jobApplicationsMeta.value = data.meta
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const jobApplication = ref<JobApplication|null>(null)
    const fetchJobApplication = async (id: number, params?: object) => {
        jobApplication.value = null
        loadingStart()
        try {
            const data = await JobApplicationService.getJobApplication(id, params) as DataSingle
            console.log("🚀 | fetchJobApplication | data:", data)
            jobApplication.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    

    const createJobApplication = async (formData: object) => {
        loadingStart()
        try {
            const data = await JobApplicationService.createJobApplication(formData)
            console.log("🚀 | createJobApplication | data:", data)
            resetError()
            toast.success('The job application was created successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | createJobApplication | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const updateJobApplication = async (id: number, formData: object) => {
        console.log("🚀 | updateJobApplication | formData:", formData)
        loadingStart()
        try {
            const data = await JobApplicationService.updateJobApplication(id, formData)
            console.log("🚀 | updateJobApplication | data:", data)
            resetError()
            toast.success('The job application was updated successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | updateJobApplication | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const deleteJobApplication = async (id: number) => {
        loadingStart()
        try {
            const data = await JobApplicationService.deleteJobApplication(id)
            console.log("🚀 | constdeleteJobApplication | data:", data)
            resetError()
            toast.success('The job application was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteJobApplication | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const fetchJobApplicationsByJobCategoryId = async (job_category_id: number, params?: object) => {
        loadingStart()
        try {
            const data = await JobApplicationService.getJobApplicationsByJobCategoryId(job_category_id, params) as Data
            console.log("🚀 | fetchJobApplications | data:", data)
            jobApplications.value = data.data
            jobApplicationsMeta.value = data.meta
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const fetchCandidateByJobCategory = async (job_category?: string, params?: object) => {
        loadingStart()
        try {
            const data = await JobApplicationService.getCandidatesByJobCategory(job_category, params) as any
            console.log("🚀 | CandidatesCategory | data:", data)
            jobApplications.value = data.data.data
            jobApplicationsMeta.value = {
                current_page: data.data.current_page,
                from: data.data.from,
                last_page: data.data.last_page,
                per_page: data.data.per_page,
                to: data.data.to,
                total: data.data.total,
                links: data.data.links
            } as Meta
            // console.log("🚀 | fetchJobApplications | data:", jobApplications)
            resetError()
        } catch ({ _data }: any) {
            console.log("🚀 | CandidatesCategory | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }
    const fetchCandidate = async (params?: object) => {
        loadingStart()
        try {
            const data = await JobApplicationService.getCandidates(params) as any
            jobApplications.value = data.data.data
            console.log("🚀 | Candidates | data:", data.data)
            console.log("🚀 | Candidates | data:", data.data.meta)
            
            jobApplicationsMeta.value = {
                current_page: data.data.current_page,
                from: data.data.from,
                last_page: data.data.last_page,
                per_page: data.data.per_page,
                to: data.data.to,
                total: data.data.total,
                links: data.data.links
            } as Meta
            resetError()
        } catch ({ _data }: any) {
            console.log("🚀 | Candidates | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const fetchCandidateDetail = async (id: string, params?: object) => {
        jobApplication.value = null
        loadingStart()
        try {
            const data = await JobApplicationService.getCandidatesDetail(id, params) as any
            console.log("🚀 | fetchJobApplication | data:", data)
            
            jobApplication.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const approveCandidate = async (id: any) => {
        loadingStart()
        try {
            const data = await JobApplicationService.ApproveCandidates(id);
            console.log("🚀 | constapproveCandidate | data:", data)
            resetError()
            toast.success('The candidate application was approved successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | approveCandidate | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const rejectCandidate = async (id:any)=>{
        loadingStart()
        try {
            const data = await JobApplicationService.RejectCandidates(id);
            console.log("🚀 | constrejectCandidate | data:", data)
            resetError()
            toast.success('The candidate application was rejected successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | rejectCandidate | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const deleteCandidate = async (id: any) => {
        loadingStart()
        try {
            const data = await JobApplicationService.DeleteCandidates(id);
            console.log("🚀 | constdeleteJobApplication | data:", data)
            resetError()
            toast.success('The candidate application was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteJobApplication | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    

    const fetchJobApplicationsByAllJobCategoryId = async (params?: object) => {
        loadingStart()
        try {
            const data = await JobApplicationService.getJobApplicationsByAllJobCategoryId(params) as Data
            jobApplications.value = data.data
            console.log("🚀 | fetchJobApplications | data:", data)
            console.log("🚀 | fetchJobApplications | data:", data.meta)
            
            jobApplicationsMeta.value = data.meta
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const jobApplicationsCount = ref(0)
    const getJobApplicationsCurrentMonthCount = async () => {
        loadingStart()
        try {
            const { data } = await JobApplicationService.getJobApplicationsCurrentMonthCount()
            console.log("🚀 | getJobApplicationsCurrentMonthCount | data:", data)
            jobApplicationsCount.value = data
            resetError()
        } catch ({ _data }: any) {
            console.log("🚀 | getJobApplicationsCurrentMonthCount | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const isModalDeleteActive = ref(false);
    const openModalDelete = (data: any) => {
        jobApplication.value = data
        isModalDeleteActive.value = true
    }

    const loading = ref(false)
    function loadingStart() {
        loading.value = true
    }
    function loadingEnd() {
        loading.value = false
    }

    const message = ref<string>('')
    const errors = ref<object>({})
    function setError(data: { message: string, errors: object }) {
        message.value = data.message
        errors.value = data.errors
    }
    function resetError() {
        message.value = ''
        errors.value = {}
    }

    return {
        jobApplications, jobApplicationsMeta, jobApplication,fetchJobApplicationsByAllJobCategoryId,
        fetchJobApplications, fetchJobApplication, createJobApplication, updateJobApplication, deleteJobApplication,fetchCandidate,fetchCandidateByJobCategory,fetchCandidateDetail,approveCandidate,deleteCandidate,rejectCandidate,
        fetchJobApplicationsByJobCategoryId,
        jobApplicationsCount, getJobApplicationsCurrentMonthCount,
        isModalDeleteActive, openModalDelete,
        loading, message, errors,
    }
})
