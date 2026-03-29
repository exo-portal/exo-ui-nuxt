<script setup lang="ts">
import { DashboardUserProfileCard } from '#components';
import { AlarmClock, ArchiveX, Briefcase, ClipboardMinus, Folder, Lightbulb, PieChart, Users } from 'lucide-vue-next';
import DtrCard from '../dashboard/DtrCard.vue';
import StatisticCard from '../dashboard/StatisticCard.vue';
import TimeLog from '../dashboard/TimeLog.vue';
</script>

<template>
    <section class="app-container section-y flex flex-col lg:flex-row gap-6">

        <!-- Left column: profile + stats + DTR cards -->
        <div class="flex flex-col gap-6 w-full lg:basis-7/12">

            <!-- Profile + statistic cards row -->
            <div class="flex flex-col sm:flex-row gap-6">
                <div class="w-full sm:w-auto sm:shrink-0">
                    <DashboardUserProfileCard />
                </div>
                <div class="grid grid-cols-1 xs:grid-cols-2 gap-4 w-full">
                    <StatisticCard redirect-to="#" :icon="Briefcase" :title="'Total Projects'"
                        :subtitle="'Overall Projects'" :statistics="'12'" />
                    <StatisticCard redirect-to="#" :icon="ClipboardMinus" :title="'Total Task'"
                        :subtitle="'Overall Tasks'" :statistics="'12'" />
                    <StatisticCard redirect-to="#" :icon="Users" :title="'Total Clients'"
                        :subtitle="'Overall Projects'" :statistics="'12'" />
                    <StatisticCard redirect-to="#" :icon="Folder" :title="'Overall Tasks'"
                        :subtitle="'Overall Tasks'" :statistics="'12'" />
                </div>
            </div>

            <!-- DTR cards grid -->
            <div class="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <DtrCard :value="3" :date="'May 1-15'" :icon="PieChart" :title="'Present Day'"
                    :subtitle="'Based on the payroll cut-off'" />
                <DtrCard :value="38" :date="'May 1-15'" :icon="ArchiveX" :title="'Absent Day'"
                    :subtitle="'of the allowed overtime hours'" />
                <DtrCard :value="38" :date="'May 1-15'" :icon="Lightbulb" :title="'Late Hours'"
                    :subtitle="'Based on the payroll cut-off'" />
                <DtrCard :value="38" :date="'May 1-15'" :icon="AlarmClock" :title="'Overtime Hours'"
                    :subtitle="'of the allowed overtime hours'" />
            </div>

            <div class="rounded-xl bg-background-50 border border-neutral-100 p-4 text-neutral-400 text-body-small">
                project management table
            </div>
        </div>

        <!-- Right column: time log + attendance + announcements -->
        <div class="flex flex-col gap-6 w-full lg:basis-5/12">
            <TimeLog />
            <div class="rounded-xl bg-background-50 border border-neutral-100 p-4 text-neutral-400 text-body-small">
                attendance
            </div>
            <div class="rounded-xl bg-background-50 border border-neutral-100 p-4 text-neutral-400 text-body-small">
                announcement
            </div>
        </div>

    </section>
</template>
