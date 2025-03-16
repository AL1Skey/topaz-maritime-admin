<script setup>
defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    cancelTo: {
        type: String,
        default: undefined
    }
})
</script>

<template>
    <div class="flex gap-3 !mt-6">
        <button type="submit" class="btn btn-primary" :disabled="loading">
            Submit
            <span v-if="loading" class="animate-spin border-2 border-white border-l-transparent rounded-full w-4 h-4 ltr:ml-4 rtl:mr-4 inline-block align-middle"></span>
        </button>
        <NuxtLink v-if="cancelTo" :to="cancelTo" class="btn btn-outline-dark">
            Cancel
        </NuxtLink>
    </div>
</template>