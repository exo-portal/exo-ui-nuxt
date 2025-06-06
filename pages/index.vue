<script lang="ts">

useHead({
    title: 'Exo Portal - Home',
})

definePageMeta({
    layout: 'default'
})

import { translate } from "@/lib/translate";

const welcomeText = translate('welcdwaome', { dynamic: 'yawas' });

const number: number = "sadw";

</script>   

<template>
    <div class="">
        <h1>{{ welcomeText }}</h1>
    </div>
</template>
