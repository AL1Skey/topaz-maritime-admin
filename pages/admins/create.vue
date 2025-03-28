<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores/admin';

definePageMeta({
    middleware: ['superadmin']
})

useHead({ title: 'Create Admin' });

const router = useRouter()
const adminStore = useAdminStore()

const { loading, message, errors } = storeToRefs(adminStore)
const { createAdmin } = adminStore

const formData = reactive({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const submit = async () => {
    if (await createAdmin(formData)) {
        router.push('/admins')
    }
}
</script>

<template>
    <SectionMain>
        <div class="panel mt-6">
            <h5 class="mb-5 text-lg font-semibold dark:text-white-light">Create Admin</h5>

            <div class="mb-5">
                <form class="space-y-5" @submit.prevent="submit">
                    <div :class="{ 'has-error': errors?.name }" class="flex flex-col sm:flex-row">
                        <label for="name" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Name</label>
                        <div class="flex-grow">
                            <input v-model="formData.name" id="name" type="text" placeholder="Enter Name" class="form-input flex-1" required />
                            <template v-if="errors?.name">
                                <p class="text-danger mt-1" v-for="error in errors.name">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <div :class="{ 'has-error': errors?.email }" class="flex flex-col sm:flex-row">
                        <label for="email" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Email</label>
                        <div class="flex-grow">
                            <input v-model="formData.email" id="email" type="email" placeholder="Enter Email" class="form-input flex-1" required />
                            <template v-if="errors?.email">
                                <p class="text-danger mt-1" v-for="error in errors.email">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <div :class="{ 'has-error': errors?.password }" class="flex flex-col sm:flex-row">
                        <label for="password" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Password</label>
                        <div class="flex-grow">
                            <input v-model="formData.password" id="password" type="password" placeholder="Enter Password" class="form-input flex-1" required />
                            <template v-if="errors?.password">
                                <p class="text-danger mt-1" v-for="error in errors.password">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <div :class="{ 'has-error': errors?.password }" class="flex flex-col sm:flex-row">
                        <label for="password-confirmation" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Password Confirmation</label>
                        <div class="flex-grow">
                            <input v-model="formData.password_confirmation" id="password-confirmation" type="password" placeholder="Enter Password Confirmation" class="form-input flex-1" required />
                            <template v-if="errors?.password_confirmation">
                                <p class="text-danger mt-1" v-for="error in errors.password_confirmation">{{error}}</p>
                            </template>
                        </div>
                    </div>

                    <ButtonForm :loading="loading" cancel-to="/admins" />
                </form>
            </div>
        </div>
    </SectionMain>
</template>
