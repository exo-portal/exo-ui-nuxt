<script setup lang="ts">
import type { Component } from 'vue';
import { Card } from '../ui/card';
import { MoveUpRight } from 'lucide-vue-next';

interface StatisticCardInterface {
    title: string;
    subtitle: string;
    statistics: string | number;
    icon: Component;
    redirectTo: string; // router name for navigation
}

const props = defineProps<StatisticCardInterface>();
</script>

<template>
    <Card class="w-full flex-col p-4 gap-7">
        <div class="flex justify-between items-center">
            <h3 class="text-neutral-800 text-body-normal font-medium">{{ props.title }}</h3>
            <div class="flex justify-center items-center p-4 bg-background-100 rounded-full">
                <component class="stroke-background-900" :is="props.icon" />
            </div>
        </div>
        <div class="flex justify-between w-full items-center">
            <div class="flex flex-col">
                <h2 class="text-neutral-800 text-heading-2 font-medium">{{ props.statistics }}</h2>
                <p class="text-neutral-400">{{ props.subtitle }}</p>
            </div>
            <router-link v-if="props.redirectTo" :to="props.redirectTo" class="p-6 rounded-full">
                <MoveUpRight class="stroke-neutral-800" />
            </router-link>
        </div>
    </Card>
</template>

<style scoped></style>