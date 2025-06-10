<template>
    <FormField v-slot="{ componentField, field, errors }" :name="name">
        <FormItem :class="otherProps?.notFullWidth ? '' : 'w-full'">
            <FormLabel>{{ label }}</FormLabel>
            <FormControl>
                <component :aria-invalid="errors && errors.length > 0 ? 'true' : 'false'" :is="resolvedComponent"
                    v-bind="{
                        ...componentField,
                        ...otherProps,
                        modelValue: field.value,
                        'onUpdate:modelValue': field.onChange,
                        options: otherProps?.options,
                        placeholder: otherProps?.placeholder,
                        hasError: errors && errors.length > 0,
                    }" />
            </FormControl>
            <FormMessage />
        </FormItem>
    </FormField>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { Input } from '@/components/ui/input'
import type { AnchorHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'vue'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DatePicker } from '../ui/date-picker';
import { PhoneNumber } from '../ui/phone-number';
import type { PhoneOption } from '~/types/types';

interface FormFieldInputProps {
    componentType: 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'datePicker' | 'tel';
    label?: string;
    name: string;
    otherProps?: Partial<HTMLAttributes & AnchorHTMLAttributes & InputHTMLAttributes> & {
        inputSuffixIcon?: object | Function,
        options?: Array<{ value: string; label?: string, icon?: string, phonePlaceholder?: string, countryCode?: string }>;
        notFullWidth?: boolean;
    }
}

const { name, componentType, label, otherProps } = defineProps<FormFieldInputProps>()

const resolvedComponent = computed(() => {
    switch (componentType) {
        case 'input':
            return Input;
        case 'datePicker':
            return CustomDatePicker;
        case 'select':
            return CustomSelect;
        case 'tel':
            return CustomTel;
        default:
            return Input;
    }
});

const CustomDatePicker = defineComponent({
    props: {
        modelValue: [String, Date],
        placeholder: String,
        hasError: Boolean
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        return () =>
            h(DatePicker, {
                value: props.modelValue,
                'onUpdate:value': (val: any) => emit('update:modelValue', val),
                placeholder: props.placeholder,
                hasError: props.hasError
            });
    }
})

const CustomSelect = defineComponent({
    props: {
        modelValue: [String, Number],
        options: Array<{ value: string; label?: string }>,
        placeholder: String,
        hasError: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        return () =>
            h(
                Select,
                {
                    modelValue: props.modelValue,
                    'onUpdate:modelValue': (val: any) => emit('update:modelValue', val),
                },
                {
                    default: () => [
                        h(
                            SelectTrigger,
                            {
                                class: 'w-full',
                                hasError: props.hasError,
                                enableClear: true,
                                value: props.modelValue,
                                onClear: () => emit('update:modelValue', ''),
                            },
                            () => [
                                h(SelectValue, { placeholder: props.placeholder || 'Select an option' }),
                            ]
                        ),
                        h(SelectContent, {}, () => [
                            h(SelectGroup, {}, () => [
                                ...(props.options?.map(option =>
                                    h(SelectItem, { value: option.value }, option.label ?? option.value)
                                ) ?? []),
                            ]),
                        ]),
                    ],
                }
            );
    },
});

const CustomTel = defineComponent({
    props: {
        modelValue: String,
        placeholder: String,
        hasError: Boolean,
        options: {
            type: Array as PropType<PhoneOption[]>,
            default: () => []
        }
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        return () =>
            h(PhoneNumber, {
                modelValue: props.modelValue ?? '',
                'onUpdate:modelValue': (val: any) => emit('update:modelValue', val),
                options: props.options,
                placeholder: props.placeholder,
                hasError: props.hasError
            });
    }
});

</script>