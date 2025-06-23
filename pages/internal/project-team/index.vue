<script setup lang="ts">
import { TopNav } from '~/components/index';
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
        <TopNav />
        <h1>Project Team</h1>
        <p>This page will display the project team Home/Dashboard.</p>
        <div v-if="userId">User ID: {{ userId }}</div>
    </div>
</template>