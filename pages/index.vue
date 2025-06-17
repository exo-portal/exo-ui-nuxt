<script setup>

useHead({
    title: 'Exo Portal - Home',
})

definePageMeta({
    layout: 'default',
    guestOnly: true,
})

const counter = useCounterStore();

onMounted(() => {
    counter.loadCount()
})

</script>

<template>
    <div>
        <button @click="counter.increment">Count: {{ counter.count }}</button>
    </div>
</template>
