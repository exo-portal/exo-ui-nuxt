<template>
    <FormField v-slot="{ componentField }" :name="name">
        <FormItem>
            <FormLabel>{{ label }}</FormLabel>
            <FormControl>
                <component :is="resolvedComponent" v-bind="{ ...componentField, ...otherProps }" />
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

interface FormFieldInputProps {
    componentType: 'input' | 'select' | 'textarea' | 'checkbox' | 'radio' | 'datePicker' | 'tel' | 'otp-input'
    componentField?: any
    label?: string
    name: string
    otherProps?: Partial<HTMLAttributes & AnchorHTMLAttributes & InputHTMLAttributes>
}

const { name, componentType, label, otherProps } = defineProps<FormFieldInputProps>()


const resolvedComponent = computed(() => {
    switch (componentType) {
        case 'input':
            return Input
        // case 'select':
        //   return Select
        // Add more cases as needed
        default:
            return Input
    }
})
</script>