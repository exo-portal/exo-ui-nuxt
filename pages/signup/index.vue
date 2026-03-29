<script setup lang="ts">
import { SignUpDividerForm, SignUpForm, SignUpOauthForm } from '~/components/index';
import { metaTItleBuilder } from '~/lib/utils';

definePageMeta({
    layout: 'auth',
    guestOnly: true
})

useHead({
    title: metaTItleBuilder("Sign Up"),
})
</script>

<template>
    <client-only>
        <section class="flex-1 flex gap-8 flex-col justify-center items-center px-6 py-12 sm:px-10 md:px-16">
            <SignUpOauthForm />
            <SignUpDividerForm />
            <SignUpForm />
        </section>
    </client-only>
</template>