import { $fetch } from 'ofetch';
import { useUserStore } from '@/stores/user';
import { $info } from '@/info'

export function useApi() {
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
                console.log("Unauthorized")
                // unauthorized()
                localStorage.removeItem('token')
                window.location.reload()
            }

            return Promise.reject(response)
        },
    })

    const request = (method: string, url: string, options?:object) => {
        return api(url, {
            method,
            ...options
        })
    }

    return ({
        get(url: string, options?: object) {
            return request('get', url, options)
        },
        post(url: string, body: object = {}, options?: object) {
            return request('post', url, {
            body,
            ...options
        })
        },
        delete(url: string, options?: object) {
            return request('delete', url, options)
        }
    })
}