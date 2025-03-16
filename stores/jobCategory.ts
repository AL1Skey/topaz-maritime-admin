import { defineStore } from 'pinia'
import JobCategoryService from '@/services/JobCategoryService'
import { Meta } from 'types'
import { JobCategory, Data, DataSingle } from '@/types/jobCategory'

export const useJobCategoryStore = defineStore('jobCategory', () => {
    const toast = useToast()

    const jobCategories = ref<JobCategory[]>([])
    // const jobCategoriesMeta = ref<Meta|null>(null)
    // const JobCategorysLinks = ref<Links|null>(null)
    const fetchJobCategories = async (params?: object) => {
        loadingStart()
        try {
            const data = await JobCategoryService.getJobCategories(params) as Data
            console.log("🚀 | fetchJobCategories | data:", data)
            jobCategories.value = data.data
            // jobCategoriesMeta.value = data.meta
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const jobCategory = ref<JobCategory|null>(null)
    const fetchJobCategory = async (id: number, params?: object) => {
        jobCategory.value = null
        loadingStart()
        try {
            const data = await JobCategoryService.getJobCategory(id, params) as DataSingle
            console.log("🚀 | fetchJobCategory | data:", data)
            jobCategory.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const createJobCategory = async (formData: object) => {
        loadingStart()
        try {
            const data = await JobCategoryService.createJobCategory(formData)
            console.log("🚀 | createJobCategory | data:", data)
            resetError()
            toast.success('The job category was created successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | createJobCategory | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const updateJobCategory = async (id: number, formData: object) => {
        console.log("🚀 | updateJobCategory | formData:", formData)
        loadingStart()
        try {
            const data = await JobCategoryService.updateJobCategory(id, formData)
            console.log("🚀 | updateJobCategory | data:", data)
            resetError()
            toast.success('The job category was updated successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | updateJobCategory | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const deleteJobCategory = async (id: number) => {
        loadingStart()
        try {
            const data = await JobCategoryService.deleteJobCategory(id)
            console.log("🚀 | constdeleteJobCategory | data:", data)
            resetError()
            toast.success('The job category was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteJobCategory | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const isModalDeleteActive = ref(false);
    const openModalDelete = (data: any) => {
        jobCategory.value = data
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
        jobCategories, /** jobCategoriesMeta,*/ jobCategory,
        fetchJobCategories, fetchJobCategory, createJobCategory, updateJobCategory, deleteJobCategory,
        isModalDeleteActive, openModalDelete,
        loading, message, errors,
    }
})
