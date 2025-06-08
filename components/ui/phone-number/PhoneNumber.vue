<script setup lang="ts">
import { cn } from '~/lib';
import { Select, SelectTrigger, SelectValue } from '../select';
import { Input } from '../input';

</script>

<template>
    <div :class="cn('has-[input:focus-within]:bg-main-50 has-[input:focus-visible]:border-main-400 has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-main-100',
        'flex group bg-neutral-50 border border-neutral-200 rounded-lg w-full'
    )">
        <Select>
            <SelectTrigger is-input-group class="w-[80px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="US">US</SelectItem>
                    <SelectItem value="PH">PH</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <Input class="w-full border-l-0 rounded-l-none bg-transparent border-0 rounded-none focus-visible:ring-0 focus-visible:border-0 focus-visible:bg-transparent group-focus-within:bg-main-50" placeholder="+639 291 2231" />
    </div>
</template>