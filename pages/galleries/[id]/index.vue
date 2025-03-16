<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useGalleryStore } from '@/stores/gallery';
import 'vue3-quill/lib/vue3-quill.css';

useHead({ title: 'Gallery Details' });

const route = useRoute()
const appStore = useAppStore();
const galleryStore = useGalleryStore()

const { gallery, loading, message, errors } = storeToRefs(galleryStore)
const { fetchGallery } = galleryStore

onMounted(async () => {
    appStore.loadingStart()
    await fetchGallery(route.params.id)
    appStore.loadingEnd()
});

const quillOptions = ref({
    modules: {
        toolbar: [],
    },
    placeholder: '',
    readonly: true
});
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">
                    Gallery Details: {{ gallery?.title }}
                </h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <NuxtLink :to="`/galleries/${route.params.id}/edit`" class="hover:text-info">
                        <icon-edit class="w-5 h-5" />
                    </NuxtLink>
                </div>
            </div>

            <div class="mb-5">
                <div class="space-y-5">
                    <div class="flex flex-col sm:flex-row">
                        <label for="id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">ID</label>
                        <p id="id">{{ gallery?.id }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Title</label>
                        <p id="title">{{ gallery?.title }}</p>
                    </div>
                    <!-- <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Description</label>
                        <p id="title">{{ gallery?.description }}</p>
                    </div> -->
                    <div class="flex flex-col sm:flex-row">
                        <label for="email" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Image</label>
                        <div class="pt-1">
                            <img :src="gallery?.image" :alt="gallery?.title" class="h-24">
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Content</label>
                        <div class="flex-grow">
                            <div>
                                <client-only>
                                    <quillEditor ref="editor1" v-model:value="gallery.content" :options="quillOptions" disabled></quillEditor>
                                </client-only>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SectionMain>
</template>
