<script setup lang="ts">
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { useAppStore } from '@/stores/index';
import { useServiceStore } from '@/stores/service';
import { storeToRefs } from 'pinia';
import { refDebounced } from '@vueuse/core';

useHead({ title: 'Services' });

const appStore = useAppStore();
const serviceStore = useServiceStore()

const { services, service, isModalDeleteActive, loading, } = storeToRefs(serviceStore)
const { fetchServices, deleteService, openModalDelete } = serviceStore

onMounted(() => {
    nextTick(() => {
        window.dispatchEvent(new Event('resize'));
    });
});

onMounted(async () => {
    appStore.loadingStart()
    await fetchServices(params)
    appStore.loadingEnd()
});

const cols = ref([
    { field: 'id', title: 'ID', isUnique: true },
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

    await fetchServices(params)
};

const confirmDelete = async () => {
    await deleteService(service.value!.id)
    await fetchServices(params)
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6 px-0">
            <h5 class="mb-5 px-5 text-lg font-semibold dark:text-white-light">Services</h5>

            <div class="datatable invoice-table">
                <div class="mb-4.5 flex flex-col justify-end gap-5 px-5 md:flex-row md:items-center">
                    <!-- <div class="mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div> -->
                    <div class="flex items-center gap-2">
                        <NuxtLink to="/services/create" class="btn btn-primary gap-2">
                            <!-- <icon-plus /> -->
                            Create Service
                        </NuxtLink>
                    </div>
                </div>

                <vue3-datatable
                    :rows="services"
                    :columns="cols"
                    :loading="loading"
                    :totalRows="services?.length"
                    :isServerMode="true"
                    :sortable="false"
                    :pagination="false"
                    :search="params.search"
                    :pageSizeOptions="[10, 20, 30]"
                    @change="changeServer"
                    skin="whitespace-nowrap bh-table-hover"
                >
                    <template #id="data">
                        <strong class="text-info">#{{ data.value.id }}</strong>
                    </template>
                    <template #title="data">
                        <div class="font-semibold">{{ data.value.title }}</div>
                    </template>
                    <template #actions="data">
                        <div class="flex items-center justify-center gap-4">
                            <NuxtLink :to="`/services/${data.value.id}`" class="hover:text-primary">
                                <icon-eye />
                            </NuxtLink>
                            <NuxtLink :to="`/services/${data.value.id}/edit`" class="hover:text-info">
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
                <p>Service: <span class="font-bold">{{ service?.title }}</span></p>
                <p>Are you sure you want to permanently delete this service?</p>
            </ModalDelete>
        </client-only>
    </SectionMain>
</template>
