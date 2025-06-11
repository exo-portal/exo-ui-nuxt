<script setup lang="ts">
defineProps<{
    loading: boolean
}>()
</script>

<template>
    <template v-if="!loading">
        <slot />
    </template>
    <template v-else>
        <slot name="fallback" />
    </template>
</template>