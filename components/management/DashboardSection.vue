<script setup lang="ts">
import { DashboardUserProfileCard } from '#components';
import { AlarmClock, ArchiveX, Briefcase, ClipboardMinus, Folder, Lightbulb, PieChart, Users } from 'lucide-vue-next';
import DtrCard from '../dashboard/DtrCard.vue';
import StatisticCard from '../dashboard/StatisticCard.vue';
import TimeLog from '../dashboard/TimeLog.vue';
import AttendanceCard from '../dashboard/AttendanceCard.vue';
</script>

<template>
    <section class="px-28 flex gap-6">
        <div class="flex flex-col gap-6 basis-7/12">
            <div class="flex gap-6">
                <DashboardUserProfileCard />
                <div class="flex flex-col gap-6 w-full">
                    <StatisticCard redirect-to="#" :icon="Briefcase" :title="'Total Projects'"
                        :subtitle="'Overall Projects'" :statistics="'12'" />
                    <StatisticCard redirect-to="#" :icon="ClipboardMinus" :title="'Total Task'"
                        :subtitle="'Overall Tasks'" :statistics="'12'" />
                </div>
                <div class="flex flex-col gap-6 w-full">
                    <StatisticCard redirect-to="#" :icon="Users" :title="'Total Clients'" :subtitle="'Overall Projects'"
                        :statistics="'12'" />
                    <StatisticCard redirect-to="#" :icon="Folder" :title="'Overall Tasks'" :subtitle="'Overall Tasks'"
                        :statistics="'12'" />
                </div>
            </div>
            <div class="flex gap-6">
                <DtrCard :value="3" :date="'May 1-15'" :icon="PieChart" :title="'Present Day'"
                    :subtitle="'Based on the payroll cut-off'" />
                <DtrCard :value="38" :date="'May 1-15'" :icon="ArchiveX" :title="'Absent Day'"
                    :subtitle="'of the allowed overtime hours'" />
            </div>
            <div class="flex gap-6">
                <DtrCard :value="38" :date="'May 1-15'" :icon="Lightbulb" :title="'Late Hours'"
                    :subtitle="'Based on the payroll cut-off'" />
                <DtrCard :value="38" :date="'May 1-15'" :icon="AlarmClock" :title="'Overtime Hours'"
                    :subtitle="'of the allowed overtime hours'" />
            </div>
            <div class="">
                project management table
            </div>
        </div>
        <div class="flex flex-col gap-6 basis-5/12">
            <TimeLog />
            <AttendanceCard />
            <div class="">announcement</div>
        </div>
    </section>
</template>