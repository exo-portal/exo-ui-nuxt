<script setup lang="ts">
import { TopNav } from '~/components/index';
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
        <TopNav />
        <h1>HR</h1>
        <p>This page will display the HR home/dashboard.</p>
    </div>
</template>