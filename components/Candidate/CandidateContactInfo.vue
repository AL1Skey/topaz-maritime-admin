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
        <h6 class="mb-4 text-base font-semibold">Contact Information</h6>
        <div class="space-y-3">
            <div class="flex">
                <span class="w-1/3 font-semibold">Address:</span>
                <span class="whitespace-pre-line">{{ candidate.address }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">City:</span>
                <span>{{ candidate.city }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Zip Code:</span>
                <span>{{ candidate.zipCode }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Country:</span>
                <span>{{ candidate.countryId }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Phone:</span>
                <span>{{ candidate.phoneNo }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Mobile:</span>
                <span>{{ candidate.handPhone }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Email:</span>
                <span>{{ candidate.email }}</span>
            </div>
        </div>
    </div>
</template>