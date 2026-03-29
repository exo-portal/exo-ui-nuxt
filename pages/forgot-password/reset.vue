<script setup lang="ts">
import { BackButton, ExoBrand, ResetPasswordForm, ResetPasswordHeader } from '~/components/index';
import { metaTItleBuilder } from '~/lib';
definePageMeta({
    layout: 'auth',
    middleware: ['forgot-flow-middleware'],
    guestOnly: true,
})


useHead({
    title: metaTItleBuilder("Forgot Password | RESET"),
})
</script>
<template>
    <section class="flex-1 flex gap-8 flex-col justify-center items-center px-6 py-12 sm:px-10 md:px-16">
        <ExoBrand size="md" orientation="vertical" :show-tagline="true" />
        <div class="flex flex-col w-full max-w-lg justify-start">
            <BackButton />
            <ResetPasswordHeader />
            <ResetPasswordForm />
        </div>
    </section>
</template>