<script setup lang="ts">
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useAppStore } from '@/stores/index';
import { useGalleryStore } from '@/stores/gallery';
import { storeToRefs } from 'pinia';
import { refDebounced } from '@vueuse/core';

useHead({ title: 'Galleries' });

const appStore = useAppStore();
const galleryStore = useGalleryStore()

const {
    galleries,
    galleriesMeta,
    gallery,
    isModalDeleteActive,
    loading,
} = storeToRefs(galleryStore)

const { fetchGallerys, deleteGallery, openModalDelete } = galleryStore

onMounted(() => {
    nextTick(() => {
        window.dispatchEvent(new Event('resize'));
    });
});

onMounted(async () => {
    appStore.loadingStart()
    await fetchGallerys(params)
    appStore.loadingEnd()
});

const cols = ref([
    // { field: 'id', title: 'ID', isUnique: true },
    { field: 'image', title: 'Image' },
    { field: 'title', title: 'Title' },
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

    await fetchGallerys(params)
};

const confirmDelete = async () => {
    await deleteGallery(gallery.value!.id)
    await fetchGallerys(params)
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6 px-0">
            <h5 class="mb-5 px-5 text-lg font-semibold dark:text-white-light">Galleries</h5>

            <div class="datatable invoice-table">
                <div class="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                    <div class="mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                    <div class="flex items-center gap-2">
                        <NuxtLink to="/galleries/create" class="btn btn-primary gap-2">
                            <!-- <icon-plus /> -->
                            Create Gallery
                        </NuxtLink>
                    </div>
                </div>

                <vue3-datatable
                    :rows="galleries"
                    :columns="cols"
                    :loading="loading"
                    :totalRows="galleriesMeta?.total"
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
                    <template #actions="data">
                        <div class="flex items-center justify-center gap-4">
                            <NuxtLink :to="`/galleries/${data.value.id}`" class="hover:text-primary">
                                <icon-eye />
                            </NuxtLink>
                            <NuxtLink :to="`/galleries/${data.value.id}/edit`" class="hover:text-info">
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
                <p>Gallery: <span class="font-bold">{{ gallery?.title }}</span></p>
                <p>Are you sure you want to permanently delete this gallery?</p>
            </ModalDelete>
        </client-only>
    </SectionMain>
</template>
