<script setup lang="ts">
import { Card } from '../ui/card';
import { ChevronRight } from 'lucide-vue-next';
</script>

<template>
    <Card class="w-full sm:w-64 shrink-0 p-4 hover:shadow-md transition-shadow duration-200">
        <img src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80"
            alt="Profile cover" class="w-full h-40 sm:h-44 rounded-lg object-cover" />
        <div class="space-y-3 mt-3">
            <div class="flex justify-between items-center">
                <span class="text-body-small text-neutral-700">Hi <strong class="text-neutral-900">Courtney
                        Henry</strong>!</span>
                <ChevronRight class="w-4 h-4 text-neutral-400 cursor-pointer hover:text-main-500 transition-colors duration-150" />
            </div>
            <div class="space-y-3">
                <div class="flex flex-col gap-0.5">
                    <label class="text-caption text-neutral-400">Position</label>
                    <span class="text-body-small text-neutral-800 font-medium">Senior Backend Developer</span>
                </div>
                <div class="flex flex-col gap-0.5">
                    <label class="text-caption text-neutral-400">Company email</label>
                    <span class="text-body-small text-neutral-800 font-medium break-all">
                        courtney.henry@example.com
                    </span>
                </div>
                <div class="flex flex-col gap-0.5">
                    <label class="text-caption text-neutral-400">Date Today</label>
                    <span class="text-body-small text-neutral-800 font-medium">March 15, 2023</span>
                </div>
            </div>
        </div>
    </Card>
</template>
