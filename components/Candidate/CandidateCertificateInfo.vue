<script setup>
defineProps({
    candidate: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="panel">
        <h6 class="mb-4 text-base font-semibold">Certificate Information</h6>
        <div class="space-y-3">
            <div class="flex">
                <span class="w-1/3 font-semibold">Certificate ID:</span>
                <span>{{ candidate.certificateId }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Certificate No:</span>
                <span>{{ candidate.certificateNo }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Status:</span>
                <span>{{ candidate.certificateStatusId }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Issued By:</span>
                <span>{{ candidate.certificateIssued }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Issue Date:</span>
                <span>{{ new Date(candidate.certificateIssuedDate).toLocaleDateString() }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Expiry Date:</span>
                <span>{{ new Date(candidate.certificateExpiryDate).toLocaleDateString() }}</span>
            </div>
            <div v-if="candidate.certificateDoc?.url" class="flex">
                <span class="w-1/3 font-semibold">Document:</span>
                <a :href="candidate.certificateDoc.url" target="_blank" class="text-primary hover:underline">
                    View Document
                </a>
            </div>
        </div>
    </div>
</template>