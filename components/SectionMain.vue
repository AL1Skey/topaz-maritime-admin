<script setup>
import { useAppStore } from '@/stores/index';
import appSetting from '@/app-setting';
import { storeToRefs } from 'pinia';

const appStore = useAppStore()

const { loading } = storeToRefs(appStore)

</script>

<template>
    <SectionLoading v-if="loading" />
    <div v-else>
        <slot />
    </div>
</template>