<script setup lang="ts">
import { useLoadingStore } from '~/stores/useLoadingStore';
const loadingStore = useLoadingStore();
</script>

<template>
    <div v-if="loadingStore.loading" class="fixed h-screen w-screen cursor-progress z-50" />
</template>