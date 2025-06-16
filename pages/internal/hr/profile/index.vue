<script setup lang="ts">
import { metaTItleBuilder } from '~/lib/utils';

useHead({
    title: metaTItleBuilder('HR | Profile'),
});

definePageMeta({
    requireAuth: true,
});
</script>

<template>
    <div>
        <h1>HR Profile</h1>
        <p>This page will display the project team details.</p>
    </div>
</template>