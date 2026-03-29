<script setup lang="ts">
import { BackButton, ExoBrand, OtpForm, OtpHeader } from '~/components/index';
import { metaTItleBuilder } from '~/lib';

definePageMeta({
    layout: 'auth',
    middleware: ['forgot-flow-middleware'],
    guestOnly: true,
})

useHead({
    title: metaTItleBuilder("Forgot Password | OTP"),
})
</script>

<template>
    <section class="flex-1 flex gap-8 flex-col justify-center items-center px-6 py-12 sm:px-10 md:px-16">
        <ExoBrand size="md" orientation="vertical" :show-tagline="true" />
        <div class="flex flex-col w-full max-w-lg justify-start">
            <BackButton />
            <OtpHeader />
            <OtpForm />
        </div>
    </section>
</template>