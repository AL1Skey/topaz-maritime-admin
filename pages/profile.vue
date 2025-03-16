<script lang="ts" setup>
// import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
import { useAppStore } from '@/stores/index';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

useHead({ title: 'Profile' });

const store = useAppStore();
const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const formData = reactive({
    name: user.value?.name,
    email: user.value?.email,
})
</script>

<template>
    <SectionMain>
        <div class="panel mt-6 px-0">
            <h5 class="mb-5 px-5 text-lg font-semibold dark:text-white-light">Profile</h5>

            <form class="mb-5 bg-white p-4 dark:bg-[#0e1726]">
                <div class="flex flex-col sm:flex-row">
                    <div class="mb-5 w-full sm:w-2/12 ltr:sm:mr-4 rtl:sm:ml-4">
                        <img :src="user?.photo" alt="" class="mx-auto h-20 w-20 rounded-full object-cover md:h-32 md:w-32" />
                    </div>
                    <div class="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label for="name">Name</label>
                            <input v-model="formData.name" id="name" type="text" placeholder="Name" class="form-input" disabled />
                        </div>
                        <div>
                            <label for="email">Email</label>
                            <input v-model="formData.email" id="email" type="email" placeholder="Email" class="form-input" disabled />
                        </div>
                        <!-- <div class="mt-3 sm:col-span-2">
                            <button type="button" class="btn btn-primary">Save</button>
                        </div> -->
                    </div>
                </div>
            </form>
        </div>
    </SectionMain>
</template>