<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useServiceStore } from '@/stores/service';

useHead({ title: 'Update Service' });

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const serviceStore = useServiceStore()

const { service, loading, message, errors } = storeToRefs(serviceStore)
const { updateService, fetchService } = serviceStore

const formData = reactive({
    name: '',
    description: '',
    icon: '',
})

const submit = async () => {
    let data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('icon', formData.icon);
    data.append('_method', 'put');

    if (await updateService(route.params.id, data)) {
        router.push('/services')
    }
}

onMounted(async () => {
    appStore.loadingStart()
    await fetchService(route.params.id)
    appStore.loadingEnd()

    formData.title = service.value.title
    formData.description = service.value.description
    formData.icon = service.value.icon
});
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Update Service: {{ service?.title }}
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
