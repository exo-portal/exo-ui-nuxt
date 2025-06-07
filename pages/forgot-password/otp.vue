<script setup lang="ts">
import { BackButton, OtpForm, OtpHeader } from '~/components/index';
import { metaTItleBuilder } from '~/lib';

definePageMeta({
    layout: 'auth'
})

useHead({
    title: metaTItleBuilder("Forgot Password | OTP"),
})
</script>

<template>
    <section class="basis-8/12 flex gap-9 flex-col justify-center items-center">
        <div class="flex flex-col w-lg justify-start">
            <BackButton />
            <OtpHeader />
            <OtpForm />
        </div>
    </section>
</template>