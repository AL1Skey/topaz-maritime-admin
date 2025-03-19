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
        <h6 class="mb-4 text-base font-semibold">Physical Information</h6>
        <div class="space-y-3">
            <div class="flex">
                <span class="w-1/3 font-semibold">Height:</span>
                <span>{{ candidate.height || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Weight:</span>
                <span>{{ candidate.weight || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">White Shirt:</span>
                <span>{{ candidate.whiteShirt || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Blue Pants:</span>
                <span>{{ candidate.bluePants || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Overall:</span>
                <span>{{ candidate.overall || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Safety Shoes:</span>
                <span>{{ candidate.safetyShoes || '-' }}</span>
            </div>
            <div class="flex">
                <span class="w-1/3 font-semibold">Winter Jacket:</span>
                <span>{{ candidate.winterJacket || '-' }}</span>
            </div>
        </div>
    </div>
</template>