<script setup lang="ts">
import { PieChart } from 'lucide-vue-next';
import { Card } from '../ui/card';
import type { Component } from 'vue';;

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
    <Card class="w-full flex-col p-4 gap-14">
        <div class="flex justify-between items-center">
            <span class="text-body-normal text-neutral-800">
                {{ title }}
            </span>
            <div class="p-3 bg-main-50 rounded-full">
                <component :is="icon" />
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex justify-between">
                <h2 class="text-neutral-800 text-heading-2 font-medium">
                    {{ value }}
                </h2>
                
            </div>

            <div class="flex justify-between">
                <span class="text-body-normal font-medium text-success-500">
                    {{ date }}
                </span>
                <span class="text-body-small text-neutral-500">
                    {{ subtitle }}
                </span>
            </div>
        </div>
    </Card>
</template>
