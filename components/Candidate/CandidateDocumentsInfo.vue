<script setup>
const props = defineProps({
    documents: {
        type: Array,
        default: () => []
    }
});

// Helper function to format date or return placeholder
const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
};

console.log("DOCUMENTS", props.documents);
</script>

<template>
    <div class="panel mt-6">
        <h6 class="mb-4 text-base font-semibold">Documents</h6>
 
        
        <!-- Other Documents -->
        <div v-if="documents.filter(doc => 
            doc.doc_id !== 'passport' && 
            doc.doc_id !== 'seamenBook' && 
            doc.doc_id !== 'usaVisa' && 
            doc.doc_id !== 'singaporeVisa' && 
            doc.doc_id !== 'coe' && 
            doc.doc_id !== 'goc' && 
            doc.doc_id !== 'npwp').length > 0">
            <h6 class="mb-2 font-medium">Documents List</h6>
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
                            <td class="border p-2">{{ doc.doc_id || '-' }}</td>
                            <td class="border p-2">{{ doc.doc_no || '-' }}</td>
                            <td class="border p-2">{{ doc.issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(doc.valid_date) }}</td>
                            <td class="border p-2">{{ formatDate(doc.expired_date) }}</td>
                            <td class="border p-2">{{ doc.remark || '-' }}</td>
                            <td class="border p-2">
                                <a v-if="doc.file_path" :href="doc.file_path" target="_blank" class="text-primary hover:underline">
                                    View
                                </a>
                                <span v-else>-</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>