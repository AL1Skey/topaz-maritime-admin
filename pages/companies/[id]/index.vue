<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useCompanyStore } from '@/stores/company';

useHead({ title: 'Company Details' });

const route = useRoute()
const appStore = useAppStore();
const companyStore = useCompanyStore()

const { company, loading, message, errors } = storeToRefs(companyStore)
const { fetchCompany } = companyStore

onMounted(async () => {
    appStore.loadingStart()
    await fetchCompany(route.params.id)
    appStore.loadingEnd()
});
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">
                    Company Details: {{ company?.name }}
                </h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <NuxtLink :to="`/companies/${route.params.id}/edit`" class="hover:text-info">
                        <icon-edit class="w-5 h-5" />
                    </NuxtLink>
                </div>
            </div>

            <div class="mb-5">
                <div class="space-y-5">
                    <div class="flex flex-col sm:flex-row">
                        <label for="id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">ID</label>
                        <p id="id">{{ company?.id }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="name" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Name</label>
                        <p id="name">{{ company?.name }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="email" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Logo</label>
                        <div class="pt-1">
                            <img :src="company?.logo" :alt="company?.name" class="h-24">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SectionMain>
</template>
