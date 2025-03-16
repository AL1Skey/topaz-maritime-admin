<script setup>
import { storeToRefs } from 'pinia';
import { useCompanyStore } from '@/stores/company';

const router = useRouter()
const companyStore = useCompanyStore()

const { loading, message, errors } = storeToRefs(companyStore)
const { createCompany } = companyStore

const formData = reactive({
    name: '',
    logo: '',
})

const submit = async () => {
    let data = new FormData();
    data.append('name', formData.name);
    data.append('logo', formData.logo);

    if (await createCompany(data)) {
        router.push('/companies')
    }
}

onMounted(async () => {
    const fileupload = await import('file-upload-with-preview');
    let FileUploadWithPreview = fileupload.default;

    // single image upload
    new FileUploadWithPreview('logo', {
        images: {
            baseImage: '/assets/images/file-preview.svg',
            backgroundImage: '',
        },
    });
});

const handleFileUpload = (e) => {
    formData.logo = e.target.files[0]
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">
                Create Company
            </h5>

            <div class="mb-5">
                <form class="space-y-5" @submit.prevent="submit">
                    <div :class="{ 'has-error': errors?.name }" class="flex flex-col sm:flex-row">
                        <label for="name" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Name <span class="text-danger">*</span></label>
                        <div class="flex-grow">
                            <input v-model="formData.name" id="name" type="text" placeholder="Enter Name" class="form-input flex-1" />
                            <template v-if="errors?.name">
                                <p class="text-danger mt-1" v-for="error in errors.name">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <div :class="{ 'has-error': errors?.logo }" class="flex flex-col sm:flex-row">
                        <label for="logo" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Logo</label>
                        <div class="flex-grow">
                            <div class="custom-file-container" data-upload-id="logo">
                                <div class="label-container">
                                    <label>Upload </label>
                                    <a href="javascript:;" class="custom-file-container__image-clear" title="Clear Image">×</a>
                                </div>
                                <label class="custom-file-container__custom-file">
                                    <input type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*" @input="handleFileUpload" />
                                    <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                    <span class="custom-file-container__custom-file__custom-file-control ltr:pr-20 rtl:pl-20"></span>
                                </label>

                                <template v-if="errors?.logo">
                                <p class="text-danger mt-1" v-for="error in errors.logo">{{error}}</p>
                                </template>
                                <div class="custom-file-container__image-preview"></div>
                            </div>
                        </div>
                    </div>

                    <ButtonForm :loading="loading" cancel-to="/companies" />
                </form>
            </div>
        </div>
    </SectionMain>
</template>
