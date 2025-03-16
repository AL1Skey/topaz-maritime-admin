import { defineStore } from 'pinia'
import ServiceService from '@/services/ServiceService'
import { Service, Data, DataSingle } from '@/types/service'

export const useServiceStore = defineStore('service', () => {
    const toast = useToast()

    const services = ref<Service[]>([])
    const fetchServices = async (params?: object) => {
        loadingStart()
        try {
            const data = await ServiceService.getServices(params) as Data
            console.log("🚀 | fetchServices | data:", data)
            services.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const service = ref<Service|null>(null)
    const fetchService = async (id: number, params?: object) => {
        service.value = null
        loadingStart()
        try {
            const data = await ServiceService.getService(id, params) as DataSingle
            console.log("🚀 | fetchService | data:", data)
            service.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const createService = async (formData: object) => {
        loadingStart()
        try {
            const data = await ServiceService.createService(formData)
            console.log("🚀 | createService | data:", data)
            resetError()
            toast.success('The service was created successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | createService | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const updateService = async (id: number, formData: object) => {
        console.log("🚀 | updateService | formData:", formData)
        loadingStart()
        try {
            const data = await ServiceService.updateService(id, formData)
            console.log("🚀 | updateService | data:", data)
            resetError()
            toast.success('The service was updated successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | updateService | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const deleteService = async (id: number) => {
        loadingStart()
        try {
            const data = await ServiceService.deleteService(id)
            console.log("🚀 | constdeleteService | data:", data)
            resetError()
            toast.success('The service was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteService | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const isModalDeleteActive = ref(false);
    const openModalDelete = (data: any) => {
        service.value = data
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
        services, service,
        fetchServices, fetchService, createService, updateService, deleteService,
        isModalDeleteActive, openModalDelete,
        loading, message, errors,
    }
})
