<script setup>
defineProps({
    candidate: {
        type: Object,
        required: true
    }
});

// Helper function to format date or return placeholder
const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString();
};
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
                        <tr v-if="candidate.passport">
                            <td class="border p-2">{{ candidate.passport.docNo || '-' }}</td>
                            <td class="border p-2">{{ candidate.passport.issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(candidate.passport.issuedDate) }}</td>
                            <td class="border p-2">{{ formatDate(candidate.passport.expiredDate) }}</td>
                            <td class="border p-2">
                                <a v-if="candidate.passport.file?.url" :href="candidate.passport.file.url" target="_blank" class="text-primary hover:underline">
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
                        <tr v-if="candidate.seamen">
                            <td class="border p-2">{{ candidate.seamen.docNo || '-' }}</td>
                            <td class="border p-2">{{ candidate.seamen.issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(candidate.seamen.issuedDate) }}</td>
                            <td class="border p-2">{{ formatDate(candidate.seamen.expiredDate) }}</td>
                            <td class="border p-2">
                                <a v-if="candidate.seamen.file?.url" :href="candidate.seamen.file.url" target="_blank" class="text-primary hover:underline">
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
                        <tr v-if="candidate.usaVisa">
                            <td class="border p-2">{{ candidate.usaVisa.docNo || '-' }}</td>
                            <td class="border p-2">{{ candidate.usaVisa.issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(candidate.usaVisa.issuedDate) }}</td>
                            <td class="border p-2">{{ formatDate(candidate.usaVisa.expiredDate) }}</td>
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
                        <tr v-if="candidate.singaporeVisa">
                            <td class="border p-2">{{ candidate.singaporeVisa.docNo || '-' }}</td>
                            <td class="border p-2">{{ candidate.singaporeVisa.issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(candidate.singaporeVisa.issuedDate) }}</td>
                            <td class="border p-2">{{ formatDate(candidate.singaporeVisa.expiredDate) }}</td>
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
                        <tr v-if="candidate.coe">
                            <td class="border p-2">{{ candidate.coe.docNo || '-' }}</td>
                            <td class="border p-2">{{ candidate.coe.issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(candidate.coe.issuedDate) }}</td>
                            <td class="border p-2">{{ formatDate(candidate.coe.expiredDate) }}</td>
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
                        <tr v-if="candidate.goc">
                            <td class="border p-2">{{ candidate.goc.docNo || '-' }}</td>
                            <td class="border p-2">{{ candidate.goc.issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(candidate.goc.issuedDate) }}</td>
                            <td class="border p-2">{{ formatDate(candidate.goc.expiredDate) }}</td>
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
                        <tr v-if="candidate.npwp">
                            <td class="border p-2">{{ candidate.npwp.docNo || '-' }}</td>
                            <td class="border p-2">{{ candidate.npwp.issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(candidate.npwp.issuedDate) }}</td>
                            <td class="border p-2">{{ formatDate(candidate.npwp.expiredDate) }}</td>
                        </tr>
                        <tr v-else>
                            <td colspan="4" class="border p-2 text-center">No NPWP information available</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- Other Documents -->
        <div v-if="candidate.documents && candidate.documents.length > 0 && candidate.documents[0].docId">
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
                        <tr v-for="(doc, index) in candidate.documents" :key="index">
                            <td class="border p-2">{{ doc.docId || '-' }}</td>
                            <td class="border p-2">{{ doc.docNo || '-' }}</td>
                            <td class="border p-2">{{ doc.issued || '-' }}</td>
                            <td class="border p-2">{{ formatDate(doc.validDate) }}</td>
                            <td class="border p-2">{{ formatDate(doc.expiredDate) }}</td>
                            <td class="border p-2">{{ doc.remark || '-' }}</td>
                            <td class="border p-2">
                                <a v-if="doc.docFile?.url" :href="doc.docFile.url" target="_blank" class="text-primary hover:underline">
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