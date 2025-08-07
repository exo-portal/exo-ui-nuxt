<script setup lang="ts">
import { Lightbulb } from 'lucide-vue-next';
import { Card } from '../ui/card';

const timeLogItems = [
    {
        label: 'Clock In',
        time: '7:00 AM',
        hasValue: true
    },
    {
        label: 'Break',
        time: '--:--',
        hasValue: false
    },
    {
        label: 'Lunch Break',
        time: '--:--',
        hasValue: false
    },
    {
        label: 'Clock Out',
        time: '--:--',
        hasValue: false
    }
];

const currentTime = ref(new Date().toLocaleTimeString('en-GB', { hour12: false }));

let timer: number | undefined;

onMounted(() => {
    timer = window.setInterval(() => {
        currentTime.value = new Date().toLocaleTimeString('en-GB', { hour12: false });
    }, 1000);
});

onUnmounted(() => {
    if (timer) clearInterval(timer);
});
</script>

<template>
    <Card class="flex flex-col w-full p-4 justify-center items-center">
        <div class="flex flex-col gap-0 w-full">
            <div class="rounded-3xl p-4 rounded-b-none bg-main-50 w-full flex justify-center h-full overflow-hidden">
                <div
                    class="rounded-full w-[172px] h-[172px] my-10 flex items-center flex-col justify-center border-4 border-background-200 relative">
                    <!-- SVG with 4 arcs -->
                    <svg class="absolute inset-0 w-full h-full" viewBox="0 0 172 172">
                        <!-- Top-right arc (Clock In) -->
                        <path d="M 94 14 A 78 78 0 0 1 158 78" fill="none" stroke="currentColor" stroke-width="12"
                            stroke-linecap="round" class="text-main-500" />

                        <!-- Top-left arc (Break Time)-->
                        <path d="M 14 78 A 78 78 0 0 1 78 14" fill="none" stroke="currentColor" stroke-width="12"
                            stroke-linecap="round" class="text-main-200" />

                        <!-- Bottom-left arc (Lunch Break) -->
                        <path d="M 78 158 A 78 78 0 0 1 14 94" fill="none" stroke="currentColor" stroke-width="12"
                            stroke-linecap="round" class="text-main-200" />

                        <!-- Bottom-right arc (Clock Out)-->
                        <path d="M 158 94 A 78 78 0 0 1 94 158" fill="none" stroke="currentColor" stroke-width="12"
                            stroke-linecap="round" class="text-main-200" />
                    </svg>
                    <!-- Content -->
                    <div class="relative z-10 flex flex-col items-center justify-center">
                        <h3 class="text-neutral-900 text-body-large font-bold text-center">7hours</h3>
                        <!-- TODO:: add translate static text -->
                        <p class="text-caption text-neutral-600 text-center">Remaining Time</p>
                    </div>
                </div>
            </div>
            <div class="rounded-3xl w-full justify-center items-center p-4 bg-main-100 rounded-t-none flex flex-col">
                <!-- TODO:: add translate static text -->
                <p class="text-neutral-600 text-caption">Time</p>
                <h3 class="text-body-large text-neutral-900 font-bold">
                    {{ currentTime }}
                </h3>
            </div>
        </div>
        <div class="flex w-full flex-col gap-12">
            <div class="flex gap-4">
                <div v-for="item in timeLogItems" :key="item.label"
                    class="w-full flex flex-col gap-2 items-center rounded-xl p-2 justify-center"
                    :class="item.hasValue ? 'bg-main-100' : 'bg-background-100'">
                    <div class="rounded-full p-2" :class="item.hasValue ? 'bg-main-400' : 'bg-main-200'">
                        <Lightbulb :class="item.hasValue ? 'stroke-white' : 'stroke-neutral-400'" />
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-caption" :class="item.hasValue ? 'text-neutral-800' : 'text-neutral-400'">
                            {{ item.label }}
                        </span>
                        <span class="text-body-normal"
                            :class="item.hasValue ? 'text-background-800' : 'text-neutral-300'">
                            {{ item.time }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-2">
                <Button class="mx-20 rounded-full bg-main-500 border-main-500 py-5">
                    <!-- TODO:: add translate static text -->
                    <span class="font-medium text-[#EDF9FF]">
                        Break
                    </span>
                </Button>
                <!-- TODO:: add translate static text -->
                <p class="text-neutral-700 text-center text-caption">Available until 10:00 AM</p>
            </div>
        </div>
    </Card>
</template>