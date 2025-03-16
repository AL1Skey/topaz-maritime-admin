<script setup>
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useJobCategoryStore } from '@/stores/jobCategory';
import { useJobApplicationStore } from '@/stores/jobApplication';
import { refDebounced } from '@vueuse/core';
import * as XLSX from 'xlsx';

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

// Add state for candidate details modal
const isModalCandidateDetailsActive = ref(false)
const selectedCandidate = ref(null)

// Add state for accept/reject confirmation modal
const isModalStatusChangeActive = ref(false)
const statusChangeType = ref('') // 'accept' or 'reject'

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
    { field: 'status', title: 'Status' }, // Added status column
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

// Function to download job applications as Excel
const downloadExcel = () => {
    // Create worksheet from job applications data
    const worksheet = XLSX.utils.json_to_sheet(jobApplications.value.map(app => ({
        ID: app.id,
        Name: app.name,
        Email: app.email,
        Phone: app.phone,
        Job: app.job_vacancy.title,
        Status: app.status || 'Pending'
    })));
    
    // Create workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Job Applications');
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${jobCategory.value.name}_Applications.xlsx`);
}

// Function to open candidate details modal
const openCandidateDetails = (candidate) => {
    selectedCandidate.value = candidate;
    isModalCandidateDetailsActive.value = true;
}

// Functions to handle recruitment status changes
const openStatusChangeModal = (candidate, type) => {
    selectedCandidate.value = candidate;
    statusChangeType.value = type; // 'accept' or 'reject'
    isModalStatusChangeActive.value = true;
}

const confirmStatusChange = async () => {
    try {
        appStore.loadingStart();
        
        // Assuming you have an API endpoint to update application status
        // You'll need to implement this function in your jobApplicationStore
        await jobApplicationStore.updateApplicationStatus(
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
                    <!-- Add Excel download button -->
                    <button 
                        type="button" 
                        class="btn btn-success"
                        @click="downloadExcel"
                        :disabled="!jobApplications || jobApplications.length === 0"
                    >
                        <icon-download class="mr-2" />
                        Download Excel
                    </button>
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
                    <template #status="data">
                        <div class="flex items-center justify-center">
                            <span 
                                class="badge whitespace-nowrap" 
                                :class="{
                                    'badge-outline-success': data.value.status === 'Accepted',
                                    'badge-outline-danger': data.value.status === 'Rejected',
                                    'badge-outline-warning': !data.value.status || data.value.status === 'Pending'
                                }"
                            >
                                {{ data.value.status || 'Pending' }}
                            </span>
                        </div>
                    </template>
                    <template #actions="data">
                        <div class="flex items-center justify-center gap-2">
                            <!-- View details button -->
                            <button type="button" class="btn btn-sm btn-info p-1" @click="openCandidateDetails(data.value)">
                                <icon-eye class="h-4 w-4" />
                            </button>
                            
                            <!-- Accept button -->
                            <button 
                                type="button" 
                                class="btn btn-sm btn-success p-1" 
                                @click="openStatusChangeModal(data.value, 'accept')"
                                :disabled="data.value.status === 'Accepted'"
                            >
                                <icon-check class="h-4 w-4" />
                            </button>
                            
                            <!-- Reject button -->
                            <button 
                                type="button" 
                                class="btn btn-sm btn-danger p-1" 
                                @click="openStatusChangeModal(data.value, 'reject')"
                                :disabled="data.value.status === 'Rejected'"
                            >
                                <icon-x class="h-4 w-4" />
                            </button>
                            
                            <!-- Delete button -->
                            <button type="button" class="btn btn-sm btn-danger p-1" @click="openModalDelete(data.value)">
                                <icon-trash-lines class="h-4 w-4" />
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
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

        <!-- Candidate Details Modal -->
        <client-only>
            <Modal
                v-model="isModalCandidateDetailsActive"
                title="Candidate Details"
                size="xl"
            >
                <div v-if="selectedCandidate" class="p-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Personal Information -->
                        <div class="panel">
                            <h6 class="mb-4 text-base font-semibold">Personal Information</h6>
                            <div class="space-y-3">
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Name:</span>
                                    <span>{{ selectedCandidate.name }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Birth Place:</span>
                                    <span>{{ selectedCandidate.birthPlace }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Birth Date:</span>
                                    <span>{{ new Date(selectedCandidate.birthDate).toLocaleDateString() }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Gender:</span>
                                    <span>{{ selectedCandidate.sex ? 'Male' : 'Female' }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Marital Status:</span>
                                    <span>{{ selectedCandidate.maritalStatusId }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Children:</span>
                                    <span>{{ selectedCandidate.numberOfChild }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Religion:</span>
                                    <span>{{ selectedCandidate.religionId }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Blood Type:</span>
                                    <span>{{ selectedCandidate.bloodType }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Nationality:</span>
                                    <span>{{ selectedCandidate.nationalityId }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Contact Information -->
                        <div class="panel">
                            <h6 class="mb-4 text-base font-semibold">Contact Information</h6>
                            <div class="space-y-3">
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Address:</span>
                                    <span>{{ selectedCandidate.address }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">City:</span>
                                    <span>{{ selectedCandidate.city }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Zip Code:</span>
                                    <span>{{ selectedCandidate.zipCode }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Country:</span>
                                    <span>{{ selectedCandidate.countryId }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Phone:</span>
                                    <span>{{ selectedCandidate.phoneNo }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Mobile:</span>
                                    <span>{{ selectedCandidate.handPhone }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Email:</span>
                                    <span>{{ selectedCandidate.email }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Certificate Information -->
                        <div class="panel">
                            <h6 class="mb-4 text-base font-semibold">Certificate Information</h6>
                            <div class="space-y-3">
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Certificate ID:</span>
                                    <span>{{ selectedCandidate.certificateId }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Certificate No:</span>
                                    <span>{{ selectedCandidate.certificateNo }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Status:</span>
                                    <span>{{ selectedCandidate.certificateStatusId }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Issued By:</span>
                                    <span>{{ selectedCandidate.certificateIssued }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Issue Date:</span>
                                    <span>{{ new Date(selectedCandidate.certificateIssuedDate).toLocaleDateString() }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Expiry Date:</span>
                                    <span>{{ new Date(selectedCandidate.certificateExpiryDate).toLocaleDateString() }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Physical Information -->
                        <div class="panel">
                            <h6 class="mb-4 text-base font-semibold">Physical Information</h6>
                            <div class="space-y-3">
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Height:</span>
                                    <span>{{ selectedCandidate.height }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Weight:</span>
                                    <span>{{ selectedCandidate.weight }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">White Shirt:</span>
                                    <span>{{ selectedCandidate.whiteShirt }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Blue Pants:</span>
                                    <span>{{ selectedCandidate.bluePants }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Overall:</span>
                                    <span>{{ selectedCandidate.overall }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Safety Shoes:</span>
                                    <span>{{ selectedCandidate.safetyShoes }}</span>
                                </div>
                                <div class="flex">
                                    <span class="w-1/3 font-semibold">Winter Jacket:</span>
                                    <span>{{ selectedCandidate.winterJacket }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Documents -->
                    <div class="panel mt-6">
                        <h6 class="mb-4 text-base font-semibold">Documents</h6>
                        <div class="overflow-x-auto">
                            <table class="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th class="border p-2">Document ID</th>
                                        <th class="border p-2">Document No</th>
                                        <th class="border p-2">Issued By</th>
                                        <th class="border p-2">Valid Date</th>
                                        <th class="border p-2">Expiry Date</th>
                                        <th class="border p-2">Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(doc, index) in selectedCandidate.documents" :key="index">
                                        <td class="border p-2">{{ doc.docId }}</td>
                                        <td class="border p-2">{{ doc.docNo }}</td>
                                        <td class="border p-2">{{ doc.issued }}</td>
                                        <td class="border p-2">{{ new Date(doc.validDate).toLocaleDateString() }}</td>
                                        <td class="border p-2">{{ new Date(doc.expiredDate).toLocaleDateString() }}</td>
                                        <td class="border p-2">{{ doc.remark }}</td>
                                    </tr>
                                    <tr v-if="!selectedCandidate.documents || selectedCandidate.documents.length === 0">
                                        <td colspan="6" class="border p-2 text-center">No documents available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Trainings -->
                    <div class="panel mt-6">
                        <h6 class="mb-4 text-base font-semibold">Trainings</h6>
                        <div class="overflow-x-auto">
                            <table class="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th class="border p-2">Training ID</th>
                                        <th class="border p-2">Reference ID</th>
                                        <th class="border p-2">Certificate No</th>
                                        <th class="border p-2">Valid Date</th>
                                        <th class="border p-2">Expiry Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(training, index) in selectedCandidate.trainings" :key="index">
                                        <td class="border p-2">{{ training.trainingId }}</td>
                                        <td class="border p-2">{{ training.referenceId }}</td>
                                        <td class="border p-2">{{ training.certificateNo }}</td>
                                        <td class="border p-2">{{ new Date(training.validDate).toLocaleDateString() }}</td>
                                        <td class="border p-2">{{ new Date(training.expiredDate).toLocaleDateString() }}</td>
                                    </tr>
                                    <tr v-if="!selectedCandidate.trainings || selectedCandidate.trainings.length === 0">
                                        <td colspan="5" class="border p-2 text-center">No trainings available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Experiences -->
                    <div class="panel mt-6">
                        <h6 class="mb-4 text-base font-semibold">Work Experience</h6>
                        <div class="overflow-x-auto">
                            <table class="w-full table-auto">
                                <thead>
                                    <tr>
                                        <th class="border p-2">Vessel</th>
                                        <th class="border p-2">Vessel Type</th>
                                        <th class="border p-2">Flag</th>
                                        <th class="border p-2">Trading Area</th>
                                        <th class="border p-2">Rank</th>
                                        <th class="border p-2">DWT</th>
                                        <th class="border p-2">KWH</th>
                                        <th class="border p-2">Owner</th>
                                        <th class="border p-2">Sign On</th>
                                        <th class="border p-2">Sign Off</th>
                                        <th class="border p-2">Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(exp, index) in selectedCandidate.experiences" :key="index">
                                        <td class="border p-2">{{ exp.vessel }}</td>
                                        <td class="border p-2">{{ exp.vesselType }}</td>
                                        <td class="border p-2">{{ exp.flag }}</td>
                                        <td class="border p-2">{{ exp.tradingAreaId }}</td>
                                        <td class="border p-2">{{ exp.rank }}</td>
                                        <td class="border p-2">{{ exp.dwt }}</td>
                                        <td class="border p-2">{{ exp.kwh }}</td>
                                        <td class="border p-2">{{ exp.owner }}</td>
                                        <td class="border p-2">{{ new Date(exp.signOn).toLocaleDateString() }}</td>
                                        <td class="border p-2">{{ new Date(exp.signOff).toLocaleDateString() }}</td>
                                        <td class="border p-2">{{ exp.signOffReason }}</td>
                                    </tr>
                                    <tr v-if="!selectedCandidate.experiences || selectedCandidate.experiences.length === 0">
                                        <td colspan="11" class="border p-2 text-center">No experience available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        </client-only>
    </SectionMain>
</template>