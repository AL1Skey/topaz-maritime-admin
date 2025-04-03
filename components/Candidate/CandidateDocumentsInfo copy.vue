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
        
        <!-- Passport -->
        <div class="mb-6">
            <h6 class="mb-2 font-medium">Passport</h6>
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border p-2">Document No</th>
                            <th class="border p-2">Issued By</th>
                            <th class="border p-2">Issue Date</th>
                            <th class="border p-2">Expiry Date</th>
                            <th class="border p-2">File</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="documents.find(doc => doc.doc_name === 'passport')">
                            <td class="border p-2">{{ documents.find(doc => doc.doc_name === 'passport').doc_no || '-' }}</td>
                            <td class="border p-2">{{ documents.find(doc => doc.doc_name === 'passport').issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_name === 'passport').valid_date) }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_name === 'passport').expired_date) }}</td>
                            <td class="border p-2">
                                <a v-if="documents.find(doc => doc.doc_name === 'passport').file_url" 
                                   :href="documents.find(doc => doc.doc_name === 'passport').file_url" 
                                   target="_blank" 
                                   class="text-primary hover:underline">
                                    View
                                </a>
                                <span v-else>-</span>
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="5" class="border p-2 text-center">No passport information available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Seamen's Book -->
        <div class="mb-6">
            <h6 class="mb-2 font-medium">Seamen's Book</h6>
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border p-2">Document No</th>
                            <th class="border p-2">Issued By</th>
                            <th class="border p-2">Issue Date</th>
                            <th class="border p-2">Expiry Date</th>
                            <th class="border p-2">File</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="documents.find(doc => doc.doc_name === 'Seamen Book')">
                            <td class="border p-2">{{ documents.find(doc => doc.doc_name === 'Seamen Book').doc_no || '-' }}</td>
                            <td class="border p-2">{{ documents.find(doc => doc.doc_name === 'Seamen Book').issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_name === 'Seamen Book').valid_date) }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_name === 'Seamen Book').expired_date) }}</td>
                            <td class="border p-2">
                                <a v-if="documents.find(doc => doc.doc_name === 'Seamen Book').file_url" 
                                   :href="documents.find(doc => doc.doc_name === 'Seamen Book').file_url" 
                                   target="_blank" 
                                   class="text-primary hover:underline">
                                    View
                                </a>
                                <span v-else>-</span>
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="5" class="border p-2 text-center">No seamen's book information available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- USA Visa -->
        <div class="mb-6">
            <h6 class="mb-2 font-medium">USA Visa</h6>
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border p-2">Document No</th>
                            <th class="border p-2">Issued By</th>
                            <th class="border p-2">Issue Date</th>
                            <th class="border p-2">Expiry Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="documents.find(doc => doc.doc_id === 'usaVisa')">
                    <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'usaVisa').doc_no || '-' }}</td>
                    <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'usaVisa').issued || '-' }}</td>
                    <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'usaVisa').valid_date) }}</td>
                    <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'usaVisa').expired_date) }}</td>
                </tr>
                <tr v-else>
                    <td colspan="4" class="border p-2 text-center">No USA visa information available</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
        
        <!-- Singapore Visa -->
        <div class="mb-6">
            <h6 class="mb-2 font-medium">Singapore Visa</h6>
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border p-2">Document No</th>
                            <th class="border p-2">Issued By</th>
                            <th class="border p-2">Issue Date</th>
                            <th class="border p-2">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="documents.find(doc => doc.doc_id === 'singaporeVisa')">
                            <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'singaporeVisa').doc_no || '-' }}</td>
                            <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'singaporeVisa').issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'singaporeVisa').valid_date) }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'singaporeVisa').expired_date) }}</td>
                        </tr>
                        <tr v-else>
                            <td colspan="4" class="border p-2 text-center">No Singapore visa information available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- COE (Certificate of Endorsement) -->
        <div class="mb-6">
            <h6 class="mb-2 font-medium">Certificate of Endorsement (COE)</h6>
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border p-2">Document No</th>
                            <th class="border p-2">Issued By</th>
                            <th class="border p-2">Issue Date</th>
                            <th class="border p-2">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="documents.find(doc => doc.doc_id === 'coe')">
                            <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'coe').doc_no || '-' }}</td>
                            <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'coe').issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'coe').valid_date) }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'coe').expired_date) }}</td>
                        </tr>
                        <tr v-else>
                            <td colspan="4" class="border p-2 text-center">No COE information available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- GOC (General Operator's Certificate) -->
        <div class="mb-6">
            <h6 class="mb-2 font-medium">General Operator's Certificate (GOC)</h6>
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border p-2">Document No</th>
                            <th class="border p-2">Issued By</th>
                            <th class="border p-2">Issue Date</th>
                            <th class="border p-2">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="documents.find(doc => doc.doc_id === 'goc')">
                            <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'goc').doc_no || '-' }}</td>
                            <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'goc').issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'goc').valid_date) }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'goc').expired_date) }}</td>
                        </tr>
                        <tr v-else>
                            <td colspan="4" class="border p-2 text-center">No GOC information available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- NPWP (Indonesian Tax ID) -->
        <div class="mb-6">
            <h6 class="mb-2 font-medium">NPWP (Tax ID)</h6>
            <div class="overflow-x-auto">
                <table class="w-full table-auto">
                    <thead>
                        <tr>
                            <th class="border p-2">Document No</th>
                            <th class="border p-2">Issued By</th>
                            <th class="border p-2">Issue Date</th>
                            <th class="border p-2">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="documents.find(doc => doc.doc_id === 'npwp')">
                            <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'npwp').doc_no || '-' }}</td>
                            <td class="border p-2">{{ documents.find(doc => doc.doc_id === 'npwp').issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'npwp').valid_date) }}</td>
                            <td class="border p-2">{{ formatDate(documents.find(doc => doc.doc_id === 'npwp').expired_date) }}</td>
                        </tr>
                        <tr v-else>
                            <td colspan="4" class="border p-2 text-center">No NPWP information available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Other Documents -->
        <div v-if="documents.filter(doc => 
            doc.doc_id !== 'passport' && 
            doc.doc_id !== 'seamenBook' && 
            doc.doc_id !== 'usaVisa' && 
            doc.doc_id !== 'singaporeVisa' && 
            doc.doc_id !== 'coe' && 
            doc.doc_id !== 'goc' && 
            doc.doc_id !== 'npwp').length > 0">
            <h6 class="mb-2 font-medium">Other Documents</h6>
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