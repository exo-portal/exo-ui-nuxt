<script setup lang="ts">
import Instruction from '~/components/auth-instruction/instruction.vue';
</script>

<template>
  <main class="flex min-h-screen bg-neutral-50">
    <Instruction />
    <slot />
  </main>
</template>