<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from '~/assets'

const props = withDefaults(
  defineProps<SelectTriggerProps & {
    class?: HTMLAttributes['class'],
    size?: 'sm' | 'default',
    enableClear?: boolean,
    onClear?: () => void
  }>(),
  { size: 'default', enableClear: false },
)

const delegatedProps = reactiveOmit(props, 'class', 'size')
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <div class="relative w-full">
    <SelectTrigger data-slot="select-trigger" :data-size="size" v-bind="forwardedProps" :class="cn(
      `border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
      'data-[placeholder]:text-neutral-400 text-neutral-800 text-body-normal',
      'px-3.5 py-[22px] bg-neutral-50 border border-neutral-200 text-neutral-400 text-body-normal',
      props.class,
    )">
      <slot />
      <SelectIcon as-child>
        <ChevronDownIcon class="size-4 opacity-50" />
      </SelectIcon>
    </SelectTrigger>
  </div>

</template>
