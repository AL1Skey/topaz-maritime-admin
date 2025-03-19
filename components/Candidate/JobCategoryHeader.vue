<script setup>
defineProps({
    jobCategory: {
        type: Object,
        default: () => ({})
    },
    allJobCategories: {
        type: Array,
        default: () => []
    },
    selectedCategoryId: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['category-change']);

const handleCategoryChange = (event) => {
    emit('category-change', event);
};
</script>

<template>
    <div class="mt-6">
        <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
            {{ selectedCategoryId ? (jobCategory?.name || 'Loading...') : 'All Candidates' }}
        </h5>

        <div class="mb-5">
            <div class="space-y-5">
                <!-- Add dropdown for job categories -->
                <div class="flex flex-col sm:flex-row">
                    <label for="category" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Category</label>
                    <select 
                        id="category" 
                        :value="selectedCategoryId" 
                        @change="handleCategoryChange"
                        class="form-select"
                    >
                        <option v-for="category in allJobCategories" :key="category.id" :value="category.id">
                            {{ category.name }}
                        </option>
                    </select>
                </div>
                <!-- <div class="flex flex-col sm:flex-row">
                    <label for="id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">ID</label>
                    <p id="id">{{ jobCategory?.id }}</p>
                </div> -->
                <!-- <div class="flex flex-col sm:flex-row">
                    <label for="name" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Name</label>
                    <p id="name">{{ jobCategory?.name }}</p>
                </div> -->
            </div>
        </div>
    </div>
</template>