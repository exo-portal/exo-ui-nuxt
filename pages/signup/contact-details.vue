<script setup lang="ts">
import { BackButton, ContactDetailsForm, ContactDetailsHeader } from '~/components/index';
import { metaTItleBuilder } from '~/lib';

definePageMeta({
    layout: 'auth',
    middleware: ['signup-flow-middleware'],
    guestOnly: true,
});

useHead({
    title: metaTItleBuilder("Sign Up | Contact Details"),
});
</script>

<template>
    <section class="basis-8/12 flex gap-9 flex-col justify-center items-center">
        <div class="flex flex-col w-lg justify-start">
            <BackButton />
            <ContactDetailsHeader />
            <ContactDetailsForm />
        </div>
    </section>
</template>