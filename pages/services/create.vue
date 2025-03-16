<script setup>
import { storeToRefs } from 'pinia';
import { useServiceStore } from '@/stores/service';

useHead({ title: 'Create Service' });

const router = useRouter()
const serviceStore = useServiceStore()

const { loading, message, errors } = storeToRefs(serviceStore)
const { createService } = serviceStore

const formData = reactive({
    name: '',
    description: '',
    icon: '',
})

const submit = async () => {
    if (await createService(formData)) {
        router.push('/services')
    }
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Create Service
            </h5>

            <div class="mb-5">
                <form class="space-y-5" @submit.prevent="submit">
                    <div :class="{ 'has-error': errors?.title }" class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Title</label>
                        <div class="flex-grow">
                            <input v-model="formData.title" id="title" type="text" placeholder="Enter Name" class="form-input flex-1" required />
                            <template v-if="errors?.title">
                                <p class="text-danger mt-1" v-for="error in errors.title">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <div :class="{ 'has-error': errors?.description }" class="flex flex-col sm:flex-row">
                        <label for="description" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Description</label>
                        <div class="flex-grow">
                            <textarea v-model="formData.description" id="ctnTextarea" rows="3" class="form-textarea" placeholder="Enter Textarea" required></textarea>
                            <template v-if="errors?.description">
                                <p class="text-danger mt-1" v-for="error in errors.description">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <div :class="{ 'has-error': errors?.icon }" class="flex flex-col sm:flex-row">
                        <label for="icon" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Icon</label>
                        <div class="flex-grow">
                            <input v-model="formData.icon" id="icon" type="text" placeholder="Enter Name" class="form-input flex-1" required />
                            <template v-if="errors?.icon">
                                <p class="text-danger mt-1" v-for="error in errors.icon">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <ButtonForm :loading="loading" cancel-to="/services" />
                </form>
            </div>
        </div>
    </SectionMain>
</template>
