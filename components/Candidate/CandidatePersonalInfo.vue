<script setup>
defineProps({
    candidate: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="panel">
        <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/4 flex flex-col items-center">
                <div class="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary">
                    <img 
                        :src="candidate.photo?.url || '/assets/images/user-profile.png'" 
                        alt="Candidate Photo"
                        class="w-full h-full object-cover"
                    />
                </div>
                <div class="text-center">
                    <h2 class="text-xl font-bold">{{ candidate.name }}</h2>
                    <p class="text-muted-foreground">{{ candidate.email }}</p>
                    <div class="mt-2">
                        <span 
                            class="badge whitespace-nowrap" 
                            :class="{
                                'badge-outline-success': candidate.status === 'Accepted',
                                'badge-outline-danger': candidate.status === 'Rejected',
                                'badge-outline-warning': !candidate.status || candidate.status === 'Pending'
                            }"
                        >
                            {{ candidate.status || 'Pending' }}
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="md:w-3/4">
                <h6 class="mb-4 text-base font-semibold">Personal Information</h6>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Birth Place:</span>
                        <span>{{ candidate.birthPlace }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Birth Date:</span>
                        <span>{{ new Date(candidate.birthDate).toLocaleDateString() }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Gender:</span>
                        <span>{{ candidate.sex ? 'Male' : 'Female' }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Marital Status:</span>
                        <span>{{ candidate.maritalStatusId }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Children:</span>
                        <span>{{ candidate.numberOfChild }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Religion:</span>
                        <span>{{ candidate.religionId }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Blood Type:</span>
                        <span>{{ candidate.bloodType }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Nationality:</span>
                        <span>{{ candidate.nationalityId }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Rank to Apply:</span>
                        <span>{{ candidate.rankToApply }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Apply Date:</span>
                        <span>{{ new Date(candidate.rankApplyDate).toLocaleDateString() }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Manning Agent:</span>
                        <span>{{ candidate.manningAgent || '-' }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Elementary:</span>
                        <span>{{ candidate.isElementary ? 'Yes' : 'No' }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Rank:</span>
                        <span>{{ candidate.rank }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">COC Type:</span>
                        <span>{{ candidate.cocType }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>