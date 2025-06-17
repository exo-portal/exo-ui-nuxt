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
        <section class="basis-8/12 flex gap-9 flex-col justify-center items-center">
            <SignUpOauthForm />
            <SignUpDividerForm />
            <SignUpForm />
        </section>
    </client-only>
</template>