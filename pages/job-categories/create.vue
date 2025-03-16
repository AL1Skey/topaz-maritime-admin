<script setup>
import { storeToRefs } from 'pinia';
import { useJobCategoryStore } from '@/stores/jobCategory';

useHead({ title: 'Create Job Category' });

const router = useRouter()
const jobCategoryStore = useJobCategoryStore()

const { loading, message, errors } = storeToRefs(jobCategoryStore)
const { createJobCategory } = jobCategoryStore

const formData = reactive({
    name: '',
})

const submit = async () => {
    let data = new FormData()
    data.append('name', formData.name)

    if (await createJobCategory(data)) {
        router.push('/job-categories')
    }
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Create Job Category
            </h5>

            <div class="mb-5">
                <form class="space-y-5" @submit.prevent="submit">
                    <div :class="{ 'has-error': errors?.name }" class="flex flex-col sm:flex-row">
                        <label for="name" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Name</label>
                        <div class="flex-grow">
                            <input v-model="formData.name" id="name" type="text" placeholder="Enter Name" class="form-input flex-1" required />
                            <template v-if="errors?.name">
                                <p class="text-danger mt-1" v-for="error in errors.name">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <ButtonForm :loading="loading" cancel-to="/job-categories" />
                </form>
            </div>
        </div>
    </SectionMain>
</template>
