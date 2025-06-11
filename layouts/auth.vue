<script setup lang="ts">
import { Instruction, LoadingMask } from '~/components/index';
</script>

<template>
  <main class="flex min-h-screen bg-neutral-50">
    <LoadingMask />
    <Instruction />
    <slot />
  </main>
</template>