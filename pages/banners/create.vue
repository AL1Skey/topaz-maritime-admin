<script setup>
import { storeToRefs } from 'pinia';
import { useBannerStore } from '@/stores/banner';

useHead({ title: 'Create Banner' });

const router = useRouter()
const bannerStore = useBannerStore()

const { loading, message, errors } = storeToRefs(bannerStore)
const { createBanner } = bannerStore

const formData = reactive({
    name: '',
    description: '',
    image: null,
})

const submit = async () => {
    let data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image);

    if (await createBanner(data)) {
        router.push('/banners')
    }
}

onMounted(async () => {
    const fileupload = await import('file-upload-with-preview');
    let FileUploadWithPreview = fileupload.default;

    // single image upload
    new FileUploadWithPreview('image', {
        images: {
            baseImage: '/assets/images/file-preview.svg',
            backgroundImage: '',
        },
    });
});

const handleFileUpload = (e) => {
    formData.image = e.target.files[0]
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">Create Banner</h5>

            <div class="mb-5">
                <form class="space-y-5" @submit.prevent="submit">
                    <div :class="{ 'has-error': errors?.name }" class="flex flex-col sm:flex-row">
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

                    <div :class="{ 'has-error': errors?.image }" class="flex flex-col sm:flex-row">
                        <label for="image" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Image</label>
                        <div class="flex-grow">
                            <div class="custom-file-container" data-upload-id="image">
                                <div class="label-container">
                                    <label>Upload </label>
                                    <a href="javascript:;" class="custom-file-container__image-clear" title="Clear Image">×</a>
                                </div>
                                <label class="custom-file-container__custom-file">
                                    <input type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*" @input="handleFileUpload" />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <span class="custom-file-container__custom-file__custom-file-control ltr:pr-20 rtl:pl-20"></span>
                                </label>

                                <template v-if="errors?.image">
                                <p class="text-danger mt-1" v-for="error in errors.image">{{error}}</p>
                                </template>
                                <div class="custom-file-container__image-preview"></div>
                            </div>
                        </div>
                    </div>

                    <ButtonForm :loading="loading" cancel-to="/banners" />
                </form>
            </div>
        </div>
    </SectionMain>
</template>
