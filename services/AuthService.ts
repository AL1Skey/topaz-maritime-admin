const api = useApi()

export default {
    login(credentials: object) {
        return api.post('auth/login', credentials)
    },
    logout() {
        return api.delete('auth/logout')
    },
}