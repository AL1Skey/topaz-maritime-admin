<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import { useAppStore } from '@/stores/index';
    import { useJobCategoryStore } from '~/stores/jobCategory';
    import { useJobApplicationStore } from '~/stores/jobApplication';
    import { formatDate } from '@vueuse/core';
    import Multiselect from '@suadelabs/vue3-multiselect';
    import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import CountUp from 'vue-countup-v3';

    const store = useAppStore();

    useHead({ title: 'Dashobard' });

    onMounted(() => {
        nextTick(() => {
            window.dispatchEvent(new Event('resize'));
        });
    });

    const jobCategoryStore = useJobCategoryStore();

    const { jobCategories } = storeToRefs(jobCategoryStore);
    const { fetchJobCategories } = jobCategoryStore;

    const selectedJobCategory = ref({});

    onMounted(async () => {
        // await fetchJobCategories()
        await fetchJobCategories({
            include_job_applications_count: 1,
        });

        // if (jobCategories.value.length > 0) {

        // }

        const ids = jobCategories.value.map((object) => object.job_applications_count);
        console.log('🚀 | onMounted | ids:', ids);

        const max = Math.max(...ids);
        console.log('🚀 | onMounted | max:', max);

        const maxJobApp = jobCategories.value.filter((cat) => cat.job_applications_count == max);
        console.log('🚀 | onMounted | maxJobApp:', maxJobApp);

        // selectedJobCategory.value = jobCategories.value[Math.max(...ids)]
        // selectedJobCategory.value = jobCategories.value
        selectedJobCategory.value = maxJobApp[0];
    });

    const route = useRoute();
    const appStore = useAppStore();

    const jobApplicationStore = useJobApplicationStore();

    const {
        jobApplications,
        jobApplicationsMeta,
        jobApplication,
        jobApplicationsCount,
        // loading,
        // message,
        // errors,
        isModalDeleteActive,
    } = storeToRefs(jobApplicationStore);

    const { fetchJobApplicationsByJobCategoryId, deleteJobApplication, openModalDelete, getJobApplicationsCurrentMonthCount } = jobApplicationStore;

    onMounted(async () => {
        await getJobApplicationsCurrentMonthCount();
    });

    // onMounted(async () => {
    //     appStore.loadingStart()
    //     // await fetchJobCategory(route.params.id)
    //     await fetchJobApplicationsByJobCategoryId(route.params.id)
    //     appStore.loadingEnd()
    // });

    const jobApplicationCols =
        ref([
            { field: 'id', title: 'ID', isUnique: true },
            { field: 'name', title: 'Name' },
            // { field: 'email', title: 'Email' },
            // { field: 'phone', title: 'Phone' },
            { field: 'job', title: 'Job' },
            // { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
        ]) || [];

    // const handleChangeJobCategory = async () => {
    //     //fetch job applications by selected job category
    //     console.log('fetc job applications');

    //     appStore.loadingStart()
    //     // await fetchJobCategory(route.params.id)
    //     await fetchJobApplicationsByJobCategoryId(selectedJobCategory.value.id)
    //     appStore.loadingEnd()
    // }

    watch(selectedJobCategory, async () => {
        //fetch job applications by selected job category
        console.log('fetch job applications');

        // appStore.loadingStart()
        // await fetchJobCategory(route.params.id)
        await fetchJobApplicationsByJobCategoryId(selectedJobCategory.value.id);
        // appStore.loadingEnd()
    });

    // unique visitors
    const jobApplicationsCountByCategoryChartOptions = computed(() => {
        const isDark: boolean = store.theme === 'dark' || store.isDarkMode ? true : false;
        const isRtl = store.rtlClass === 'rtl' ? true : false;
        return {
            chart: {
                height: 360,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                colors: ['transparent'],
            },
            // colors: ['#5c1ac3', '#ffbb44'],
            dropShadow: {
                enabled: true,
                blur: 3,
                color: '#515365',
                opacity: 0.4,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    borderRadius: 10,
                    borderRadiusApplication: 'end',
                },
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8,
                },
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                padding: {
                    left: 20,
                    right: 20,
                },
            },
            xaxis: {
                // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                categories: [formatDate(new Date(), 'MMMM YYYY')],
                axisBorder: {
                    show: true,
                    color: isDark ? '#3b3f5c' : '#e0e6ed',
                },
            },
            yaxis: {
                tickAmount: 6,
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -10 : 0,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: isDark ? 'dark' : 'light',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.8,
                    stops: [0, 100],
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                y: {
                    formatter: (val: any) => {
                        return val;
                    },
                },
            },
        };
    });

    // const jobApplicationsCountByCategoryChartSeries = ref([
    //     {
    //         name: 'Direct',
    //         data: [58, 44, 55, 57, 56, 61, 58, 63, 60, 66, 56, 63],
    //     },
    //     {
    //         name: 'Organic',
    //         data: [91, 76, 85, 101, 98, 87, 105, 91, 114, 94, 66, 70],
    //     },
    // ]);
    // const jobApplicationsCountByCategoryChartSeries = ref([
    //     {
    //         name: 'Nahkoda',
    //         data: [2],
    //     },
    //     {
    //         name: 'Kapten',
    //         data: [10],
    //     },
    // ]);
    const jobApplicationsCountByCategoryChartSeries = computed(() =>
        jobCategories.value.map((cat) => ({
            name: cat.name,
            data: [cat.job_applications_count],
        }))
    );
</script>

