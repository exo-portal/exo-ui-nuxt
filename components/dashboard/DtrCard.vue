<script setup lang="ts">
import { Card } from '../ui/card';
import type { Component } from 'vue';
import { Progress } from '../ui/progress';

interface DtrCardInterface {
    title: string;
    subtitle: string;
    icon: Component;
    value: number;
    date: string;
}
const { title, subtitle, value, icon } = defineProps<DtrCardInterface>();
</script>

<template>
    <Card class="w-full flex-col p-4 gap-10 hover:shadow-md transition-shadow duration-200">
        <div class="flex justify-between items-center">
            <span class="text-body-small font-medium text-neutral-700">
                {{ title }}
            </span>
            <div class="p-2.5 bg-main-50 rounded-full shrink-0">
                <component class="stroke-main-500 w-4 h-4" :is="icon" />
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between items-end">
                <h2 class="text-neutral-900 text-sub-heading-4 font-semibold leading-tight">
                    {{ value }}
                </h2>
                <div class="flex gap-3 items-end h-10">
                    <Progress :model-value="30" :is-vertical="true" />
                    <Progress :model-value="20" :is-vertical="true" />
                    <Progress :model-value="5" :is-vertical="true" />
                    <Progress :model-value="15" :is-vertical="true" />
                </div>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-body-small font-medium text-success-500">
                    {{ date }}
                </span>
                <span class="text-caption text-neutral-400">
                    {{ subtitle }}
                </span>
            </div>
        </div>
    </Card>
</template>
