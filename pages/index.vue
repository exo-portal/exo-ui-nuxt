<script setup>

useHead({
    title: 'Exo Portal - Home',
})

definePageMeta({
    layout: 'default'
})

const counter = useCounterStore();

onMounted(() => {
    counter.loadCount()
})

</script>

<template>
    <div>
        <h1>{{ $t("welcome", { dynamic: "testing" }) }}</h1>
        <button @click="counter.increment">Count: {{ counter.count }}</button>
    </div>
</template>
