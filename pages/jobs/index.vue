<script setup lang="ts">
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useAppStore } from '@/stores/index';
import { useJobStore } from '@/stores/job';
import { storeToRefs } from 'pinia';
import { refDebounced } from '@vueuse/core';

useHead({ title: 'Jobs' });

const appStore = useAppStore();
const jobStore = useJobStore()

const { jobs, jobsMeta, job, isModalDeleteActive, loading, } = storeToRefs(jobStore)
const { fetchJobs, deleteJob, openModalDelete } = jobStore

onMounted(() => {
    nextTick(() => {
        window.dispatchEvent(new Event('resize'));
    });
});

onMounted(async () => {
    appStore.loadingStart()
    await fetchJobs(params)
    console.log("🚀 | jobs:", jobs.value)
    appStore.loadingEnd()
});

const cols = ref([
    { field: 'id', title: 'ID', isUnique: true },
    { field: 'title', title: 'Title' },
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

    await fetchJobs(params)
};

const confirmDelete = async () => {
    await deleteJob(job.value!.id)
    await fetchJobs(params)
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6 px-0">
            <h5 class="mb-5 px-5 text-lg font-semibold dark:text-white-light">
                Jobs
            </h5>

            <div class="datatable invoice-table">
                <div class="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                    <div class="mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                    <div class="flex items-center gap-2">
                        <NuxtLink to="/jobs/create" class="btn btn-primary gap-2">
                            <!-- <icon-plus /> -->
                            Create Job
                        </NuxtLink>
                    </div>
                </div>

                <vue3-datatable
                    :rows="jobs"
                    :columns="cols"
                    :loading="loading"
                    :totalRows="jobsMeta?.total"
                    :isServerMode="true"
                    :sortable="false"
                    :pagination="true"
                    :search="params.search"
                    :pageSizeOptions="[10, 20, 30]"
                    @change="changeServer"
                    skin="whitespace-nowrap bh-table-hover"
                >
                    <template #id="data">
                        <strong class="text-info">#{{ data.value.id }}</strong>
                    </template>
                    <template #title="data">
                        <div class="font-semibold">{{ data.value.title }}</div>
                    </template>
                    <template #actions="data">
                        <div class="flex items-center justify-center gap-4">
                            <NuxtLink :to="`/jobs/${data.value.id}`" class="hover:text-primary">
                                <icon-eye />
                            </NuxtLink>
                            <NuxtLink :to="`/jobs/${data.value.id}/edit`" class="hover:text-info">
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
                <p>Job: <span class="font-bold">{{ job?.title }}</span></p>
                <p>Are you sure you want to permanently delete this job?</p>
            </ModalDelete>
        </client-only>
    </SectionMain>
</template>
