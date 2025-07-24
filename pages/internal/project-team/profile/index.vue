<script setup lang="ts">
import { TopNav } from '~/components/index';
import { metaTItleBuilder } from '~/lib/utils';

useHead({
    title: metaTItleBuilder('Project Team | Profile'),
});

definePageMeta({
    requireAuth: true,
});

const handleOnClickButton = () => {
    console.log('Button clicked');
}
</script>

<template>
    <client-only>
        <TopNav />
        <h1>Project Team</h1>
        <p>This page will display the project team details.</p>
        <button @click="handleOnClickButton">click me</button>
    </client-only>
</template>