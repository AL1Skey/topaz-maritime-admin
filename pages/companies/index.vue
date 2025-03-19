<script setup lang="ts">
import Vue3Datatable from '@bhplugin/vue3-datatable';
import { storeToRefs } from 'pinia';
import { useAppStore } from '@/stores/index';
import { useCompanyStore } from '@/stores/company';
import { refDebounced } from '@vueuse/core';

useHead({ title: 'Companies' });

const appStore = useAppStore();
const companyStore = useCompanyStore()

const { companies, companiesMeta, company, isModalDeleteActive, loading, } = storeToRefs(companyStore)
const { fetchCompanies, deleteCompany, openModalDelete } = companyStore

onMounted(() => {
    nextTick(() => {
        window.dispatchEvent(new Event('resize'));
    });
});

onMounted(async () => {
    appStore.loadingStart()
    await fetchCompanies(params)
    appStore.loadingEnd()
});

const cols = ref([
    // { field: 'id', title: 'ID', isUnique: true },
    { field: 'name', title: 'Company' },
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

    await fetchCompanies(params)
};

const confirmDelete = async () => {
    await deleteCompany(company.value!.id)
    await fetchCompanies(params)
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6 px-0">
            <h5 class="mb-5 px-5 text-lg font-semibold dark:text-white-light">Companies</h5>

            <div class="datatable invoice-table">
                <div class="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                    <div class="mr-auto">
                        <input v-model="search" type="text" class="form-input" placeholder="Search..." />
                    </div>
                    <div class="flex items-center gap-2">
                        <NuxtLink to="/companies/create" class="btn btn-primary gap-2">
                            <!-- <icon-plus /> -->
                            Create Company
                        </NuxtLink>
                    </div>
                </div>

                <vue3-datatable
                    :rows="companies"
                    :columns="cols"
                    :loading="loading"
                    :totalRows="companiesMeta?.total"
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
                    <template #name="data">
                        <div class="flex items-center gap-2">
                            <img :src="data.value.logo" class="h-9 w-9 max-w-none rounded-full" alt="user-profile" />
                            <div class="font-semibold">{{ data.value.name }}</div>
                        </div>
                    </template>
                    <template #actions="data">
                        <div class="flex items-center justify-center gap-4">
                            <NuxtLink :to="`/companies/${data.value.id}`" class="hover:text-primary">
                                <icon-eye />
                            </NuxtLink>
                            <NuxtLink :to="`/companies/${data.value.id}/edit`" class="hover:text-info">
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
                <p>Company: <span class="font-bold">{{ company?.name }}</span></p>
                <p>Are you sure you want to permanently delete this company?</p>
            </ModalDelete>
        </client-only>
    </SectionMain>
</template>
