import { defineStore } from 'pinia'
import JobApplicationService from '@/services/JobApplicationService'
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

    const jobApplicationsCount = ref(0)
    const getJobApplicationsCurrentMonthCount = async () => {
        loadingStart()
        try {
            const { data } = await JobApplicationService.getJobApplicationsCurrentMonthCount()
            console.log("🚀 | getJobApplicationsCurrentMonthCount | data:", data)
            jobApplicationsCount.value = data
            resetError()
        } catch ({ _data }: any) {
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
        jobApplications, jobApplicationsMeta, jobApplication,
        fetchJobApplications, fetchJobApplication, createJobApplication, updateJobApplication, deleteJobApplication,
        fetchJobApplicationsByJobCategoryId,
        jobApplicationsCount, getJobApplicationsCurrentMonthCount,
        isModalDeleteActive, openModalDelete,
        loading, message, errors,
    }
})
