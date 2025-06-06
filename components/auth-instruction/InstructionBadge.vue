<template>
  <div v-for="badge in badges" :key="badge.number" :data-testid="`instruction-badge-wrapper-${badge.number}`"
    class="flex gap-2 bg-[#B6C2D3]/40 p-6 rounded-4xl items-center mb-2">
    <div class="flex items-center justify-center bg-neutral-50 w-6 h-6 rounded-full text-neutral-950 text-body-normal">
      {{ badge.number }}
    </div>
    <span :data-testid="`instruction-badge-title-${badge.number}`" class="text-neutral-50 text-body-normal">
      {{ badge.title }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  badges: Array<{ number: number; title: string }>
}>()
</script>