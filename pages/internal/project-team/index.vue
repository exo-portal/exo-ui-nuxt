<script setup lang="ts">
import { DashboardGrid, DashboardSection, TopNav } from '~/components/index';
import { metaTItleBuilder } from '~/lib/utils';

useHead({
    title: metaTItleBuilder('Project Team'),
})

definePageMeta({
    requireAuth: true,
});

const route = useRoute();
const userId = route.query.userId as string | undefined;

// Add edit mode state
const enableGridLayout = ref(false);
</script>

<template>
    <div>
        <TopNav />
        <DashboardGrid v-if="enableGridLayout" />
        <DashboardSection v-else />
    </div>
</template>