<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useAdminStore } from '@/stores/admin';

definePageMeta({
    middleware: ['superadmin']
})

// definePageMeta({
//     middleware: async (to) => {
//         const appStore = useAppStore();
//         const adminStore = useAdminStore()

//         try {
//             appStore.loadingStart()
//             await adminStore.fetchAdmin(to.params.id)
//         } catch (error) {
//             console.log("🚀 | error:", error)
//             // return abortNavigation(error)
//             throw createError({
//                 statusCode: 404,
//                 statusMessage: error.message
//             })
//         } finally {
//             appStore.loadingEnd()
//         }
//     }
//     // middleware: [
//     //     'loading-start',
//     //     async (to) => {
//     //         const { fetchAdmin } = useAdminStore()
//     //         // await fetchAdmin(to.params.id)
//     //         // const data = await fetchAdmin(to.params.id)
//     //         // console.log("🚀 | data:", data)
//     //         try {
//     //             await fetchAdmin(to.params.id)
//     //         } catch (error) {
//     //             console.log("🚀 | error:", error)
//     //             // return abortNavigation(error)
//     //             throw createError({
//     //                 statusCode: 404,
//     //                 statusMessage: error.message
//     //             })
//     //         }
//     //     },
//     //     'loading-end',
//     // ]
// })

useHead({ title: 'Admin Details' });

const route = useRoute()
const appStore = useAppStore();
const adminStore = useAdminStore()

const { admin, loading, message, errors } = storeToRefs(adminStore)
const { fetchAdmin } = adminStore

onMounted(async () => {
    appStore.loadingStart()
    await fetchAdmin(route.params.id)
    appStore.loadingEnd()
});
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">
                    Admin Details: {{ admin?.name }}
                </h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <NuxtLink :to="`/admins/${route.params.id}/edit`" class="hover:text-info">
                        <icon-edit class="w-5 h-5" />
                    </NuxtLink>
                </div>
            </div>

            <div class="mb-5">
                <div class="space-y-5">
                    <div class="flex flex-col sm:flex-row">
                        <label for="id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">ID</label>
                        <p id="id">{{ admin?.id }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="name" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Name</label>
                        <p id="name">{{ admin?.name }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="email" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Email</label>
                        <p id="email">{{ admin?.email }}</p>
                    </div>
                </div>
            </div>
        </div>
    </SectionMain>
</template>
