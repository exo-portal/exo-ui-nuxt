<template>
    <FormField v-slot="{ componentField, field, errors }" :name="name">
        <FormItem class="w-full">
            <FormLabel>{{ label }}</FormLabel>
            <FormControl>
                {{ field.value }}
                <component :aria-invalid="errors && errors.length > 0 ? 'true' : 'false'" :is="resolvedComponent(field, errors)" v-bind="{ ...componentField, ...otherProps }" />
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Input } from '@/components/ui/input'
import type { AnchorHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'vue'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import type { FieldBindingObject } from 'vee-validate';

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
    return (field: FieldBindingObject<any>, errors?: string[]) => {
        switch (componentType) {
            case 'input':
                return Input;
            case 'select':
                return customSelectWithSubComponent(field, otherProps?.options, errors);
            default:
                return Input;
        }
    }
})

const customSelectWithSubComponent = (
    field: FieldBindingObject<any>,
    options?: Array<{ value: string; label?: string }>,
    errors?: string[]) => {
    return h(Select, () => [
        h(
            SelectTrigger,
            {
                class: otherProps?.class ? otherProps.class : 'w-full',
                value: field.value,
                hasError: errors && errors.length > 0,
                onClear: () => {
                    field.onChange('');
                },
                enableClear: true,
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