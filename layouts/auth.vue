<script setup lang="ts">
import { Instruction, LoadingMask } from '~/components/index';
</script>

<template>
  <client-only>
    <main class="flex min-h-screen bg-neutral-50">
      <LoadingMask />
      <Instruction />
      <slot />
    </main>
  </client-only>
</template>