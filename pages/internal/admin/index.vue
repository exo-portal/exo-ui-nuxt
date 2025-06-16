<script setup lang="ts">
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
        <h1>Admin</h1>
        <p>This page will display the Admin Home/Dashboard.</p>
    </div>
</template>