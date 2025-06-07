<script setup lang="ts">
import { metaTItleBuilder } from '~/lib/utils';

useHead({
    title: metaTItleBuilder('Project Team'),
})
</script>

<template>
    <div>
        <h1>Project Team</h1>
        <p>This page will display the project team Home/Dashboard.</p>
    </div>
</template>