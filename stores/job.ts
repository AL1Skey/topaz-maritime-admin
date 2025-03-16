import { defineStore } from 'pinia'
import JobService from '@/services/JobService'
import { Meta } from 'types'
import { Job, Data, DataSingle } from '@/types/job'

export const useJobStore = defineStore('job', () => {
    const toast = useToast()

    const jobs = ref<Job[]>([])
    const jobsMeta = ref<Meta|null>(null)
    // const JobsLinks = ref<Links|null>(null)
    const fetchJobs = async (params?: object) => {
        loadingStart()
        try {
            const data = await JobService.getJobs(params) as Data
            console.log("🚀 | fetchJobs | data:", data)
            jobs.value = data.data
            jobsMeta.value = data.meta
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const job = ref<Job|null>(null)
    const fetchJob = async (id: number, params?: object) => {
        job.value = null
        loadingStart()
        try {
            const data = await JobService.getJob(id, params) as DataSingle
            console.log("🚀 | fetchJob | data:", data)
            job.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const createJob = async (formData: object) => {
        loadingStart()
        try {
            const data = await JobService.createJob(formData)
            console.log("🚀 | createJob | data:", data)
            resetError()
            toast.success('The job was created successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | createJob | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const updateJob = async (id: number, formData: object) => {
        console.log("🚀 | updateJob | formData:", formData)
        loadingStart()
        try {
            const data = await JobService.updateJob(id, formData)
            console.log("🚀 | updateJob | data:", data)
            resetError()
            toast.success('The job was updated successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | updateJob | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const deleteJob = async (id: number) => {
        loadingStart()
        try {
            const data = await JobService.deleteJob(id)
            console.log("🚀 | constdeleteJob | data:", data)
            resetError()
            toast.success('The job was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteJob | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const isModalDeleteActive = ref(false);
    const openModalDelete = (data: any) => {
        job.value = data
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
        jobs, jobsMeta, job,
        fetchJobs, fetchJob, createJob, updateJob, deleteJob,
        isModalDeleteActive, openModalDelete,
        loading, message, errors,
    }
})
