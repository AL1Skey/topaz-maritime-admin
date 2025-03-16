<script setup>
defineProps({
    trainings: {
        type: Array,
        default: () => []
    }
});
</script>

<template>
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
                    <tr v-for="(training, index) in trainings" :key="index">
                        <td class="border p-2">{{ training.trainingId }}</td>
                        <td class="border p-2">{{ training.referenceId }}</td>
                        <td class="border p-2">{{ training.certificateNo }}</td>
                        <td class="border p-2">{{ new Date(training.validDate).toLocaleDateString() }}</td>
                        <td class="border p-2">{{ new Date(training.expiredDate).toLocaleDateString() }}</td>
                    </tr>
                    <tr v-if="!trainings || trainings.length === 0">
                        <td colspan="5" class="border p-2 text-center">No trainings available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>