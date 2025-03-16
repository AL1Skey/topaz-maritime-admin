import { defineStore } from 'pinia'
import CompanyService from '@/services/CompanyService'
import { Meta } from 'types'
import { Company, Data, DataSingle } from 'types/company'

export const useCompanyStore = defineStore('company', () => {
    const toast = useToast()

    const companies = ref<Company[]>([])
    const companiesMeta = ref<Meta|null>(null)
    const fetchCompanies = async (params?: object) => {
        loadingStart()
        try {
            const data = await CompanyService.getCompanies(params) as Data
            console.log("🚀 | fetchCompanies | data:", data)
            companies.value = data.data
            companiesMeta.value = data.meta
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const company = ref<Company|null>(null)
    const fetchCompany = async (id: number, params?: object) => {
        company.value = null
        loadingStart()
        try {
            const data = await CompanyService.getCompany(id, params) as DataSingle
            console.log("🚀 | fetchCompany | data:", data)
            company.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const createCompany = async (formData: object) => {
        loadingStart()
        try {
            const data = await CompanyService.createCompany(formData)
            console.log("🚀 | createCompany | data:", data)
            resetError()
            toast.success('The company was created successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | createCompany | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const updateCompany = async (id: number, formData: object) => {
        console.log("🚀 | updateCompany | formData:", formData)
        loadingStart()
        try {
            const data = await CompanyService.updateCompany(id, formData)
            console.log("🚀 | updateCompany | data:", data)
            resetError()
            toast.success('The company was updated successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | updateCompany | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const deleteCompany = async (id: number) => {
        loadingStart()
        try {
            const data = await CompanyService.deleteCompany(id)
            console.log("🚀 | constdeleteCompany | data:", data)
            resetError()
            toast.success('The company was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteCompany | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const isModalDeleteActive = ref(false);
    const openModalDelete = (data: any) => {
        company.value = data
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
        companies, companiesMeta, company,
        fetchCompanies, fetchCompany, createCompany, updateCompany, deleteCompany,
        isModalDeleteActive, openModalDelete,
        loading, message, errors,
    }
})
