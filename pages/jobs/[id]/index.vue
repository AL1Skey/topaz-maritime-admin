<script setup>
import { storeToRefs } from 'pinia';
import { useJobStore } from '@/stores/job';
import { useAppStore } from '@/stores/index';

import 'vue3-quill/lib/vue3-quill.css';

import { formatDate } from '@vueuse/core';

useHead({ title: 'Job Details' });

const route = useRoute()
const appStore = useAppStore();
const jobStore = useJobStore()

const { job, loading, message, errors } = storeToRefs(jobStore)
const { fetchJob } = jobStore

const quillOptions = ref({
    modules: {
        toolbar: [],
    },
    placeholder: '',
    readonly: true
});

onMounted(async () => {
    appStore.loadingStart()
    await fetchJob(route.params.id)
    appStore.loadingEnd()
});
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">
                Job Details: {{ job?.title }}
            </h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <NuxtLink :to="`/jobs/${route.params.id}/edit`" class="hover:text-info">
                        <icon-edit class="w-5 h-5" />
                    </NuxtLink>
                </div>
            </div>

            <div class="mb-5">
                <div class="space-y-5">
                    <div class="flex flex-col sm:flex-row">
                        <label for="id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">ID</label>
                        <p id="id">{{ job?.id }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Title</label>
                        <p id="title">{{ job?.title }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Job Category</label>
                        <p id="title">{{ job?.job_category.name }}</p>
                    </div>
                    <!-- <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Company</label>
                        <p id="title">{{ job?.company.name }}</p>
                    </div> -->
                    <!-- <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Position</label>
                        <p id="title">{{ job?.position }}</p>
                    </div> -->
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Start At</label>
                        <p id="title">{{ formatDate(new Date(job?.start_at), 'YYYY-MM-DD') }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">End At</label>
                        <p id="title">{{ formatDate(new Date(job?.end_at), 'YYYY-MM-DD') }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Published At</label>
                        <p id="title">{{ formatDate(new Date(job?.published_at), 'YYYY-MM-DD') }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="email" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Image</label>
                        <div class="pt-1">
                            <img v-if="job?.image" :src="job?.image" :alt="job?.title" class="h-24">
                            <p v-else>No image</p>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Content</label>
                        <div class="flex-grow">
                            <div>
                                <client-only>
                                    <quillEditor ref="editor1" v-model:value="job.content" :options="quillOptions" disabled></quillEditor>
                                </client-only>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SectionMain>
</template>
