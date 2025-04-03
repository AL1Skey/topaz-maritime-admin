<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useJobApplicationStore } from '@/stores/Candidate';
import { downloadCandidateExcel } from '@/utils/excel-export';

useHead({ title: 'Candidate Details' });

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const jobApplicationStore = useJobApplicationStore();

const { loading,jobApplication } = storeToRefs(jobApplicationStore);
const candidate = ref(null);
const documents = ref(null);
const experiences = ref(null);
const standardTrainings = ref(null);
const stcwTrainings = ref(null);
const { approveCandidate, rejectCandidate } = jobApplicationStore;

onMounted(async () => {
    appStore.loadingStart();
    try {
        // Fetch candidate details
        const data = await jobApplicationStore.fetchCandidateDetail(route.params.id);
        candidate.value = jobApplication.value.candidate;
        documents.value = jobApplication.value.documents;
        experiences.value = jobApplication.value.experiences;
        standardTrainings.value = jobApplication.value.trainings;
        stcwTrainings.value = jobApplication.value.stcwTrainings;
        console.log("CANDIDATE", candidate.value);
    } catch (error) {
        console.error('Error fetching candidate details:', error);
        // appStore.showMessage({
        //     type: 'error',
        //     message: 'Failed to load candidate details'
        // });
    } finally {
        appStore.loadingEnd();
    }
});

// Function to download candidate details as Excel
const downloadExcel = () => {
    if (!candidate.value) return;
    
    downloadCandidateExcel({
        ...candidate.value,
        documents: documents.value,
        experiences: experiences.value,
        trainings: standardTrainings.value,
    });
};

// Function to go back to job category page
const goBack = () => {
    router.back();
};

// Function to update candidate status
const updateStatus = async (status) => {
    try {
        appStore.loadingStart();
        console.log("START", candidate.value);
        if (status === 'Accepted') {
            await approveCandidate(candidate.value.candidate_id);
        } else {
            await rejectCandidate(candidate.value.candidate_id);
        }
        
        
        // Update local candidate data
        candidate.value.status = status;
        
        // Show success message
        // appStore.showMessage({
        //     type: 'success',
        //     message: `Candidate ${status.toLowerCase()} successfully`
        // });
    } catch (error) {
        console.error('Error updating status:', error);
        // appStore.showMessage({
        //     type: 'error',
        //     message: `Failed to update status: ${error.message}`
        // });
    } finally {
        appStore.loadingEnd();
    }
};
</script>

<template>
    <SectionMain>
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center gap-4">
                <button @click="goBack" class="btn btn-outline-primary">
                    <icon-arrow-backward class="h-5 w-5 mr-2" />
                    Back
                </button>
                <h1 class="text-2xl font-bold">Candidate Details</h1>
            </div>
            
            <div class="flex gap-2">
                <button 
                    type="button" 
                    class="btn btn-success"
                    @click="updateStatus('Accepted')"
                    :disabled="candidate?.status?.toLowerCase() === 'Accepted'.toLowerCase()"
                >
                    <icon-check class="mr-2" />
                    Accept
                </button>
                <button 
                    type="button" 
                    class="btn btn-danger"
                    @click="updateStatus('Rejected')"
                    :disabled="candidate?.status?.toLowerCase() === 'Rejected'.toLowerCase()"
                >
                    <icon-x class="mr-2" />
                    Reject
                </button>
                <button 
                    type="button" 
                    class="btn btn-primary"
                    @click="downloadExcel"
                    :disabled="!candidate"
                >
                    <icon-download class="mr-2" />
                    Download Excel
                </button>
            </div>
        </div>

        <div v-if="loading" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <template v-else-if="candidate">
            <CandidatePersonalInfo :candidate="candidate" />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <CandidateContactInfo :candidate="candidate" />
                <CandidateNextOfKin :candidate="candidate" />
                <CandidatePhysicalInfo :candidate="candidate" />
                <!-- <CandidateCertificateInfo :candidate="candidate" /> -->
            </div>

            <CandidateDocumentsInfo :documents="documents" />
            <CandidateTrainings 
                :trainings="standardTrainings" 
           
            />
            <CandidateExperiences :experiences="experiences" />
        </template>

        <div v-else-if="!loading" class="panel p-6 text-center">
            <icon-alert-circle class="h-16 w-16 mx-auto text-warning mb-4" />
            <h2 class="text-xl font-bold mb-2">Candidate Not Found</h2>
            <p class="mb-4">The candidate you're looking for doesn't exist or you don't have permission to view it.</p>
            <button @click="goBack" class="btn btn-primary">
                Go Back
            </button>
        </div>
    </SectionMain>
</template>