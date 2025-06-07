<script setup lang="ts">
import { BackButton, OtpForm, OtpHeader } from '~/components/index';

definePageMeta({
    layout: 'auth'
})

useHead({
    title: 'Exo - Forgot Password | OTP',
})

const router = useRouter()
</script>

<template>
    <main class="basis-8/12 flex gap-9 flex-col justify-center items-center">
        <section class="flex flex-col w-lg justify-start">
            <BackButton />
            <OtpHeader />
            <OtpForm />
        </section>
    </main>
</template>