<template>
    <SectionMain>
        <div class="pt-5">
            <!-- <div class="mb-6 grid gap-6 sm:grid-cols-3 xl:grid-cols-2"> -->
            <div class="mb-6 grid gap-6 sm:grid-cols-1 xl:grid-cols-2">
                <div class="panel h-full overflow-hidden p-0">
                    <div class="flex p-5">
                        <!-- <div
                            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light"
                        > -->
                        <div
                            class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary dark:text-white-light"
                        >
                            <!-- <icon-users-group class="h-5 w-5" /> -->
                            <icon-notes class="h-7 w-7" />
                        </div>
                        <div class="font-semibold ltr:ml-3 rtl:mr-3">
                            <h5 class="text-lg text-[#506690]">Job Applications ({{ formatDate(new Date(), 'MMMM YYYY') }})</h5>
                            <!-- <p class="text-xl dark:text-white-light">{{ jobApplicationsCount }}</p> -->
                            <count-up class="text-xl dark:text-white-light" :startVal="0" :end-val="jobApplicationsCount" :duration="1"></count-up>
                        </div>
                    </div>
                </div>
            </div>

            <div class="panel h-full p-0 lg:col-span-2">
                <div class="mb-5 flex items-start justify-between border-b border-[#e0e6ed] p-5 dark:border-[#1b2e4b] dark:text-white-light">
                    <h5 class="text-lg font-semibold">Job Applications Count By Job Category</h5>
                    <!-- <div class="dropdown">
                            <client-only>
                                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                                    <button type="button">
                                        <icon-horizontal-dots class="text-black/70 hover:!text-primary dark:text-white/70" />
                                    </button>
                                    <template #content="{ close }">
                                        <ul @click="close()">
                                            <li>
                                                <a href="javascript:;">View</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Update</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;">Download</a>
                                            </li>
                                        </ul>
                                    </template>
                                </Popper>
                            </client-only>
                        </div> -->
                </div>

                <client-only>
                    <apexchart
                        :options="jobApplicationsCountByCategoryChartOptions"
                        :series="jobApplicationsCountByCategoryChartSeries"
                        class="overflow-hidden"
                        height="360"
                    >
                        <!-- loader -->
                        <div class="grid min-h-[360px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                            <span class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                        </div>
                    </apexchart>
                </client-only>
            </div>
        </div>

        <!-- <div class="pt-5">
            <div class="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
                <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div class="flex justify-between">
                        <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">Job Applications This Month</div>

                    </div>
                    <div class="mt-5 flex items-center">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">55</div>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="panel mt-5">
            <!-- <h5 class="mb-5 px-5 text-lg font-semibold dark:text-white-light">Job Application By Job Category</h5> -->

            <div class="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 class="text-lg font-semibold dark:text-white-light">Latest Job Application By Job Category: {{ selectedJobCategory.name }}</h5>
                <div class="ltr:ml-auto rtl:mr-auto">
                    <!-- <NuxtLink :to="`/admins/${route.params.id}/edit`" class="hover:text-info">
                        <icon-edit class="w-5 h-5" />
                    </NuxtLink> -->
                    <div class="flex flex-col sm:flex-row">
                        <!-- <label for="job_category_id" class="mb-0 rtl:ml-2 sm:w-1/4 sm:ltr:mr-2">Job Category</label> -->
                        <div class="flex-grow">
                            <div class="">
                                <client-only>
                                    <multiselect
                                        v-model="selectedJobCategory"
                                        :options="jobCategories"
                                        track-by="id"
                                        label="name"
                                        class="custom-multiselect"
                                        :searchable="false"
                                        :preselect-first="true"
                                        :allow-empty="false"
                                        selected-label=""
                                        select-label=""
                                        deselect-label=""
                                    ></multiselect>
                                </client-only>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="datatable invoice-table">
                <!-- <div class="mb-4.5 flex flex-col justify-end gap-5 px-5 md:flex-row md:items-center">
                    <div class="mr-auto">
                        <input v-model="jobApplicatioSearch" type="text" class="form-input" placeholder="Search..." />
                    </div>
                    <div class="flex items-center gap-2">
                        <NuxtLink to="/job-categories/create" class="btn btn-primary gap-2">
                            Create Job Application
                        </NuxtLink>
                    </div>
                </div> -->

                <!-- :rows="jobApplications"
                    :columns="jobApplicationCols"
                    :loading="jobApplicationStore.loading"
                    :totalRows="jobApplicationsMeta?.total"
                    :isServerMode="true"
                    :sortable="false"
                    :pagination="true"
                    :search="jobApplicationParams.search"
                    :pageSizeOptions="[10, 20, 30]"
                    @change="changeServer" -->
                <vue3-datatable
                    :rows="jobApplications"
                    :columns="jobApplicationCols"
                    :loading="jobApplicationStore.loading"
                    :totalRows="jobApplications.length"
                    :isServerMode="true"
                    :sortable="false"
                    :pagination="false"
                    :pageSizeOptions="[10, 20, 30]"
                    skin="whitespace-nowrap bh-table-hover"
                >
                    <template #id="data">
                        <strong class="text-info">#{{ data.value.id }}</strong>
                    </template>
                    <template #name="data">
                        <div class="font-semibold">{{ data.value.name }}</div>
                    </template>
                    <!-- <template #email="data">
                        <div class="font-semibold">{{ data.value.email }}</div>
                    </template>
                    <template #phone="data">
                        <div class="font-semibold">{{ data.value.phone }}</div>
                    </template> -->
                    <template #job="data">
                        <div class="font-semibold">{{ data.value.job_vacancy.title }}</div>
                    </template>
                </vue3-datatable>
            </div>
        </div>
    </SectionMain>
</template>
