<script setup>
defineProps({
    documents: {
        type: Array,
        default: () => []
    }
});
</script>

<template>
    <div class="panel mt-6">
        <h6 class="mb-4 text-base font-semibold">Documents</h6>
        <div class="overflow-x-auto">
            <table class="w-full table-auto">
                <thead>
                    <tr>
                        <th class="border p-2">Document ID</th>
                        <th class="border p-2">Document No</th>
                        <th class="border p-2">Issued By</th>
                        <th class="border p-2">Valid Date</th>
                        <th class="border p-2">Expiry Date</th>
                        <th class="border p-2">Remark</th>
                        <th class="border p-2">File</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(doc, index) in documents" :key="index">
                        <td class="border p-2">{{ doc.docId }}</td>
                        <td class="border p-2">{{ doc.docNo }}</td>
                        <td class="border p-2">{{ doc.issued }}</td>
                        <td class="border p-2">{{ new Date(doc.validDate).toLocaleDateString() }}</td>
                        <td class="border p-2">{{ new Date(doc.expiredDate).toLocaleDateString() }}</td>
                        <td class="border p-2">{{ doc.remark }}</td>
                        <td class="border p-2">
                            <a v-if="doc.docFile?.url" :href="doc.docFile.url" target="_blank" class="text-primary hover:underline">
                                View
                            </a>
                            <span v-else>-</span>
                        </td>
                    </tr>
                    <tr v-if="!documents || documents.length === 0">
                        <td colspan="7" class="border p-2 text-center">No documents available</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>