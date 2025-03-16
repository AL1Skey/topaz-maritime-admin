<script setup>
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useJobCategoryStore } from '@/stores/jobCategory';
import { useJobApplicationStore } from '@/stores/jobApplication';
import { refDebounced } from '@vueuse/core';
import { downloadJobApplicationsExcel } from '@/utils/excel-export';

useHead({ title: 'Job Category Details' });

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const jobCategoryStore = useJobCategoryStore();
const jobApplicationStore = useJobApplicationStore();

const { jobCategory, jobCategories, loading, message, errors } = storeToRefs(jobCategoryStore);
const { updateJobCategory, fetchJobCategory, fetchJobCategories } = jobCategoryStore;

// Add state for all job categories and selected category
const allJobCategories = ref([]);
const selectedCategoryId = ref(route.params.id);

const {
    jobApplications,
    jobApplicationsMeta,
    jobApplication,
    isModalDeleteActive,
} = storeToRefs(jobApplicationStore);

const {
    fetchJobApplicationsByJobCategoryId,
    deleteJobApplication,
    openModalDelete,
    updateApplicationStatus
} = jobApplicationStore;

// Add state for status change confirmation modal
const isModalStatusChangeActive = ref(false);
const statusChangeType = ref(''); // 'accept' or 'reject'
const selectedCandidate = ref(null);

onMounted(async () => {
    appStore.loadingStart();
    await fetchJobCategory(route.params.id);
    await fetchAllJobCategories();
    await fetchJobApplicationsByJobCategoryId(route.params.id);
    appStore.loadingEnd();
});

// Add function to fetch all job categories
const fetchAllJobCategories = async () => {
    try {
        await fetchJobCategories();
        allJobCategories.value = jobCategories.value || [];
    } catch (error) {
        console.error('Error fetching job categories:', error);
    }
};

// Handle category change
const handleCategoryChange = async (event) => {
    const newCategoryId = event.target.value;
    selectedCategoryId.value = newCategoryId;
    
    appStore.loadingStart();
    // Fetch the selected category details
    await fetchJobCategory(newCategoryId);
    // Fetch applications for the selected category
    await fetchJobApplicationsByJobCategoryId(newCategoryId, jobApplicationParams);
    appStore.loadingEnd();
    
    // Update the URL without reloading the page
    // router.push(`/job-category/${newCategoryId}`);
};

