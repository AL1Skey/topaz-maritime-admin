import { defineStore } from 'pinia'
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'

export const useUserStore = defineStore('user', () => {
    interface Result {
        data: Data;
    }
    interface ResultUser {
        data: User;
    }

    interface Data {
        token: string;
        user:  User;
    }

    interface User {
        id:         number;
        name:       string;
        email:      string;
        photo:      string;
        role:       Role;
        created_at: Date;
        updated_at: Date;
    }

    interface Role {
        id:   number;
        name: string;
        slug: string;
    }

    const user = ref<User|null>(null)
    const isAuthenticated = computed<Boolean>(() => !!user.value)
    const isSuperadmin = computed(() =>
        user.value?.role.id === 1 ||
        user.value?.role.slug === 'superadmin'
    )

    const setUser = (data: User) => {
        user.value = data
        // localStorage.setItem('user', JSON.stringify(userData))
    }

    const token = ref<string|null>(null)

    const setToken = (tokenData: string) => {
        token.value = tokenData
        localStorage.setItem('token', JSON.stringify(tokenData))
    }

    interface Credentials {
        email: string;
        password: string;
    }
    const login = async (credentials: Credentials) => {
        loadingStart()
        // resetError()
        try {
            const result = await AuthService.login(credentials) as Result
            console.log("🚀 | login | result:", result)
            setUser(result.data.user)
            setToken(result.data.token)
            resetError()
        } catch ({ _data }: any) {
            console.log("🚀 | login | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const logout = async () => {
        loadingStart()
        // resetError()
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            location.reload()
        } catch ({ _data }: any) {
            console.log("🚀 | logout | _data:", _data)
            setError(_data)
        }
        loadingEnd()
    }

    const getCurrentUser = async () => {
        try {
            const result = await UserService.getCurrentUser() as ResultUser
            console.log("🚀 | getCurrentUser | result:", result)
            setUser(result.data)
        } catch ({ _data }: any) {
            console.log("🚀 | getCurrentUser | _data:", _data)
        }
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
        user, isAuthenticated, isSuperadmin,
        token,
        // authToken,
        setUser, setToken,
        getCurrentUser,
        login, logout,
        loading,
        message, errors
    }
})