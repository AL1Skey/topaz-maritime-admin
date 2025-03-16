// const api = useApi
import { $Fetch, FetchOptions } from 'ofetch';

const api = useApi()

export default {
    getCurrentUser() {
        return api.get('users/current')
    },


    // getUsers(params?: object) {
    //     return API.get('users', params)
    // },
    // getUser(id: number, params?: object) {
    //     return API.get(`users/${id}`, params)
    // },
    // createUser(data: object) {
    //     return API.post('users', data)
    // },
    // updateUser(id: number, data: object) {
    //     return API.post(`users/${id}`, data)
    // },
    // deleteUser(id: number) {
    //     return API.delete(`users/${id}`)
    // },

}