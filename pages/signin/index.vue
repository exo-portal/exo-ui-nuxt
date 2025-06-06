<script setup lang="ts">
import { DividerForm, OauthForm, SigninForm } from '~/components/index';

useHead({
  title: 'Exo - Sign In',
})

definePageMeta({
  layout: 'auth'
})

</script>

<template>
  <main class="basis-8/12 flex flex-col justify-center items-center">
    <OauthForm />
    <DividerForm />
    <SigninForm />
  </main>
</template>