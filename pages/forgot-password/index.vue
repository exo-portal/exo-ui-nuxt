<script setup lang="ts">
import { BackButton, ForgotPasswordForm, ForgotPasswordHeader } from '~/components/index';
import { metaTItleBuilder } from '~/lib';

definePageMeta({
    layout: 'auth',
    guestOnly: true,
})

useHead({
    title: metaTItleBuilder("Forgot Password"),
})
</script>

<template>
    <main class="flex-1 flex flex-col justify-center items-center px-6 py-10 sm:px-10 md:px-16">
        <section class="flex flex-col w-full max-w-lg justify-start">
            <BackButton />
            <ForgotPasswordHeader />
            <ForgotPasswordForm />
        </section>
    </main>
</template>