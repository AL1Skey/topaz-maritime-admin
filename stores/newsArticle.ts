import { defineStore } from 'pinia'
import NewsArticleService from '@/services/NewsArticleService'
import { Meta } from '@/types'
import { NewsArticle, Data, DataSingle } from '@/types/newsArticle'

export const useNewsArticleStore = defineStore('newsArticle', () => {
    const toast = useToast()

    const newsArticles = ref<NewsArticle[]>([])
    const newsArticlesMeta = ref<Meta|null>(null)
    // const NewsArticlesLinks = ref<Links|null>(null)
    const fetchNewsArticles = async (params?: object) => {
        loadingStart()
        try {
            const data = await NewsArticleService.getNewsArticles(params) as Data
            console.log("🚀 | fetchNewsArticles | data:", data)
            newsArticles.value = data.data
            newsArticlesMeta.value = data.meta
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const newsArticle = ref<NewsArticle|null>(null)
    const fetchNewsArticle = async (id: number, params?: object) => {
        newsArticle.value = null
        loadingStart()
        try {
            const data = await NewsArticleService.getNewsArticle(id, params) as DataSingle
            console.log("🚀 | fetchNewsArticle | data:", data)
            newsArticle.value = data.data
            resetError()
        } catch ({ _data }: any) {
            setError(_data)
        }
        loadingEnd()
    }

    const createNewsArticle = async (formData: object) => {
        loadingStart()
        try {
            const data = await NewsArticleService.createNewsArticle(formData)
            console.log("🚀 | createNewsArticle | data:", data)
            resetError()
            toast.success('The news article was created successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | createNewsArticle | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const updateNewsArticle = async (id: number, formData: object) => {
        console.log("🚀 | updateNewsArticle | formData:", formData)
        loadingStart()
        try {
            const data = await NewsArticleService.updateNewsArticle(id, formData)
            console.log("🚀 | updateNewsArticle | data:", data)
            resetError()
            toast.success('The news article was updated successfully!')
            return true
        } catch ({ _data }: any) {
            console.log("🚀 | updateNewsArticle | _data:", _data)
            setError(_data)
        } finally {
            loadingEnd()
        }
    }

    const deleteNewsArticle = async (id: number) => {
        loadingStart()
        try {
            const data = await NewsArticleService.deleteNewsArticle(id)
            console.log("🚀 | constdeleteNewsArticle | data:", data)
            resetError()
            toast.success('The news article was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteNewsArticle | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const deleteNewsArticlePdf = async (id: number) => {
        loadingStart()
        try {
            const data = await NewsArticleService.deleteNewsArticlePdf(id)
            console.log("🚀 | constdeleteNewsArticle | data:", data)
            newsArticle.value = data.data
            resetError()
            toast.success('The news article pdf was deleted successfully!')
        } catch ({ _data }: any) {
            console.log("🚀 | deleteNewsArticlePdf | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const isModalDeleteActive = ref(false);
    const openModalDelete = (data: any) => {
        newsArticle.value = data
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
        newsArticles, newsArticlesMeta, newsArticle,
        fetchNewsArticles, fetchNewsArticle, createNewsArticle, updateNewsArticle, deleteNewsArticle,
        isModalDeleteActive, openModalDelete,
        deleteNewsArticlePdf,
        loading, message, errors,
    }
})
