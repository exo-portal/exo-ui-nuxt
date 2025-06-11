<script setup lang="ts">
import { cn, formatPhoneNumber, liveFormat } from '~/lib';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '../select';
import { Input } from '../input';
import type { PhoneOption } from '~/types/types';

// Define props for the component
const props = withDefaults(defineProps<{
    options: PhoneOption[];
    modelValue: string;
    hasError?: boolean;
}>(), {
    hasError: false
});

// Define emits for the component
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>();

// Reactive references for selected option and input value
const selected = ref(props.options?.[0]?.value || ''); // default to first option or empty

// Ensure selected is always a valid option
const selectedOption = computed(() =>
    props.options?.find(o => o.value === selected.value)
);

// Ensure selectedOption is always defined
const inputValue = ref(props.modelValue ?? '');

// Default placeholder if not set in option
const inputPlaceholder = ref(selectedOption.value?.phonePlaceholder || '+639 291 2231');

// Watch for changes in selected option to update placeholder
watch(selected, (val) => {
    const opt = props.options?.find(o => o.value === val);
    inputPlaceholder.value = opt?.phonePlaceholder || '+639 291 2231';
}, { immediate: true });


// Handle input change
const onInputTel = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const rawValue = input.value;
    const country = selectedOption.value?.label || '';
    const countryCode = selectedOption.value?.countryCode || '';

    // Live format for display only
    inputValue.value = liveFormat({
        input: rawValue,
        country,
        countryCode,
    });
}

// Emit only on blur (or you can debounce)
const onBlurTel = () => {
    const country = selectedOption.value?.countryCode || '';
    emit('update:modelValue', inputValue.value ? formatPhoneNumber({
        value: inputValue.value,
        country,
    }) : '');
}

// Handle focus to format the input value
const onFocusTel = (e: FocusEvent) => {
    const input = e.target as HTMLInputElement;
    const rawValue = input.value;
    const country = selectedOption.value?.label || '';
    const countryCode = selectedOption.value?.countryCode || '';

    const stringValue = liveFormat({
        input: rawValue,
        country,
        countryCode,
    });

    const formattedValue = formatPhoneNumber({
        value: stringValue,
        country,
    });

    inputValue.value = formattedValue;
}

// ...existing code...
const onSelectChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    selected.value = select.value;
    inputValue.value = '';
    inputPlaceholder.value = selectedOption.value?.phonePlaceholder || '+639 291 2231';

    emit('update:modelValue', '');
};

</script>

<template>
    <div :aria-invalid="hasError" :class="cn('has-[input:focus-within]:bg-main-50 has-[input:focus-visible]:border-main-400 has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-main-100',
        'flex group bg-neutral-50 border border-neutral-200 rounded-lg w-full',
        'aria-invalid:border-danger-300 aria-invalid:bg-transparent aria-invalid:ring-4 aria-invalid:ring-danger-100'
    )">
        <Select v-model="selected" @change="onSelectChange">
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
            :placeholder="inputPlaceholder" v-model="inputValue" @input="onInputTel" @blur="onBlurTel"
            @focus="onFocusTel" />
    </div>
</template>