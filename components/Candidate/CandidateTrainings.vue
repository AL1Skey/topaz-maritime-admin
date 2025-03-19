<script setup>
defineProps({
    standardTrainings: {
        type: Array,
        default: () => []
    },
    stcwTrainings: {
        type: Array,
        default: () => []
    }
});

// Helper function to format date or return placeholder
const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
};

// Check if a training has any data
const hasTrainingData = (training) => {
    return training.qualificationNo || training.issuedDate || training.expiredDate;
};
</script>

<template>
    <div class="panel mt-6">
        <h6 class="mb-4 text-base font-semibold">Trainings</h6>
        
        <!-- Standard Trainings -->
        <div class="mb-6">
            <h6 class="mb-2 font-medium">Standard Trainings</h6>
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border p-2">Training Type</th>
                            <th class="border p-2">Name</th>
                            <th class="border p-2">Qualification No</th>
                            <th class="border p-2">Issue Date</th>
                            <th class="border p-2">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(training, index) in standardTrainings" :key="index" 
                            :class="{'bg-gray-100 dark:bg-gray-700': !hasTrainingData(training)}">
                            <td class="border p-2">{{ training.trainingType }}</td>
                            <td class="border p-2">{{ training.name }}</td>
                            <td class="border p-2">{{ training.qualificationNo || '-' }}</td>
                            <td class="border p-2">{{ formatDate(training.issuedDate) }}</td>
                            <td class="border p-2">{{ formatDate(training.expiredDate) }}</td>
                        </tr>
                        <tr v-if="!standardTrainings || standardTrainings.length === 0">
                            <td colspan="5" class="border p-2 text-center">No standard trainings available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- STCW Trainings -->
        <div>
            <h6 class="mb-2 font-medium">STCW Trainings</h6>
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border p-2">Training Type</th>
                            <th class="border p-2">Qualification No</th>
                            <th class="border p-2">Issue Date</th>
                            <th class="border p-2">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(training, index) in stcwTrainings" :key="index"
                            :class="{'bg-gray-100 dark:bg-gray-700': !hasTrainingData(training)}">
                            <td class="border p-2">{{ training.trainingType }}</td>
                            <td class="border p-2">{{ training.qualificationNo || '-' }}</td>
                            <td class="border p-2">{{ formatDate(training.issuedDate) }}</td>
                            <td class="border p-2">{{ formatDate(training.expiredDate) }}</td>
                        </tr>
                        <tr v-if="!stcwTrainings || stcwTrainings.length === 0">
                            <td colspan="4" class="border p-2 text-center">No STCW trainings available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>