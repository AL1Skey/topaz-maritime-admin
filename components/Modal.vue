<script setup>
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogOverlay
} from '@headlessui/vue';

const props = defineProps({
    title: {
        type: String,
        default: null
    },
    largeTitle: {
        type: String,
        default: null
    },
    button: {
        type: String,
        default: 'info'
    },
    cancelLabel: {
        type: String,
        default: 'Close'
    },
    confirmLabel: {
        type: String,
        default: 'Done'
    },
    hasCancel: Boolean,
    modelValue: {
        type: [String, Number, Boolean],
        default: null
    }
})

const emit = defineEmits(['update:modelValue', 'cancel', 'confirm'])

const value = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value)
})

const confirmCancel = mode => {
    value.value = false
    emit(mode)
}

const confirm = () => confirmCancel('confirm')

const cancel = () => confirmCancel('cancel')
</script>

<template>
    <TransitionRoot appear :show="value" as="template">
        <Dialog as="div" @close="modalDelete = false" class="relative z-[51]">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <DialogOverlay class="fixed inset-0 bg-[black]/60" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-start justify-center px-4 py-8">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
                        >
                            <button
                                type="button"
                                class="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                @click="cancel"
                            >
                                <icon-x />
                            </button>
                            <div
                                class="bg-[#fbfbfb] py-3 text-lg font-bold ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]"
                            >
                                {{ title }}
                            </div>
                            <div class="p-5">
                                <slot />

                                <div class="mt-8 flex items-center justify-end">
                                    <button type="button" @click="cancel" class="btn btn-outline-dark">
                                        {{ cancelLabel }}
                                    </button>
                                    <!-- <button type="button" @click="confirm" class="btn btn-danger ltr:ml-4 rtl:mr-4">
                                        {{ confirmLabel }}
                                    </button> -->
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>