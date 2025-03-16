<script setup>
import { useAppStore } from '@/stores/index';

const props = defineProps({
    error: Object
})

const store = useAppStore();

console.log(store.theme);

const title = props.error?.statusCode === 404
    ? 'Not Found'
    : 'Something went wrong'

useHead({ title });

const handleError = () => {
    clearError({
        redirect: '/',
    });
};
</script>

<template>
    <div class="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div
            class="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:aspect-square before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:opacity-10 md:py-20"
        >
            <div class="relative">
                <img
                    v-if="error.statusCode === 404"
                    :src="store.theme === 'dark' || store.isDarkMode
                        ? '/assets/images/error/404-dark.svg'
                        : '/assets/images/error/404-light.svg'"
                    alt="404"
                    class="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"
                />
                <p v-if="error.statusCode === 404" class="mt-5 text-base dark:text-white">The page you requested was not found!</p>
                <p v-else class="mt-5 text-base dark:text-white">Something went wrong!</p>
                <button @click="handleError" class="btn btn-primary mx-auto !mt-7 w-max border-0 uppercase shadow-none">Go back to dashboard</button>
            </div>
        </div>
    </div>
</template>
