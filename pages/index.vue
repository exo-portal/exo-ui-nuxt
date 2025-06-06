<script setup>

useHead({
    title: 'Exo Portal - Home',
})

definePageMeta({
    layout: 'default'   
})

</script>

<template>
    <div>
        <h1>{{ $t("welcome", { dynamic: "testing" }) }}</h1>
    </div>
</template>
