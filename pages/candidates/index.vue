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

const { jobCategory, jobCategories, loading, message, errors } = storeToRefs(jobCategoryStore)
const { updateJobCategory, fetchJobCategory } = jobCategoryStore

// Add state for all job categories and selected category
const allJobCategories = ref([])
const selectedCategoryId = ref(route.params.id)

const {
    jobApplications,
    jobApplicationsMeta,
    jobApplication,
    isModalDeleteActive,
} = storeToRefs(jobApplicationStore)

const {
    fetchJobApplicationsByJobCategoryId,
    deleteJobApplication,
    openModalDelete,
} = jobApplicationStore

// Add function to fetch all job categories
const fetchAllJobCategories = async () => {
    try {
        // Assuming there's a method in the store to get all categories
        // If not, you might need to add this method to your store
        const response = await jobCategoryStore.fetchJobCategories()
        allJobCategories.value = jobCategories.value || []
        console.log("Job Categories: ",jobCategories.value)
    } catch (error) {
        console.error('Error fetching job categories:', error)
    }
}

onMounted(async () => {
    appStore.loadingStart()
    await fetchJobCategory(route.params.id)
    await fetchAllJobCategories() // Fetch all categories for dropdown
    await fetchJobApplicationsByJobCategoryId(route.params.id)
    appStore.loadingEnd()
});

// Handle category change
const handleCategoryChange = async (event) => {
    const newCategoryId = event.target.value
    selectedCategoryId.value = newCategoryId
    
    appStore.loadingStart()
    // Fetch the selected category details
    await fetchJobCategory(newCategoryId)
    // Fetch applications for the selected category
    await fetchJobApplicationsByJobCategoryId(newCategoryId, jobApplicationParams)
    appStore.loadingEnd()
}

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

    await fetchJobApplicationsByJobCategoryId(selectedCategoryId.value, jobApplicationParams)
};

const confirmDelete = async () => {
    await deleteJobApplication(jobApplication.value?.id)
    await fetchJobApplicationsByJobCategoryId(selectedCategoryId.value, jobApplicationParams)
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Job Category Details
            </h5>

            <div class="mb-5">
                <div class="space-y-5">
                    <!-- Add dropdown for job categories -->
                    <div class="flex flex-col sm:flex-row">
                        <label for="category" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Job Category</label>
                        <select 
                            id="category" 
                            v-model="selectedCategoryId" 
                            @change="handleCategoryChange"
                            class="form-select"
                        >
                            <option v-for="category in allJobCategories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                    </div>
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
                Job Applications for {{ jobCategory?.name }}
            </h5>

            <div class="datatable invoice-table">
                <div class="mb-4.5 flex flex-col justify-end gap-5 px-5 md:flex-row md:items-center">
                    <div class="mr-auto">
                        <input v-model="jobApplicatioSearch" type="text" class="form-input" placeholder="Search..." />
                    </div>
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