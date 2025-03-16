import { defineStore } from 'pinia'
import GalleryService from '@/services/GalleryService'
import { Meta } from 'types'
import { Gallery, Data, DataSingle } from '@/types/gallery'

export const useGalleryStore = defineStore('gallery', () => {
    const toast = useToast()

    const galleries = ref<Gallery[]>([])
    const galleriesMeta = ref<Meta|null>(null)
    // const GallerysLinks = ref<Links|null>(null)
    const fetchGallerys = async (params?: object) => {
        loadingStart()
        try {
            const data = await GalleryService.getGalleries(params) as Data
            console.log("🚀 | fetchGallerys | data:", data)
            galleries.value = data.data
            galleriesMeta.value = data.meta
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const gallery = ref<Gallery|null>(null)
    const fetchGallery = async (id: number, params?: object) => {
        gallery.value = null
        loadingStart()
        try {
            const data = await GalleryService.getGallery(id, params) as DataSingle
            console.log("🚀 | fetchGallery | data:", data)
            gallery.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const createGallery = async (formData: object) => {
        loadingStart()
        try {
            const data = await GalleryService.createGallery(formData)
            console.log("🚀 | createGallery | data:", data)
            resetError()
            toast.success('The gallery was created successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | createGallery | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const updateGallery = async (id: number, formData: object) => {
        console.log("🚀 | updateGallery | formData:", formData)
        loadingStart()
        try {
            const data = await GalleryService.updateGallery(id, formData)
            console.log("🚀 | updateGallery | data:", data)
            resetError()
            toast.success('The gallery was updated successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | updateGallery | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const deleteGallery = async (id: number) => {
        loadingStart()
        try {
            const data = await GalleryService.deleteGallery(id)
            console.log("🚀 | constdeleteGallery | data:", data)
            resetError()
            toast.success('The gallery was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteGallery | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const isModalDeleteActive = ref(false);
    const openModalDelete = (data: any) => {
        gallery.value = data
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
        galleries, galleriesMeta, gallery,
        fetchGallerys, fetchGallery, createGallery, updateGallery, deleteGallery,
        isModalDeleteActive, openModalDelete,
        loading, message, errors,
    }
})
