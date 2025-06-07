<script setup lang="ts">
import { BackButton, ResetPasswordForm, ResetPasswordHeader } from '~/components/index';
import { metaTItleBuilder } from '~/lib';
definePageMeta({
    layout: 'auth',
    middleware: ['forgot-flow-middleware']
})


useHead({
    title: metaTItleBuilder("Forgot Password | RESET"),
})
</script>
<template>
    <section class="basis-8/12 flex gap-9 flex-col justify-center items-center">
        <div class="flex flex-col w-lg justify-start">
            <BackButton />
            <ResetPasswordHeader />
            <ResetPasswordForm />
        </div>
    </section>
</template>