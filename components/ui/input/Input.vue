<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    :class="cn(
      'bg-neutral-50 border border-neutral-200 placeholder:text-neutral-400 text-body-normal font-normal rounded-lg px-3.5 py-2.5 w-full outline-none text-neutral-800',
      'focus-visible:bg-main-50 focus-visible:border-main-400 focus-visible:ring-4 focus-visible:ring-main-100',
      'aria-invalid:border-danger-300 aria-invalid:bg-transparent aria-invalid:ring-4 aria-invalid:ring-danger-100',
      props.class,
    )"
  >
</template>
