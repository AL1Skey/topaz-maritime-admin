import { defineStore } from 'pinia'
import BannerService from '@/services/BannerService'
import { Banner, Data, DataSingle } from '@/types/banner'

export const useBannerStore = defineStore('banner', () => {
    const toast = useToast()

    const banners = ref<Banner[]>([])
    // const BannersLinks = ref<Links|null>(null)
    const fetchBanners = async (params?: object) => {
        loadingStart()
        try {
            const data = await BannerService.getBanners(params) as Data
            console.log("🚀 | fetchBanners | data:", data)
            banners.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const banner = ref<Banner|null>(null)
    const fetchBanner = async (id: number, params?: object) => {
        banner.value = null
        loadingStart()
        try {
            const data = await BannerService.getBanner(id, params) as DataSingle
            console.log("🚀 | fetchBanner | data:", data)
            banner.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const createBanner = async (formData: object) => {
        loadingStart()
        try {
            const data = await BannerService.createBanner(formData)
            console.log("🚀 | createBanner | data:", data)
            resetError()
            toast.success('The banner was created successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | createBanner | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const updateBanner = async (id: number, formData: object) => {
        console.log("🚀 | updateBanner | formData:", formData)
        loadingStart()
        try {
            const data = await BannerService.updateBanner(id, formData)
            console.log("🚀 | updateBanner | data:", data)
            resetError()
            toast.success('The banner was updated successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | updateBanner | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const deleteBanner = async (id: number) => {
        loadingStart()
        try {
            const data = await BannerService.deleteBanner(id)
            console.log("🚀 | constdeleteBanner | data:", data)
            resetError()
            toast.success('The banner was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteBanner | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const isModalDeleteActive = ref(false);
    const openModalDelete = (data: any) => {
        banner.value = data
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
        banners, banner,
        fetchBanners, fetchBanner, createBanner, updateBanner, deleteBanner,
        isModalDeleteActive, openModalDelete,
        loading, message, errors,
    }
})
