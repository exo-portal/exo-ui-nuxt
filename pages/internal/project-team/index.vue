<script setup lang="ts">
import { metaTItleBuilder } from '~/lib/utils';

const route = useRoute();
const userId = route.query.userId as string | undefined;

useHead({
    title: metaTItleBuilder('Project Team'),
})

definePageMeta({
    requireAuth: true,
});
</script>

<template>
    <div>
        <h1>Project Team</h1>
        <p>This page will display the project team Home/Dashboard.</p>
        <div v-if="userId">User ID: {{ userId }}</div>
    </div>
</template>