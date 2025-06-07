<script setup lang="ts">
import { SignUpDividerForm, SignUpForm, SignUpOauthForm } from '~/components/index';
import { metaTItleBuilder } from '~/lib/utils';

definePageMeta({
    layout: 'auth'
})

useHead({
    title: metaTItleBuilder("Sign Up"),
})
</script>

<template>
    <main class="basis-8/12 flex gap-9 flex-col justify-center items-center">
        <SignUpOauthForm />
        <SignUpDividerForm />
        <SignUpForm />
    </main>
</template>