const jobApplicationCols = ref([
    { field: 'id', title: 'ID', isUnique: true },
    { field: 'name', title: 'Name' },
    { field: 'email', title: 'Email' },
    { field: 'phone', title: 'Phone' },
    { field: 'job', title: 'Job' },
    { field: 'status', title: 'Status' },
    { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
]) || [];

const jobApplicationParams = reactive({
    page: 1,
    per_page: 10,
    search: '',
});

const jobApplicatioSearch = ref(jobApplicationParams.search);
const jobApplicationDebouncedSearch = refDebounced(jobApplicatioSearch, 500);
watch(jobApplicationDebouncedSearch, () => {
    jobApplicationParams.search = jobApplicatioSearch.value;
});

const changeServer = async (data) => {
    jobApplicationParams.page = data.current_page;
    jobApplicationParams.per_page = data.pagesize;

    await fetchJobApplicationsByJobCategoryId(selectedCategoryId.value, jobApplicationParams);
};

const confirmDelete = async () => {
    await deleteJobApplication(jobApplication.value?.id);
    await fetchJobApplicationsByJobCategoryId(selectedCategoryId.value, jobApplicationParams);
};

// Function to download job applications as Excel
const downloadExcel = () => {
    if (!jobApplications.value || jobApplications.value.length === 0) return;
    
    downloadJobApplicationsExcel(jobApplications.value, jobCategory.value.name);
};

// Function to download detailed Excel with all candidate information
const downloadDetailedExcel = async () => {
    if (!jobApplications.value || jobApplications.value.length === 0) return;
    
    appStore.loadingStart();
    try {
        // Fetch detailed information for all candidates
        const detailedCandidates = await Promise.all(
            jobApplications.value.map(app => jobApplicationStore.fetchCandidateDetails(app.id))
        );
        
        // Download Excel with detailed information
        downloadJobApplicationsExcel(detailedCandidates, jobCategory.value.name, true);
    } catch (error) {
        console.error('Error generating detailed Excel:', error);
        appStore.showMessage({
            type: 'error',
            message: 'Failed to generate detailed Excel report'
        });
    } finally {
        appStore.loadingEnd();
    }
};

// Navigate to candidate details page
const viewCandidateDetails = (candidate) => {
    router.push(`/candidates/${candidate.id}`);
};

// Functions to handle recruitment status changes
const openStatusChangeModal = (candidate, type) => {
    selectedCandidate.value = candidate;
    statusChangeType.value = type; // 'accept' or 'reject'
    isModalStatusChangeActive.value = true;
};

const confirmStatusChange = async () => {
    try {
        appStore.loadingStart();
        
        await updateApplicationStatus(
            selectedCandidate.value.id, 
            statusChangeType.value === 'accept' ? 'Accepted' : 'Rejected'
        );
        
        // Refresh the data
        await fetchJobApplicationsByJobCategoryId(selectedCategoryId.value, jobApplicationParams);
        
        // Close the modal
        isModalStatusChangeActive.value = false;
        
        // Show success message
        appStore.showMessage({
            type: 'success',
            message: `Candidate ${statusChangeType.value === 'accept' ? 'accepted' : 'rejected'} successfully`
        });
    } catch (error) {
        console.error('Error updating status:', error);
        appStore.showMessage({
            type: 'error',
            message: `Failed to update status: ${error.message}`
        });
    } finally {
        appStore.loadingEnd();
    }
};
</script>

<template>
    <SectionMain>
        <CandidateJobCategoryHeader 
            :job-category="jobCategory" 
            :all-job-categories="allJobCategories"
            :selected-category-id="selectedCategoryId"
            @category-change="handleCategoryChange"
        />

        <div class="panel mt-6">
            <div class="flex items-center justify-between mb-5">
                <h5 class="text-lg font-semibold dark:text-white-light">
                    Job Applications for {{ jobCategory?.name }}
                </h5>
                <div class="flex gap-2">
                    <button 
                        type="button" 
                        class="btn btn-success"
                        @click="downloadExcel"
                        :disabled="!jobApplications || jobApplications.length === 0"
                    >
                        <icon-download class="mr-2" />
                        Basic Excel
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-primary"
                        @click="downloadDetailedExcel"
                        :disabled="!jobApplications || jobApplications.length === 0"
                    >
                        <icon-download class="mr-2" />
                        Detailed Excel
                    </button>
                </div>
            </div>

            <div class="datatable invoice-table">
                <div class="mb-4.5 flex flex-col justify-end gap-5 px-5 md:flex-row md:items-center">
                    <div class="mr-auto">
                        <input v-model="jobApplicatioSearch" type="text" class="form-input" placeholder="Search..." />
                    </div>
                </div>

                <CandidateJobApplicationsTable
                    :applications="jobApplications"
                    :columns="jobApplicationCols"
                    :loading="jobApplicationStore.loading"
                    :total-rows="jobApplicationsMeta?.total"
                    :search="jobApplicationParams.search"
                    @change="changeServer"
                    @view-details="viewCandidateDetails"
                    @change-status="openStatusChangeModal"
                    @delete="openModalDelete"
                />
            </div>
        </div>

        <!-- Delete Modal -->
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

        <!-- Status Change Modal -->
        <client-only>
            <ModalDelete
                v-model="isModalStatusChangeActive"
                :title="statusChangeType === 'accept' ? 'Accept Candidate' : 'Reject Candidate'"
                :confirmLabel="statusChangeType === 'accept' ? 'Accept' : 'Reject'"
                :confirmButtonClass="statusChangeType === 'accept' ? 'btn-success' : 'btn-danger'"
                @confirm="confirmStatusChange"
            >
                <p>Candidate: <span class="font-bold">{{ selectedCandidate?.name }}</span></p>
                <p>Are you sure you want to {{ statusChangeType === 'accept' ? 'accept' : 'reject' }} this candidate?</p>
            </ModalDelete>
        </client-only>
    </SectionMain>
</template>