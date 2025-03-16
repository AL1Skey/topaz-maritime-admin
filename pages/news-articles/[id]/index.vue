<script setup>
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useNewsArticleStore } from '@/stores/newsArticle';
import 'vue3-quill/lib/vue3-quill.css';
import { formatDate } from '@vueuse/core';
import Vue3Datatable from '@bhplugin/vue3-datatable';

useHead({ title: 'News Article Details' });

const route = useRoute()
const appStore = useAppStore();
const newsArticleStore = useNewsArticleStore()

const { newsArticle, loading, message, errors } = storeToRefs(newsArticleStore)
const { fetchNewsArticle, deleteNewsArticlePdf } = newsArticleStore

onMounted(async () => {
    appStore.loadingStart()
    await fetchNewsArticle(route.params.id)
    appStore.loadingEnd()
});

const quillOptions = ref({
    modules: {
        toolbar: [],
    },
    placeholder: '',
    readonly: true
});

// const galleriesCols = ref([
//     { field: 'id', title: 'ID', isUnique: true },
//     { field: 'image', title: 'Image' },
//     { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
// ]) || [];

// const galleries = ref([
//     { id: 1, image: 'image.png'},
//     { id: 2, image: 'image.png'},
// ])

// const isModalAddGalleryActive = ref(false)

// const isModalDeletePdfActive = ref(false);
// const openModalDeletePdf = () => {
//     isModalDeletePdfActive.value = true
// }
// const confirmDelete = async () => {
//     await deleteNewsArticlePdf(newsArticle.value.id)
// }
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">
                    News Article Details: {{ newsArticle?.title }}
                </h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <NuxtLink :to="`/news-articles/${route.params.id}/edit`" class="hover:text-info">
                        <icon-edit class="w-5 h-5" />
                    </NuxtLink>
                </div>
            </div>

            <div class="mb-5">
                <div class="space-y-5">
                    <div class="flex flex-col sm:flex-row">
                        <label for="id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">ID</label>
                        <p id="id">{{ newsArticle?.id }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Title</label>
                        <p id="title">{{ newsArticle?.title }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Published At</label>
                        <p id="title">{{ formatDate(new Date(newsArticle?.published_at), 'YYYY-MM-DD') }}</p>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="email" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Image</label>
                        <div class="pt-1">
                            <img :src="newsArticle?.image" :alt="newsArticle?.title" class="h-24">
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="pdf" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">PDF</label>
                        <div id="pdf">
                            <p v-if="newsArticle?.pdf" class="hover:text-primary underline">
                                <NuxtLink :to="newsArticle?.pdf" target="_blank">
                                    {{ newsArticle?.pdf_filename }}
                                </NuxtLink>
                            </p>
                            <p v-else>-</p>
                            <!-- <button
                                v-if="newsArticle?.pdf"
                                @click="openModalDeletePdf"
                                type="button"
                                class="btn btn-danger mt-3"
                            >
                                Delete PDF
                            </button> -->
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row">
                        <label for="title" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Content</label>
                        <div class="flex-grow">
                            <div>
                                <client-only>
                                    <quillEditor ref="editor1" v-model:value="newsArticle.content" :options="quillOptions" disabled></quillEditor>
                                </client-only>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Modal -->
        <!-- <client-only>
            <ModalDelete
                v-model="isModalDeletePdfActive"
                title="Please Confirm"
                confirmLabel="Delete"
                @confirm="confirmDelete"
            >
                <p>Are you sure you want to delete <span class="font-bold">{{ newsArticle?.pdf_filename }}</span>?</p>
            </ModalDelete>
        </client-only> -->

    </SectionMain>
</template>
