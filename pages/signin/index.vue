<script setup lang="ts">
import { SignInDividerForm, SigninForm, SignInOauthForm } from '~/components/index';
import { metaTItleBuilder } from '~/lib/utils';

useHead({
  title: metaTItleBuilder("Sign In"),
})

definePageMeta({
  layout: 'auth'
})

</script>

<template>
  <main class="basis-8/12 flex gap-9 flex-col justify-center items-center">
    <SignInOauthForm />
    <SignInDividerForm />
    <SigninForm />
  </main>
</template>