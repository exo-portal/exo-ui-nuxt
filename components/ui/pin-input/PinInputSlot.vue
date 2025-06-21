<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { PinInputInput, type PinInputInputProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

const props = defineProps<PinInputInputProps & { class?: HTMLAttributes['class'], ariaInvalid: boolean }>()

const delegatedProps = reactiveOmit(props, 'class')

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <PinInputInput style="font-size: var(--sub-heading-3);" data-slot="pin-input-slot" v-bind="forwardedProps"
    :aria-label="ariaInvalid" :class="cn(
      'border-input focus:border-ring focus:ring-ring/50 focus:aria-invalid:ring-destructive/20 dark:bg-input/30 dark:focus:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus:aria-invalid:border-destructive relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline-none text-center first:rounded-l-md first:border-l last:rounded-r-md focus:z-10 focus:ring-[3px]', props.class,
      'h-20 w-20 border border-neutral-500 rounded-3xl first:rounded-l-3xl last:rounded-r-3xl',
      'focus-visible:bg-main-50 focus-visible:border-main-400 focus-visible:ring-4 focus-visible:ring-main-100',
      'aria-invalid:border-danger-300 aria-invalid:bg-transparent aria-invalid:ring-4 aria-invalid:ring-danger-100',
      'font-bold text-neutral-950',
    )" />
</template>
