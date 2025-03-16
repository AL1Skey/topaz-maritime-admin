<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useBannerStore } from '@/stores/banner';

useHead({ title: 'Banner Details' });

const route = useRoute()
const appStore = useAppStore()
const bannerStore = useBannerStore()

const { banner, loading, message, errors } = storeToRefs(bannerStore)
const { fetchBanner } = bannerStore

onMounted(async () => {
    appStore.loadingStart()
    await fetchBanner(route.params.id)
    appStore.loadingEnd()
});
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">
                    Banner Details: {{ banner?.name }}
                </h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <NuxtLink :to="`/banners/${route.params.id}/edit`" class="hover:text-info">
                        <icon-edit class="w-5 h-5" />
                    </NuxtLink>
                </div>
            </div>

            <div class="mb-5">
                <div class="space-y-5">
                    <div class="flex flex-col sm:flex-row">
                        <label for="id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">ID</label>
                        <p id="id">{{ banner?.id }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Title</label>
                        <p id="title">{{ banner?.title }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="description" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Description</label>
                        <p id="description">{{ banner?.description }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="image" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Image</label>
                        <div class="pt-1">
                            <img :src="banner?.image" :alt="banner?.name" class="h-24">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SectionMain>
</template>
