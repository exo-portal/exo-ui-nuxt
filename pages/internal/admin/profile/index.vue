<script setup lang="ts">
import { metaTItleBuilder } from '~/lib/utils';

useHead({
    title: metaTItleBuilder('Admin | Profile'),
})

definePageMeta({
    requireAuth: true,
});


const handleOnClickButton = () => {
    console.log('Button clicked');
}
</script>

<template>
    <client-only>
        <h1>Admin</h1>
        <p>This page will display the project team details.</p>
        <button @click="handleOnClickButton">click me</button>
    </client-only>
</template>