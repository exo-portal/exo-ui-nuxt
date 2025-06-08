<template>
    <FormField v-slot="{ componentField, errors }" :name="name">
        <FormItem class="w-full">
            <FormLabel>{{ label }}</FormLabel>
            <FormControl>
                <component :is="resolvedComponent(errors)" v-bind="{ ...componentField, ...otherProps }" />
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Input } from '@/components/ui/input'
// import other components as needed

import type { AnchorHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'vue'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';

interface FormFieldInputProps {
    componentType: 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'datePicker' | 'tel';
    label?: string;
    name: string;
    otherProps?: Partial<HTMLAttributes & AnchorHTMLAttributes & InputHTMLAttributes> & {
        inputSuffixIcon?: object | Function,
        options?: Array<{ value: string; label?: string }>;
    }
}

const { name, componentType, label, otherProps } = defineProps<FormFieldInputProps>()
const resolvedComponent = computed(() => {
    return (errors?: string[]) => {
        switch (componentType) {
            case 'input':
                return Input;
            case 'select':
                return customSelectWithSubComponent(otherProps?.options, errors);
            default:
                return Input;
        }
    }
})

const customSelectWithSubComponent = (options?: Array<{ value: string; label?: string }>, errors?: string[]) => {
    return h(Select, () => [
        h(
            SelectTrigger,
            {
                class: otherProps?.class ? otherProps.class : 'w-full',
                'aria-invalid': errors && errors.length > 0 ? 'true' : 'false'
            },
            () => [
                h(
                    SelectValue,
                    { placeholder: otherProps?.placeholder ? otherProps.placeholder : 'Select an option' }
                )
            ]
        ),
        h(SelectContent, {}, () => [
            h(SelectGroup, {}, () => [
                h(SelectLabel, {}, 'Options'),
                ...(options?.map(option => h(SelectItem, { value: option.value },
                    option.label ?? option.value
                )) ?? [])
            ])
        ])
    ])
}
</script>