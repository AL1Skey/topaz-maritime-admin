<script setup lang="ts">
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useAppStore } from '@/stores/index';
import { useJobCategoryStore } from '@/stores/jobCategory';

import { storeToRefs } from 'pinia';
import { refDebounced } from '@vueuse/core';

useHead({ title: 'Job Categories' });

const appStore = useAppStore();
const jobCategoryStore = useJobCategoryStore()

const { jobCategories, jobCategory, isModalDeleteActive, loading, } = storeToRefs(jobCategoryStore)
const { fetchJobCategories, deleteJobCategory, openModalDelete } = jobCategoryStore

onMounted(() => {
    nextTick(() => {
        window.dispatchEvent(new Event('resize'));
    });
});

onMounted(async () => {
    appStore.loadingStart()
    await fetchJobCategories({
        include_job_applications_count: 1
    })
    appStore.loadingEnd()
});

const cols = ref([
    // { field: 'id', title: 'ID', isUnique: true },
    { field: 'name', title: 'Category' },
    { field: 'job_applications_count', title: 'Job Applications Count' },
    { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
]) || [];

const params = reactive({
    page: 1,
    per_page: 10,
    search: '',
});

const search = ref(params.search)
const debouncedSearch = refDebounced(search, 500)
watch(debouncedSearch, () => {
    params.search = search.value
})

const changeServer = async (data: any) => {
    params.page = data.current_page;
    params.per_page = data.pagesize;

    await fetchJobCategories(params)
};

const confirmDelete = async () => {
    await deleteJobCategory(jobCategory.value!.id)
    await fetchJobCategories(params)
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6 px-0">
            <h5 class="mb-5 px-5 text-lg font-semibold dark:text-white-light">
                Job Categories
            </h5>

            <div class="datatable invoice-table">
                <div class="mb-4.5 flex flex-col justify-end gap-5 px-5 md:flex-row md:items-center">
                    <!-- <div class="mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div> -->
                    <div class="flex items-center gap-2">
                        <NuxtLink to="/job-categories/create" class="btn btn-primary gap-2">
                            <!-- <icon-plus /> -->
                            Create Job Category
                        </NuxtLink>
                    </div>
                </div>

                <vue3-datatable
                    :rows="jobCategories"
                    :columns="cols"
                    :loading="loading"
                    :totalRows="jobCategories?.length"
                    :isServerMode="true"
                    :sortable="false"
                    :pagination="false"
                    :search="params.search"
                    :pageSizeOptions="[10, 20, 30]"
                    @change="changeServer"
                    skin="whitespace-nowrap bh-table-hover"
                >
                    <template #id="data">
                        <strong class="text-info">#{{ data.value.id }}</strong>
                    </template>
                    <template #name="data">
                        <div class="font-semibold">{{ data.value.name }}</div>
                    </template>
                    <template #job_applications_count="data">
                        <div class="font-semibold">{{ data.value.job_applications_count }}</div>
                    </template>
                    <template #actions="data">
                        <div class="flex items-center justify-center gap-4">
                            <NuxtLink :to="`/job-categories/${data.value.id}`" class="hover:text-primary">
                                <icon-eye />
                            </NuxtLink>
                            <NuxtLink :to="`/job-categories/${data.value.id}/edit`" class="hover:text-info">
                                <icon-edit class="w-4.5 h-4.5" />
                            </NuxtLink>
                            <button type="button" class="hover:text-danger" @click="openModalDelete(data.value)">
                                <icon-trash-lines />
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>

        <!-- Modal -->
        <client-only>
            <ModalDelete
                v-model="isModalDeleteActive"
                title="Please Confirm"
                confirmLabel="Delete"
                @confirm="confirmDelete"
            >
                <p>Job category: <span class="font-bold">{{ jobCategory?.name }}</span></p>
                <p>Are you sure you want to permanently delete this job category?</p>
            </ModalDelete>
        </client-only>
    </SectionMain>
</template>
