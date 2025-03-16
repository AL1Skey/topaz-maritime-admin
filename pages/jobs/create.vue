<script setup>
import { storeToRefs } from 'pinia';
import { useJobStore } from '@/stores/job';
import { useAppStore } from '@/stores/index';
import { useJobCategoryStore } from '@/stores/jobCategory';
import { useCompanyStore } from '@/stores/company';

import 'vue3-quill/lib/vue3-quill.css';

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';

import { refDebounced, formatDate } from '@vueuse/core';

useHead({ title: 'Create Job' });

const router = useRouter()
const store = useAppStore();
const jobStore = useJobStore()
const jobCategoryStore = useJobCategoryStore()
const companyStore = useCompanyStore()

const { loading, message, errors } = storeToRefs(jobStore)
const { createJob } = jobStore

const { jobCategories } = storeToRefs(jobCategoryStore)
const { fetchJobCategories } = jobCategoryStore

// const { companies } = storeToRefs(companyStore)
// const { fetchCompanies } = companyStore

const formData = reactive({
    title: '',
    // position: '',
    content: '',
    image: null,
    start_at: null,
    end_at: null,
    published_at: formatDate(new Date(), 'YYYY-MM-DD'),
    // company: null,
    job_category: null,
})

const dateConfig = ref({
    // enableTime: true,
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
    if (formData.job_category) {
        data.append('job_category_id', formData.job_category.id);
    }
    // if (formData.company) {
    //     data.append('company_id', formData.company?.id);
    // }
    // data.append('position', formData.position);
    data.append('content', formData.content);
    if (formData.image) {
        data.append('image', formData.image);
    }
    data.append('start_at', formData.start_at);
    data.append('end_at', formData.end_at);
    data.append('published_at', formData.published_at);

    if (await createJob(data)) {
        router.push('/jobs')
    }
}

onMounted(async () => {
    await fetchJobCategories()

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

// const paramsCompany = reactive({
//     // page: 1,
//     // per_page: 10,
//     search: '',
// });
// const searchCompany = ref('')
// const debouncedSearchCompany = refDebounced(searchCompany, 500)
// watch(debouncedSearchCompany, async () => {
//     paramsCompany.search = searchCompany.value
//     await fetchCompanies(paramsCompany)
// })
// const asyncFindCompany = async (query) => {
//     searchCompany.value = query
// }
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Create Job
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

                    <!-- <div :class="{ 'has-error': errors?.company_id }" class="flex flex-col sm:flex-row">
                        <label for="job_category" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Company</label>
                        <div class="flex-grow">
                            <div class="">
                                <client-only>
                                    <multiselect
                                        v-model="formData.company"
                                        :clear-on-select="false"
                                        :close-on-select="true"
                                        :internal-search="false"
                                        :loading="companyStore.loading"
                                        :max-height="600"
                                        :multiple="false"
                                        :options-limit="300"
                                        :options="companies"
                                        :searchable="true"
                                        :show-no-results="true"
                                        @search-change="asyncFindCompany"
                                        id="company"
                                        label="name"
                                        open-direction="bottom"
                                        placeholder="Type to search"
                                        track-by="id"
                                    ></multiselect>
                                </client-only>
                            </div>
                            <template v-if="errors?.company_id">
                                <p class="text-danger mt-1" v-for="error in errors.company_id">{{error}}</p>
                            </template>
                        </div>
                    </div> -->

                    <div :class="{ 'has-error': errors?.job_category_id }" class="flex flex-col sm:flex-row">
                        <label for="job_category_id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Job Category</label>
                        <div class="flex-grow">
                            <div class="">
                                <client-only>
                                    <multiselect
                                        v-model="formData.job_category"
                                        :options="jobCategories"
                                        track-by="id"
                                        label="name"
                                        class="custom-multiselect"
                                        :searchable="false"
                                        :preselect-first="true"
                                        :allow-empty="false"
                                        selected-label=""
                                        select-label=""
                                        deselect-label=""
                                    ></multiselect>
                                </client-only>
                            </div>
                            <template v-if="errors?.job_category_id">
                                <p class="text-danger mt-1" v-for="error in errors.job_category_id">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <!-- <div :class="{ 'has-error': errors?.position }" class="flex flex-col sm:flex-row">
                        <label for="position" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Position</label>
                        <div class="flex-grow">
                            <input v-model="formData.position" id="position" type="text" placeholder="Position" class="form-input flex-1" required />
                            <template v-if="errors?.position">
                                <p class="text-danger mt-1" v-for="error in errors.position">{{error}}</p>
                            </template>
                        </div>
                    </div> -->

                    <div :class="{ 'has-error': errors?.start_at }" class="flex flex-col sm:flex-row">
                        <label for="start_at" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Start Date</label>
                        <div class="flex-grow">
                            <flat-pickr v-model="formData.start_at" class="form-input" :config="dateConfig"></flat-pickr>
                            <template v-if="errors?.start_at">
                                <p class="text-danger mt-1" v-for="error in errors.start_at">{{error}}</p>
                            </template>
                        </div>
                    </div>
                    <div :class="{ 'has-error': errors?.end_at }" class="flex flex-col sm:flex-row">
                        <label for="end_at" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">End Date</label>
                        <div class="flex-grow">
                            <flat-pickr v-model="formData.end_at" class="form-input" :config="dateConfig"></flat-pickr>
                            <template v-if="errors?.end_at">
                                <p class="text-danger mt-1" v-for="error in errors.end_at">{{error}}</p>
                            </template>
                        </div>
                    </div>
                    <div :class="{ 'has-error': errors?.published_at }" class="flex flex-col sm:flex-row">
                        <label for="published_at" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Published Date</label>
                        <div class="flex-grow">
                            <flat-pickr v-model="formData.published_at" class="form-input" :config="dateConfig"></flat-pickr>
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

                    <ButtonForm :loading="loading" cancel-to="/jobs" />
                </form>
            </div>
        </div>
    </SectionMain>
</template>
