<script setup lang="ts">
import type { Component } from 'vue';
import { Card } from '../ui/card';
import { MoveUpRight } from 'lucide-vue-next';

interface StatisticCardInterface {
    title: string;
    subtitle: string;
    statistics: string | number;
    icon: Component;
    redirectTo: string;
}

const props = defineProps<StatisticCardInterface>();
</script>

<template>
    <Card class="w-full flex-col p-4 gap-5 hover:shadow-md transition-shadow duration-200">
        <div class="flex justify-between items-start">
            <h3 class="text-neutral-700 text-body-small font-medium leading-snug">{{ props.title }}</h3>
            <div class="flex justify-center items-center p-3 bg-background-100 rounded-full shrink-0">
                <component class="stroke-background-700 w-4 h-4" :is="props.icon" />
            </div>
        </div>
        <div class="flex justify-between w-full items-end">
            <div class="flex flex-col gap-0.5">
                <h2 class="text-neutral-900 text-sub-heading-4 font-semibold leading-tight">{{ props.statistics }}</h2>
                <p class="text-neutral-400 text-caption">{{ props.subtitle }}</p>
            </div>
            <router-link v-if="props.redirectTo" :to="props.redirectTo"
                class="p-2.5 rounded-full hover:bg-main-50 transition-colors duration-200">
                <MoveUpRight class="stroke-neutral-500 w-4 h-4" />
            </router-link>
        </div>
    </Card>
</template>
