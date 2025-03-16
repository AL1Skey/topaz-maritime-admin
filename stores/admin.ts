import { defineStore } from 'pinia'
import AdminService from '@/services/AdminService'
import { Meta } from '@/types'
import { Admin, Data, DataSingle } from '@/types/admin'

export const useAdminStore = defineStore('admin', () => {
    const toast = useToast()

    const admins = ref<Admin[]>([])
    const adminsMeta = ref<Meta|null>(null)
    // const AdminsLinks = ref<Links|null>(null)
    const fetchAdmins = async (params?: object) => {
        loadingStart()
        try {
            const data = await AdminService.getAdmins(params) as Data
            console.log("🚀 | fetchAdmins | data:", data)
            admins.value = data.data
            adminsMeta.value = data.meta
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const admin = ref<Admin|null>(null)
    const fetchAdmin = async (id: number, params?: object) => {
        admin.value = null
        loadingStart()
        try {
            const data = await AdminService.getAdmin(id, params) as DataSingle
            console.log("🚀 | fetchAdmin | data:", data)
            admin.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
            throw(_data)
        }
        loadingEnd()
    }

    const createAdmin = async (formData: object) => {
        loadingStart()
        try {
            const data = await AdminService.createAdmin(formData)
            console.log("🚀 | createAdmin | data:", data)
            resetError()
            toast.success('The user was created successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | createAdmin | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const updateAdmin = async (id: number, formData: object) => {
        console.log("🚀 | updateAdmin | formData:", formData)
        loadingStart()
        try {
            const data = await AdminService.updateAdmin(id, formData)
            console.log("🚀 | updateAdmin | data:", data)
            resetError()
            toast.success('The user was updated successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | updateAdmin | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const deleteAdmin = async (id: number) => {
        loadingStart()
        try {
            const data = await AdminService.deleteAdmin(id)
            console.log("🚀 | constdeleteAdmin | data:", data)
            resetError()
            toast.success('The user was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteAdmin | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const isModalDeleteActive = ref(false);
    const openModalDelete = (data: any) => {
        admin.value = data
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
        admins, adminsMeta, admin,
        fetchAdmins, fetchAdmin, createAdmin, updateAdmin, deleteAdmin,
        isModalDeleteActive, openModalDelete,
        loading, message, errors,
    }
})
