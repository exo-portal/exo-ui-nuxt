<script setup lang="ts">
import { BackButton, ForgotPasswordForm, ForgotPasswordHeader } from '~/components/index';
import { metaTItleBuilder } from '~/lib';

definePageMeta({
    layout: 'auth'
})

useHead({
    title: metaTItleBuilder("Forgot Password"),
})
</script>

<template>
    <main class="basis-8/12 flex gap-9 flex-col justify-center items-center">
        <section class="flex flex-col w-lg justify-start">
            <BackButton />
            <ForgotPasswordHeader />
            <ForgotPasswordForm />
        </section>
    </main>
</template>