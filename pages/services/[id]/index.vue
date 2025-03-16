<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useServiceStore } from '@/stores/service';

useHead({ title: 'Service Details' });

const route = useRoute()
const appStore = useAppStore()
const serviceStore = useServiceStore()

const { service, loading, message, errors } = storeToRefs(serviceStore)
const { fetchService } = serviceStore

onMounted(async () => {
    appStore.loadingStart()
    await fetchService(route.params.id)
    appStore.loadingEnd()
});
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">
                    Service Details: {{ service?.title }}
                </h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <NuxtLink :to="`/services/${route.params.id}/edit`" class="hover:text-info">
                        <icon-edit class="w-5 h-5" />
                    </NuxtLink>
                </div>
            </div>

            <div class="mb-5">
                <div class="space-y-5">
                    <div class="flex flex-col sm:flex-row">
                        <label for="id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">ID</label>
                        <p id="id">{{ service?.id }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Title</label>
                        <p id="title">{{ service?.title }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="description" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Description</label>
                        <p id="description">{{ service?.description }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="icon" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Icon</label>
                        <p id="icon">{{ service?.icon }}</p>
                    </div>
                </div>
            </div>
        </div>
    </SectionMain>
</template>
