<script setup lang="ts">
import { TopNav } from '~/components/index';
import { metaTItleBuilder } from '~/lib/utils';

useHead({
    title: metaTItleBuilder('Admin'),
})

definePageMeta({
    requireAuth: true,
});
</script>

<template>
    <div>
        <TopNav />
        <h1>Admin</h1>
        <p>This page will display the Admin Home/Dashboard.</p>
    </div>
</template>