<script setup lang="ts">
import { metaTItleBuilder } from '~/lib/utils';

useHead({
    title: metaTItleBuilder('HR'),
});

definePageMeta({
    requireAuth: true,
});
</script>

<template>
    <div>
        <h1>HR</h1>
        <p>This page will display the HR home/dashboard.</p>
    </div>
</template>