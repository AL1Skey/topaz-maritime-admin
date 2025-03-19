<script setup lang="ts">
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/stores/index';
import { useNewsArticleStore } from '@/stores/newsArticle';

import { storeToRefs } from 'pinia';
import { refDebounced } from '@vueuse/core';

useHead({ title: 'News Article' });

const appStore = useAppStore();
const newsArticleStore = useNewsArticleStore()

const { newsArticles, newsArticlesMeta, newsArticle, isModalDeleteActive, loading, } = storeToRefs(newsArticleStore)
const { fetchNewsArticles, deleteNewsArticle, openModalDelete } = newsArticleStore

onMounted(() => {
    nextTick(() => {
        window.dispatchEvent(new Event('resize'));
    });
});

onMounted(async () => {
    appStore.loadingStart()
    await fetchNewsArticles(params)
    console.log("🚀 | newsArticles:", newsArticles.value)
    appStore.loadingEnd()
});

// multi language
// const i18n = reactive(useI18n());
// console.log("🚀 | i18n:", i18n.messages[i18n.locale])


const cols = ref([
    // { field: 'id', title: 'ID', isUnique: true },
    { field: 'image', title: 'Image' },
    { field: 'title', title: 'Title' },
    { field: 'pdf', title: 'PDF' },
    { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
]) || [];

const params = reactive({
    page: 1,
    per_page: 10,
    search: '',
});

const search = ref(params.search)
const debouncedSearch = refDebounced(search, 500)
watch(debouncedSearch, () => {
    params.search = search.value
})

const changeServer = async (data: any) => {
    params.page = data.current_page;
    params.per_page = data.pagesize;

    await fetchNewsArticles(params)
};

const confirmDelete = async () => {
    await deleteNewsArticle(newsArticle.value!.id)
    await fetchNewsArticles(params)
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6 px-0">
            <h5 class="mb-5 px-5 text-lg font-semibold dark:text-white-light">News Articles</h5>

            <div class="datatable invoice-table">
                <div class="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                    <div class="mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                    <div class="flex items-center gap-2">
                        <NuxtLink to="/news-articles/create" class="btn btn-primary gap-2">
                            <!-- <icon-plus /> -->
                            Create News Article
                        </NuxtLink>
                    </div>
                </div>

                <vue3-datatable
                    :rows="newsArticles"
                    :columns="cols"
                    :loading="loading"
                    :totalRows="newsArticlesMeta?.total"
                    :isServerMode="true"
                    :sortable="false"
                    :pagination="true"
                    :search="params.search"
                    :pageSizeOptions="[10, 20, 30]"
                    @change="changeServer"
                    skin="whitespace-nowrap bh-table-hover"
                >
                    <template #id="data">
                        <strong class="text-info">#{{ data.value.id }}</strong>
                    </template>
                    <template #image="data">
                        <img :src="data.value.image" class="h-9 max-w-none" :alt="data.value.title" />
                    </template>
                    <template #title="data">
                        <div class="font-semibold">{{ data.value.title }}</div>
                    </template>
                    <template #pdf="data">
                        <div v-if="data.value.pdf" class="font-semibold">{{ data.value.pdf_filename }}</div>
                        <div v-else class="font-semibold">-</div>
                    </template>
                    <template #actions="data">
                        <div class="flex items-center justify-center gap-4">
                            <NuxtLink :to="`/news-articles/${data.value.id}`" class="hover:text-primary">
                                <icon-eye />
                            </NuxtLink>
                            <NuxtLink :to="`/news-articles/${data.value.id}/edit`" class="hover:text-info">
                                <icon-edit class="w-4.5 h-4.5" />
                            </NuxtLink>
                            <button type="button" class="hover:text-danger" @click="openModalDelete(data.value)">
                                <icon-trash-lines />
                            </button>
                        </div>
                    </template>
                </vue3-datatable>
            </div>
        </div>

        <!-- Modal -->
        <client-only>
            <ModalDelete
                v-model="isModalDeleteActive"
                title="Please Confirm"
                confirmLabel="Delete"
                @confirm="confirmDelete"
            >
                <p>News article: <span class="font-bold">{{ newsArticle?.title }}</span></p>
                <p>Are you sure you want to permanently delete this news article?</p>
            </ModalDelete>
        </client-only>
    </SectionMain>
</template>
