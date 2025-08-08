<script setup>
import { ArrowUpRight } from 'lucide-vue-next';
import { Card, CardContent, CardTitle } from '../ui/card'
import { ScrollArea } from '../ui/scroll-area';
</script>

<template>
    <Card class="flex flex-col w-full p-4">
        <CardTitle class="flex justify-between items-center">
            <span class="text-body-large font-medium text-neutral-950">
                Attendance
            </span>
            <ArrowUpRight />
        </CardTitle>
        <CardContent class="p-0">
            <ScrollArea class="w-full h-[100px] pr-4">
                <div class="p-4 border rounded-xl flex justify-between items-center border-neutral-200">
                    <div class="flex flex-col gap-2">
                        <span class="text-body-normal text-neutral-800 font-bold">Software Engineer Team</span>
                        <div class="flex gap-2">
                            <span class="text-main-500 text-body-normal">38</span>
                            <span class="text-neutral-800 text-body-normal">Total members</span>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </CardContent>
    </Card>
</template>
