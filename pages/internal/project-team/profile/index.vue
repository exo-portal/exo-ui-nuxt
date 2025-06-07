<script setup lang="ts">
import { metaTItleBuilder } from '~/lib/utils';

useHead({
    title: metaTItleBuilder('Project Team | Profile'),
})
</script>

<template>
    <div>
        <h1>Project Team</h1>
        <p>This page will display the project team details.</p>
    </div>
</template>