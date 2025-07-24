<script setup lang="ts">
import { Card } from '../ui/card';

</script>

<template>
    <Card class="w-full p-4">
        <img src="https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=400&q=80"
            alt="Golden Retriever" class="w-full h-52 rounded-lg mx-auto object-cover" />
        <div class="space-y-4">

            <div class="flex justify-between items-center">
                <span class="">Hi <strong>Courtney Henry</strong>!</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 cursor-pointer" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </div>
            <div class="space-y-4">
                <div class="flex flex-col">
                    <label class="text-label text-neutral-400" for="">Position:</label>
                    <span class="text-background-800 text-body-normal">Senior Backend Developer</span>
                </div>
                <div class="flex flex-col">
                    <label class="text-label text-neutral-400" for="">Company email:</label>
                    <span class="text-background-800 text-body-normal">courtney.henry@example.com</span>
                </div>
                <div class="flex flex-col">
                    <label class="text-label text-neutral-400" for="">Date Today:</label>
                    <span class="text-background-800 text-body-normal">March 15, 2023</span>
                </div>
            </div>
        </div>
    </Card>
</template>