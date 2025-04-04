<script setup>
const props = defineProps({
    candidate: {
        type: Object,
        required: true
    }
});
console.log("CANDIDATE", props.candidate.name);
</script>

<template>
    <div class="panel" v-if="candidate">
        <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/4 flex flex-col items-center">
                <div class="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary">
                    <img 
                        :src="props.candidate.photo_url || '/assets/images/user-profile.png'" 
                        alt="Candidate Photo"
                        class="w-full h-full object-cover"
                    />
                </div>
                <div class="text-center">
                    <h2 class="text-xl font-bold">{{ props.candidate.name }}</h2>
                    <p class="text-muted-foreground">{{ props.candidate.email }}</p>
                    <div class="mt-2">
                        <span 
                            class="badge whitespace-nowrap" 
                            :class="{
                                'badge-outline-success': props.candidate.status === 'Accepted',
                                'badge-outline-danger': props.candidate.status === 'Rejected',
                                'badge-outline-warning': !props.candidate.status || props.candidate.status === 'Pending'
                            }"
                        >
                            {{ props.candidate.status || 'Pending' }}
                        </span>
                    </div>
                </div>
            </div>
            
            <div class="md:w-3/4">
                <h6 class="mb-4 text-base font-semibold">Personal Information</h6>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Birth Place:</span>
                        <span>{{ props.candidate.birth_place }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Birth Date:</span>
                        <span>{{ new Date(props.candidate.birth_date).toLocaleDateString() }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Gender:</span>
                        <span>{{ props.candidate.sex ? 'Male' : 'Female' }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Marital Status:</span>
                        <span>{{ props.candidate.marital_status_name }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Children:</span>
                        <span>{{ props.candidate.number_of_child }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Religion:</span>
                        <span>{{ props.candidate.religion_name }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Blood Type:</span>
                        <span>{{ props.candidate.blood_type }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Nationality:</span>
                        <span>{{ props.candidate.nationality_name }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Rank to Apply:</span>
                        <span>{{ props.candidate.rank_to_apply_name }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Apply Date:</span>
                        <span>{{ new Date(props.candidate.rank_apply_date).toLocaleDateString() }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Manning Agent:</span>
                        <span>{{ props.candidate.manningAgent || 'TOPAZ MARITIM' }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Elementary:</span>
                        <span>{{ props.candidate.isElementary ? 'Yes' : 'No' }}</span>
                    </div>
                    <!-- <div class="flex">
                        <span class="w-1/3 font-semibold">Rank:</span>
                        <span>{{ props.candidate.rank }}</span>
                    </div> -->
                    <div class="flex">
                        <span class="w-1/3 font-semibold">COC Type:</span>
                        <span>{{ props.candidate.coc_type }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Winter Jacket Size:</span>
                        <span>{{ props.candidate.winter_jacket }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Safety Shoes Size:</span>
                        <span>{{ props.candidate.safety_shoes }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Overal Size:</span>
                        <span>{{ props.candidate.overall }}</span>
                    </div>
                    <div class="flex">
                        <span class="w-1/3 font-semibold">Blue Pants Size:</span>
                        <span>{{ props.candidate.blue_pants }}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>