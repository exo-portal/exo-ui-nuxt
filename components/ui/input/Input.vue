<script setup lang="ts">
defineOptions({ inheritAttrs: false })
import type { HTMLAttributes, InputTypeHTMLAttribute } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'
import PasswordEyeIcon from '@/assets/svg/PasswordEyeIcon.svg'
import PasswordEyeSlashIcon from '@/assets/svg/PasswordEyeSlashIcon.svg'


const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class'],
  inputSuffixIcon?: object | Function,
  type?: InputTypeHTMLAttribute;
  suffixButton?: boolean;
}>()


const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

// Password visibility toggle
const showPassword = ref(false)
const inputType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password'
  }
  return props.type
})
</script>

<template>
  <template v-if="props.type === 'password'">
    <div class="relative w-full">
      <input autocomplete="" :type="inputType" v-model="modelValue" v-bind="$attrs" data-slot="input" :class="cn(
        'bg-neutral-50 border border-neutral-200 placeholder:text-neutral-400 text-body-normal font-normal rounded-lg px-3.5 py-2.5 w-full outline-none text-neutral-800',
        'focus-visible:bg-main-50 focus-visible:border-main-400 focus-visible:ring-4 focus-visible:ring-main-100',
        'aria-invalid:border-danger-300 aria-invalid:bg-transparent aria-invalid:ring-4 aria-invalid:ring-danger-100',
        props.class,
      )">
      <span class="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1" tabindex="-1" role="button"
        @click="showPassword = !showPassword" @keydown.enter.prevent="showPassword = !showPassword"
        @keydown.space.prevent="showPassword = !showPassword"
        :aria-label="showPassword ? 'Hide password' : 'Show password'">
        <component :is="showPassword ? PasswordEyeIcon : PasswordEyeSlashIcon" />
      </span>
    </div>
  </template>
  <template v-else>
    <div class="relative w-full">
      <input v-model="modelValue" :type="props.type" v-bind="$attrs" data-slot="input" :class="cn(
        'bg-neutral-50 border border-neutral-200 placeholder:text-neutral-400 text-body-normal font-normal rounded-lg px-3.5 py-2.5 w-full outline-none text-neutral-800',
        'focus-visible:bg-main-50 focus-visible:border-main-400 focus-visible:ring-4 focus-visible:ring-main-100',
        'aria-invalid:border-danger-300 aria-invalid:bg-transparent aria-invalid:ring-4 aria-invalid:ring-danger-100',
        props.class,
      )">
      <span
        v-if="props.inputSuffixIcon && (typeof props.inputSuffixIcon === 'object' || typeof props.inputSuffixIcon === 'function')"
        class="absolute right-3 top-1/2 -translate-y-1/2">
        <component :is="props.inputSuffixIcon" />
      </span>
      <button type="button" v-if="suffixButton" class="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 z-10 focus:outline-0 focus:border-0 focus:ring-0">
        <slot name="suffixButton"/>
      </button>
    </div>
  </template>
</template>