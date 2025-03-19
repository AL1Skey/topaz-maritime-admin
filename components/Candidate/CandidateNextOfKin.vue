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
        <h6 class="mb-4 text-base font-semibold">Next of Kin</h6>
        <div class="space-y-3">
            <div class="flex">
                <span class="w-1/3 font-semibold">Name:</span>
                <span>{{ candidate.nextOfKinName || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Address:</span>
                <span class="whitespace-pre-line">{{ candidate.nextOfKinAddress || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">City:</span>
                <span>{{ candidate.nextOfKinCity || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Zip Code:</span>
                <span>{{ candidate.nextOfKinZipCode || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Phone:</span>
                <span>{{ candidate.nextOfKinPhone || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Relationship:</span>
                <span>{{ candidate.relationship || '-' }}</span>
            </div>
        </div>
    </div>
</template>