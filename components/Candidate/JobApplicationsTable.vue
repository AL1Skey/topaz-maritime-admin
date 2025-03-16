<script setup>
import Vue3Datatable from '@bhplugin/vue3-datatable';

const props = defineProps({
    applications: {
        type: Array,
        default: () => []
    },
    columns: {
        type: Array,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    },
    totalRows: {
        type: Number,
        default: 0
    },
    search: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['change', 'view-details', 'change-status', 'delete']);

const handleChange = (data) => {
    emit('change', data);
};

const viewDetails = (application) => {
    emit('view-details', application);
};

const changeStatus = (application, type) => {
    emit('change-status', application, type);
};

const deleteApplication = (application) => {
    emit('delete', application);
};
</script>

<template>
    <vue3-datatable
        :rows="applications"
        :columns="columns"
        :loading="loading"
        :totalRows="totalRows"
        :isServerMode="true"
        :sortable="false"
        :pagination="true"
        :search="search"
        :pageSizeOptions="[10, 20, 30]"
        @change="handleChange"
        skin="whitespace-nowrap bh-table-hover"
    >
        <template #id="data">
            <strong class="text-info">#{{ data.value.id }}</strong>
        </template>
        <template #name="data">
            <div class="font-semibold">{{ data.value.name }}</div>
        </template>
        <template #email="data">
            <div class="font-semibold">{{ data.value.email }}</div>
        </template>
        <template #phone="data">
            <div class="font-semibold">{{ data.value.phone }}</div>
        </template>
        <template #job="data">
            <div class="font-semibold">{{ data.value.job_vacancy.title }}</div>
        </template>
        <template #status="data">
            <div class="flex items-center justify-center">
                <span 
                    class="badge whitespace-nowrap" 
                    :class="{
                        'badge-outline-success': data.value.status === 'Accepted',
                        'badge-outline-danger': data.value.status === 'Rejected',
                        'badge-outline-warning': !data.value.status || data.value.status === 'Pending'
                    }"
                >
                    {{ data.value.status || 'Pending' }}
                </span>
            </div>
        </template>
        <template #actions="data">
            <div class="flex items-center justify-center gap-2">
                <!-- View details button -->
                <button type="button" class="btn btn-sm btn-info p-1" @click="viewDetails(data.value)">
                    <icon-eye class="h-4 w-4" />
                </button>
                
                <!-- Accept button -->
                <button 
                    type="button" 
                    class="btn btn-sm btn-success p-1" 
                    @click="changeStatus(data.value, 'accept')"
                    :disabled="data.value.status === 'Accepted'"
                >
                    <icon-check class="h-4 w-4" />
                </button>
                
                <!-- Reject button -->
                <button 
                    type="button" 
                    class="btn btn-sm btn-danger p-1" 
                    @click="changeStatus(data.value, 'reject')"
                    :disabled="data.value.status === 'Rejected'"
                >
                    <icon-x class="h-4 w-4" />
                </button>
                
                <!-- Delete button -->
                <button type="button" class="btn btn-sm btn-danger p-1" @click="deleteApplication(data.value)">
                    <icon-trash-lines class="h-4 w-4" />
                </button>
            </div>
        </template>
    </vue3-datatable>
</template>