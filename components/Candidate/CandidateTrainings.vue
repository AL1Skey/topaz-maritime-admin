<script setup>
const { trainings } = defineProps({
    trainings: {
        type: Array,
        default: () => []
    }
});

// Helper function to format date or return placeholder
const format_date = (date_string) => {
    if (!date_string) return '-';
    return new Date(date_string).toLocaleDateString();
};
trainings.forEach(element => {
    console.log("Trainings:", element.training_id);
    
});
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
                        <tr v-for="(training, index) in trainings" :key="index" 
                            class='bg-gray-100 dark:bg-gray-700'>
                            <td class="border p-2">{{ training.training_id }}</td>
                            <td class="border p-2">{{ training.name }}</td>
                            <td class="border p-2">{{ training.certificate_no || '-' }}</td>
                            <td class="border p-2">{{ format_date(training.valid_date) }}</td>
                            <td class="border p-2">{{ format_date(training.expired_date) }}</td>
                        </tr>
                        <tr v-if="!trainings || trainings.length === 0">
                            <td colspan="5" class="border p-2 text-center">No standard trainings available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- STCW Trainings -->
        <!-- <div>
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
                        <tr v-if="stcw_trainings" v-for="(training, index) in stcwTrainings.value" :key="index"
                            :class="{'bg-gray-100 dark:bg-gray-700': !has_training_data(training)}">
                            <td class="border p-2">{{ training.training_type }}</td>
                            <td class="border p-2">{{ training.qualification_no || '-' }}</td>
                            <td class="border p-2">{{ format_date(training.issued_date) }}</td>
                            <td class="border p-2">{{ format_date(training.expired_date) }}</td>
                        </tr>
                        <tr v-if="!stcwTrainings || stcwTrainings.length === 0">
                            <td colspan="4" class="border p-2 text-center">No STCW trainings available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div> -->
    </div>
</template>