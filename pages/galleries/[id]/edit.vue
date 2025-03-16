<script setup>
import { storeToRefs } from 'pinia';
import { useGalleryStore } from '@/stores/gallery';
import { useAppStore } from '@/stores/index';
import 'vue3-quill/lib/vue3-quill.css';
// import flatPickr from 'vue-flatpickr-component';
// import 'flatpickr/dist/flatpickr.css';

useHead({ title: 'Update Gallery' });

const router = useRouter()
const route = useRoute()
const appStore = useAppStore();
const galleryStore = useGalleryStore()

const { gallery, loading, message, errors } = storeToRefs(galleryStore)
const { updateGallery, fetchGallery } = galleryStore

const formData = reactive({
    title: '',
    // description: '',
    content: '',
    image: null,
    // published_at: null,
})

// const dateTime = ref({
//     enableTime: true,
//     dateFormat: 'Y-m-d H:i:S',
// });

const quillOptions = ref({
    modules: {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
        ],
    },
    placeholder: '',
});

const submit = async () => {
    let data = new FormData();
    data.append('title', formData.title);
    // data.append('description', formData.description);
    data.append('content', formData.content);
    if (formData.image) {
        data.append('image', formData.image);
    }
    // data.append('published_at', formData.published_at);
    data.append('_method', 'put');

    if (await updateGallery(route.params.id, data)) {
        router.push('/galleries')
    }
}

onMounted(async () => {
    appStore.loadingStart()
    await fetchGallery(route.params.id)
    appStore.loadingEnd()

    formData.title = gallery.value.title
    formData.description = gallery.value.description
    formData.content = gallery.value.content

    const fileupload = await import('file-upload-with-preview');
    let FileUploadWithPreview = fileupload.default;

    // single image upload
    new FileUploadWithPreview('image', {
        images: {
            baseImage: gallery.value.image,
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
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Update Gallery: {{ gallery?.title }}
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

                    <!-- <div :class="{ 'has-error': errors?.description }" class="flex flex-col sm:flex-row">
                        <label for="description" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Description</label>
                        <div class="flex-grow">
                            <textarea v-model="formData.description" id="ctnTextarea" rows="3" class="form-textarea" placeholder="Enter Textarea" required></textarea>
                            <template v-if="errors?.description">
                                <p class="text-danger mt-1" v-for="error in errors.description">{{error}}</p>
                            </template>
                        </div>
                    </div> -->

                    <!-- {{ formData.published_at }}
                    <div :class="{ 'has-error': errors?.published_at }" class="flex flex-col sm:flex-row">
                        <label for="published_at" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Published Date</label>
                        <div class="flex-grow">
                            <flat-pickr v-model="formData.published_at" class="form-input" :config="dateTime"></flat-pickr>
                            <template v-if="errors?.published_at">
                                <p class="text-danger mt-1" v-for="error in errors.published_at">{{error}}</p>
                            </template>
                        </div>
                    </div> -->


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


                    <div :class="{ 'has-error': errors?.content }" class="flex flex-col sm:flex-row">
                        <label for="content" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Content</label>
                        <div class="flex-grow">
                            <div>
                                <client-only>
                                    <quillEditor ref="editor1" v-model:value="formData.content" :options="quillOptions" style="min-height: 200px"></quillEditor>
                                </client-only>
                            </div>
                            <template v-if="errors?.content">
                                <p class="text-danger mt-1" v-for="error in errors.content">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <ButtonForm :loading="loading" cancel-to="/galleries" />
                </form>
            </div>
        </div>
    </SectionMain>
</template>
