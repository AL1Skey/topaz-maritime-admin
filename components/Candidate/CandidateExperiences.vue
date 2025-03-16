<script setup>
defineProps({
    experiences: {
        type: Array,
        default: () => []
    }
});
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
                        <th class="border p-2">Owner</th>
                        <th class="border p-2">Sign On</th>
                        <th class="border p-2">Sign Off</th>
                        <th class="border p-2">Reason</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(exp, index) in experiences" :key="index">
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
                    <tr v-if="!experiences || experiences.length === 0">
                        <td colspan="11" class="border p-2 text-center">No experience available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>