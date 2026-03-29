<script setup lang="ts">
import { SignInDividerForm, SigninForm, SignInOauthForm } from '~/components/index';
import { metaTItleBuilder } from '~/lib/utils';

useHead({
  title: metaTItleBuilder("Sign In"),
})

definePageMeta({
  layout: 'auth',
  guestOnly: true
})

</script>

<template>
  <main class="flex-1 flex gap-8 flex-col justify-center items-center px-6 py-12 sm:px-10 md:px-16">
    <SignInOauthForm />
    <SignInDividerForm />
    <SigninForm />
  </main>
</template>