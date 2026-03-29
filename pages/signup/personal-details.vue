<script setup lang="ts">
import { BackButton, PersonalDetailsForm, PersonalDetailsHeader } from '~/components/index';
import { metaTItleBuilder } from '~/lib';

definePageMeta({
    layout: 'auth',
    middleware: ['signup-flow-middleware'],
    guestOnly: true,
})

useHead({
    title: metaTItleBuilder("Sign Up | Personal Details"),
})

const router = useRouter()
</script>

<template>
    <section class="flex-1 flex flex-col justify-center items-center px-6 py-10 sm:px-10 md:px-16">
        <div class="flex flex-col w-full max-w-lg justify-start">
            <BackButton />
            <PersonalDetailsHeader />
            <PersonalDetailsForm />
        </div>
    </section>
</template>