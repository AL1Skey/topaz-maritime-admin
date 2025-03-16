import { storeToRefs } from 'pinia'
// import { useStorage } from '@vueuse/core'
import { useUserStore } from '@/stores/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('Auth Middleware | Start')
    // console.log("🚀 | from:", from)
    // console.log("🚀 | to:", to)

    const userStore = useUserStore()

    const { isAuthenticated, token } = storeToRefs(userStore)
    const { getCurrentUser } = userStore

    const localToken = localStorage['token']

    /* Set token data if found in localStorage */
    if (localToken && !token.value) {
        userStore.setToken(JSON.parse(localToken))
        console.log('Auth Middleware | setToken success')
    }

    console.log("Auth Middleware | token from userStore:", token.value)

    if (!token.value && to.name !== 'login') {
        console.log('Auth Middleware | no token, not to login page');
        console.log('Auth Middleware | redirect to login page...');
        return navigateTo({ name: 'login' })
    }

    if (token.value && !isAuthenticated.value) {
        console.log('Auth Middleware | token found, not logedin');
        console.log('Auth Middleware | use token to get current user...');
        await getCurrentUser()
    }

    if (isAuthenticated.value && to.name === 'login') {
        console.log('Auth Middleware | already logedin, to login page');
        console.log('Auth Middleware | redirect to home page...');
        return navigateTo({ name: 'index' })
    }

    console.log('Auth Middleware | End')
})