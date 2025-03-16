import { $fetch, FetchOptions } from 'ofetch';
import { $info } from '@/info'
import { useUserStore } from '@/stores/user';

const api = $fetch.create({
    // baseURL: $info.baseApiUrl,
    baseURL: 'http://localhost:8000',

    onRequest({ request, options, response }) {
        const userStore = useUserStore()
        options.headers = {
            Accept: 'application/json',
            Authorization: userStore.token
                ? `Bearer ${userStore.token}`
                : '',
        }
    },
    onResponseError({ request, options, response }) {
        // console.log("🚀 | onResponseError | request:", request)
        // console.log("🚀 | onResponseError | options:", options)
        // console.log("🚀 | onResponseError | response:", response)
        const userStore = useUserStore()
        if (response.status === 401 && userStore.token) {
            localStorage.removeItem('token')
            window.location.reload()
        }
        return Promise.reject(response)
    },
})

// export const useApi = () => ({
export default () => ({
    get: (
        url: RequestInfo,
        options?: FetchOptions<"json">
    ) => api(url, {
        method: 'get',
        ...options
    }),
    post: (
        url: RequestInfo,
        body?: BodyInit | Record<string, any> | null | undefined,
        options?: FetchOptions<"json">,
    ) => api(url, {
        method: 'post',
        body,
        ...options
    }),
    delete: (
        url: RequestInfo,
        options?: FetchOptions<"json">,
    ) => api(url, {
        method: 'delete',
        ...options
    }),

    // get(
    //     url: RequestInfo,
    //     options?: FetchOptions<"json">,
    // ) {
    //     return api(url, {
    //         method: 'get',
    //         ...options
    //     })
    // },
    // post(
    //     url: RequestInfo,
    //     body?: BodyInit | Record<string, any> | null | undefined,
    //     options?: FetchOptions<"json">,
    // ) {
    //     return api(url, {
    //         method: 'post',
    //         body,
    //         ...options
    //     })
    // },
    // delete(
    //     url: RequestInfo,
    //     options?: FetchOptions<"json">,
    // ) {
    //     return api(url, {
    //         method: 'delete',
    //         ...options
    //     })
    // },
})
