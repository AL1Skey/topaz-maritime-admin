<script setup>
defineProps({
    experiences: {
        type: Array,
        default: () => []
    }
});

// Helper function to format date or return placeholder
const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
};
</script>

<template>
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
                        <th class="border p-2">GRT</th>
                        <th class="border p-2">Owner</th>
                        <th class="border p-2">Company</th>
                        <th class="border p-2">Sign On</th>
                        <th class="border p-2">Sign Off</th>
                        <th class="border p-2">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(exp, index) in experiences" :key="index">
                        <td class="border p-2">{{ exp.vessel || '-' }}</td>
                        <td class="border p-2">{{ exp.vesselType || '-' }}</td>
                        <td class="border p-2">{{ exp.flag || '-' }}</td>
                        <td class="border p-2">{{ exp.tradingAreaId || '-' }}</td>
                        <td class="border p-2">{{ exp.rank || '-' }}</td>
                        <td class="border p-2">{{ exp.dwt >= 0 ? exp.dwt : '-' }}</td>
                        <td class="border p-2">{{ exp.kwh >= 0 ? exp.kwh : '-' }}</td>
                        <td class="border p-2">{{ exp.grt >= 0 ? exp.grt : '-' }}</td>
                        <td class="border p-2">{{ exp.owner || '-' }}</td>
                        <td class="border p-2">{{ exp.company || '-' }}</td>
                        <td class="border p-2">{{ formatDate(exp.signOn) }}</td>
                        <td class="border p-2">{{ formatDate(exp.signOff) }}</td>
                        <td class="border p-2">{{ exp.signOffReason || '-' }}</td>
                    </tr>
                    <tr v-if="!experiences || experiences.length === 0">
                        <td colspan="13" class="border p-2 text-center">No experience available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>