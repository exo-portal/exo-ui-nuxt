<script setup lang="ts">
import { cn } from '~/lib';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../select';
import { Input } from '../input';

const props = defineProps({
    options: Array<{ value: string; label?: string, icon?: string, phonePlaceholder?: string }>
});

const selected = ref(props.options?.[0]?.value || ''); // default to first option or empty

const selectedOption = computed(() =>
    props.options?.find(o => o.value === selected.value)
);

// Default placeholder if not set in option
const inputPlaceholder = ref(selectedOption.value?.phonePlaceholder || '+639 291 2231');

watch(selected, (val) => {
    const opt = props.options?.find(o => o.value === val);
    inputPlaceholder.value = opt?.phonePlaceholder || '+639 291 2231';
}, { immediate: true });

</script>

<template>
    <div :class="cn('has-[input:focus-within]:bg-main-50 has-[input:focus-visible]:border-main-400 has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-main-100',
        'flex group bg-neutral-50 border border-neutral-200 rounded-lg w-full'
    )">
        <Select v-model="selected">
            <SelectTrigger is-input-group class="w-[130px]">
                <SelectValue>
                    <template #default>
                        <template v-if="selectedOption">
                            <img v-if="selectedOption.icon" :src="selectedOption.icon" :alt="selectedOption.label"
                                class="inline-block w-5 h-5 mr-1" />
                            {{ selectedOption.label || 'PH' }}
                        </template>
                        <template v-else>
                            PH
                        </template>
                    </template>
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem v-for="option in options" :key="option.value" :value="option.value"
                        class="cursor-pointer">
                        <template v-if="option.icon">
                            <img :src="option.icon" :alt="option.label" class="inline-block w-5 h-5 mr-1" />
                        </template>
                        {{ option.label }}
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
        <Input
            class="w-full border-l-0 rounded-l-none bg-transparent border-0 rounded-none focus-visible:ring-0 focus-visible:border-0 focus-visible:bg-transparent group-focus-within:bg-main-50"
            :placeholder="inputPlaceholder" />
    </div>
</template>