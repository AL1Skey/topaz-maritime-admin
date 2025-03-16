<script lang="ts" setup>
import appSetting from '@/app-setting';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useUserStore } from '@/stores/user';

useHead({ title: 'Login' });

const router = useRouter();
const userStore = useUserStore()

const { isAuthenticated, loading, message } = storeToRefs(userStore)
const { login } = userStore

definePageMeta({
    layout: 'auth-layout',
});

const credentials = reactive({
    email: '',
    password: ''
})

const submit = async () => {
    await login(credentials)
    if (isAuthenticated.value) {
        // if (route.query.redirect) {
        //     router.push({ path: route.query.redirect })
        // } else {
        //     router.push({ name: 'dashboard' })
        // }
        router.push('/')
    } else {
        isAlertActive.value = true
    }
}

const isAlertActive = ref(false)
const dismiss = () => {
    isAlertActive.value = false
}

</script>

<template>
    <div>
        <div class="absolute inset-0">
            <img src="/assets/images/auth/bg-gradient.png" alt="image" class="h-full w-full object-cover" />
        </div>

        <!-- <div
            class="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        > -->
        <div
            class="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/bg-login.jpg)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16"
        >
            <img src="/assets/images/auth/coming-soon-object1.png" alt="image" class="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
            <img src="/assets/images/auth/coming-soon-object2.png" alt="image" class="absolute left-24 top-0 h-40 md:left-[30%]" />
            <img src="/assets/images/auth/coming-soon-object3.png" alt="image" class="absolute right-0 top-0 h-[300px]" />
            <img src="/assets/images/auth/polygon-object.svg" alt="image" class="absolute bottom-0 end-[28%]" />
            <div
                class="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]"
            >
                <div class="relative flex flex-col justify-center rounded-md bg-white/60 px-6 py-20 backdrop-blur-lg dark:bg-black/50">

                    <div class="mx-auto w-full max-w-[440px]">
                        <div class="mb-10">
                            <h1 class="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Login</h1>
                            <!-- <p class="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p> -->
                        </div>

                        <div v-if="isAlertActive" class="flex items-center rounded bg-danger-light p-3.5 text-danger dark:bg-danger-dark-light mb-5">
                            <span class="ltr:pr-2 rtl:pl-2">{{ message }}</span
                            >
                            <button type="button" class="hover:opacity-80 ltr:ml-auto rtl:mr-auto" @click="dismiss">
                                <icon-x class="w-5 h-5" />
                            </button>
                        </div>

                        <form class="space-y-5 dark:text-white" @submit.prevent="submit">
                            <div>
                                <label for="Email">Email</label>
                                <div class="relative text-white-dark">
                                    <input v-model="credentials.email" id="Email" type="email" placeholder="Enter Email" class="form-input ps-10 placeholder:text-white-dark" />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-mail :fill="true" />
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label for="Password">Password</label>
                                <div class="relative text-white-dark">
                                    <input v-model="credentials.password" id="Password" type="password" placeholder="Enter Password" class="form-input ps-10 placeholder:text-white-dark" />
                                    <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                        <icon-lock-dots :fill="true" />
                                    </span>
                                </div>
                            </div>

                            <button :disabled="loading" type="submit" class="btn btn-primary !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                Login
                                <span v-if="loading" class="animate-spin border-2 border-white border-l-transparent rounded-full w-4 h-4 ltr:ml-4 rtl:mr-4 inline-block align-middle"></span>
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
