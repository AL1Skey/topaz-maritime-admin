<script setup>
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useJobCategoryStore } from '@/stores/jobCategory';
import { useJobApplicationStore } from '@/stores/jobApplication';
import { refDebounced } from '@vueuse/core';

useHead({ title: 'Job Category Details' });

const route = useRoute()
const appStore = useAppStore();
const jobCategoryStore = useJobCategoryStore()
const jobApplicationStore = useJobApplicationStore()

const { jobCategory, loading, message, errors } = storeToRefs(jobCategoryStore)
const { updateJobCategory, fetchJobCategory } = jobCategoryStore

const {
    jobApplications,
    jobApplicationsMeta,
    jobApplication,
    // loading,
    // message,
    // errors,
    isModalDeleteActive,
} = storeToRefs(jobApplicationStore)

const {
    fetchJobApplicationsByJobCategoryId,
    deleteJobApplication,
    openModalDelete,
} = jobApplicationStore

onMounted(async () => {
    appStore.loadingStart()
    await fetchJobCategory(route.params.id)
    await fetchJobApplicationsByJobCategoryId(route.params.id)
    appStore.loadingEnd()
});


const jobApplicationCols = ref([
    { field: 'id', title: 'ID', isUnique: true },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'phone', title: 'Phone' },
    { field: 'job', title: 'Job' },
    { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
]) || [];

const jobApplicationParams = reactive({
    page: 1,
    per_page: 10,
    search: '',
});

const jobApplicatioSearch = ref(jobApplicationParams.search)
const jobApplicationDebouncedSearch = refDebounced(jobApplicatioSearch, 500)
watch(jobApplicationDebouncedSearch, () => {
    jobApplicationParams.search = jobApplicatioSearch.value
})

const changeServer = async (data) => {
    jobApplicationParams.page = data.current_page;
    jobApplicationParams.per_page = data.pagesize;

    await fetchJobApplicationsByJobCategoryId(route.params.id, jobApplicationParams)
};

const confirmDelete = async () => {
    await deleteJobApplication(jobApplication.value?.id)
    await fetchJobApplicationsByJobCategoryId(route.params.id, jobApplicationParams)
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Job Category Details: {{ jobCategory?.name }}
            </h5>

            <div class="mb-5">
                <div class="space-y-5">
                    <div class="flex flex-col sm:flex-row">
                        <label for="id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">ID</label>
                        <p id="id">{{ jobCategory?.id }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="name" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Name</label>
                        <p id="name">{{ jobCategory?.name }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Job Applications
            </h5>

            <div class="datatable invoice-table">
                <div class="mb-4.5 flex flex-col justify-end gap-5 px-5 md:flex-row md:items-center">
                    <div class="mr-auto">
                        <input v-model="jobApplicatioSearch" type="text" class="form-input" placeholder="Search..." />
                    </div>
                    <!-- <div class="flex items-center gap-2">
                        <NuxtLink to="/job-categories/create" class="btn btn-primary gap-2">
                            Create Job Application
                        </NuxtLink>
                    </div> -->
                </div>

                <vue3-datatable
                    :rows="jobApplications"
                    :columns="jobApplicationCols"
                    :loading="jobApplicationStore.loading"
                    :totalRows="jobApplicationsMeta?.total"
                    :isServerMode="true"
                    :sortable="false"
                    :pagination="true"
                    :search="jobApplicationParams.search"
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
                    <template #email="data">
                        <div class="font-semibold">{{ data.value.email }}</div>
                    </template>
                    <template #phone="data">
                        <div class="font-semibold">{{ data.value.phone }}</div>
                    </template>
                    <template #job="data">
                        <div class="font-semibold">{{ data.value.job_vacancy.title }}</div>
                    </template>
                    <template #actions="data">
                        <div class="flex items-center justify-center gap-4">
                            <!-- <NuxtLink :to="`/job-applications/${data.value.id}`" class="hover:text-primary">
                                <icon-eye />
                            </NuxtLink>
                            <NuxtLink :to="`/job-applications/${data.value.id}/edit`" class="hover:text-info">
                                <icon-edit class="w-4.5 h-4.5" />
                            </NuxtLink> -->
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
                <p>Job application: <span class="font-bold">{{ jobApplication?.name }}</span></p>
                <p>Are you sure you want to permanently delete this job application?</p>
            </ModalDelete>
        </client-only>
    </SectionMain>
</template>
