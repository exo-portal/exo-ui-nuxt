<script setup lang="ts">
import type { ProgressRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import {
  ProgressIndicator,
  ProgressRoot,

} from "reka-ui"
import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<ProgressRootProps & { class?: HTMLAttributes["class"], isVertical?: boolean }>(),
  {
    modelValue: 0,
    isVertical: false
  },
)

const delegatedProps = reactiveOmit(props, "class")
</script>

<template>
  <ProgressRoot data-slot="progress" v-bind="delegatedProps" :class="cn(
    props.isVertical ? 'bg-neutral-100 relative h-full w-2 overflow-hidden rounded-full' : 'bg-neutral-100 relative h-2 w-full overflow-hidden rounded-full',
    props.class,
  )
    ">
    <ProgressIndicator data-slot="progress-indicator" class="bg-main-400 h-full w-full flex-1 transition-all"
      :style="isVertical ? `transform: translateY(${100 - (props.modelValue ?? 0)}%);` : `transform: translateX(-${100 - (props.modelValue ?? 0)}%);`" />
  </ProgressRoot>
</template>
