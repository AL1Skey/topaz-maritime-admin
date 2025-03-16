<script setup>
import { storeToRefs } from 'pinia';
import { useNewsArticleStore } from '@/stores/newsArticle';
import { useAppStore } from '@/stores/index';
import 'vue3-quill/lib/vue3-quill.css';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { formatDate } from '@vueuse/core';

useHead({ title: 'Create News Article' });

const router = useRouter()
const newsArticleStore = useNewsArticleStore()
const store = useAppStore();

const { loading, message, errors } = storeToRefs(newsArticleStore)
const { createNewsArticle } = newsArticleStore

const formData = reactive({
    title: '',
    content: '',
    image: null,
    pdf: null,
    pdf_filename: '',
    published_at: formatDate(new Date(), 'YYYY-MM-DD'),
})

const dateTime = ref({
    // enableTime: true,
    // dateFormat: 'Y-m-d H:i:S',
    dateFormat: 'Y-m-d',
});

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
    data.append('content', formData.content);
    if (formData.image) {
        data.append('image', formData.image);
    }
    if (formData.pdf) {
        data.append('pdf', formData.pdf);
    }
    if (formData.pdf_filename) {
        data.append('pdf_filename', formData.pdf_filename);
    }
    data.append('published_at', formData.published_at);

    if (await createNewsArticle(data)) {
        router.push('/news-articles')
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

const handleImageUpload = (e) => {
    formData.image = e.target.files[0]
}

const handlePdfUpload = (e) => {
    formData.pdf = e.target.files[0]
    formData.pdf_filename = e.target.files[0].name
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Create News Article
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

                    <div :class="{ 'has-error': errors?.published_at }" class="flex flex-col sm:flex-row">
                        <label for="published_at" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Published Date</label>
                        <div class="flex-grow">
                            <flat-pickr v-model="formData.published_at" class="form-input" :config="dateTime"></flat-pickr>
                            <template v-if="errors?.published_at">
                                <p class="text-danger mt-1" v-for="error in errors.published_at">{{error}}</p>
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
                                    <input type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*" @input="handleImageUpload" />
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



                    <div :class="{ 'has-error': errors?.pdf }" class="flex flex-col sm:flex-row">
                        <label for="pdf" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">PDF</label>
                        <div class="flex-grow">
                            <input
                                id="pdf"
                                class="form-input file:py-2 file:px-4 file:border-0 file:font-semibold p-0 file:bg-primary/90 ltr:file:mr-5 rtl:file:ml-5 file:text-white file:hover:bg-primary"
                                type="file"
                                @input="handlePdfUpload"
                            />
                            <template v-if="errors?.pdf">
                                <p class="text-danger mt-1" v-for="error in errors.pdf">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <div :class="{ 'has-error': errors?.pdf_filename }" class="flex flex-col sm:flex-row">
                        <label for="pdf_filename" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">PDF Filename</label>
                        <div class="flex-grow">
                            <input v-model="formData.pdf_filename" id="pdf_filename" type="text" placeholder="Enter Name" class="form-input flex-1" />
                            <!-- <p class="text-gray-500 mt-1">You can rename the pdf filename</p> -->
                            <template v-if="errors?.pdf_filename">
                                <p class="text-danger mt-1" v-for="error in errors.pdf_filename">{{error}}</p>
                            </template>
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

                    <ButtonForm :loading="loading" cancel-to="/news-articles" />
                </form>
            </div>
        </div>
    </SectionMain>
</template>
