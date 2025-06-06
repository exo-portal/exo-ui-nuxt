<script setup lang="ts">
import { PATH } from '~/config';

definePageMeta({
    layout: 'auth'
})

useHead({
    title: 'Exo - Sign Up',
})
</script>

<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Welcome to Sign in Page</h2>
        <NuxtLink :to="PATH.SIGNIN.path" class="mx-4 text-blue-500 hover:underline">
            Sign In
        </NuxtLink>
        <NuxtLink :to="PATH.SIGNUP_PERSONAL_DETAILS.path" class="mx-4 text-blue-500 hover:underline">
            Personal Details
        </NuxtLink>
        <NuxtLink :to="PATH.FORGOT_PASSWORD.path" class="text-blue-500 hover:underline">
            Forgot Password?
        </NuxtLink>
    </div>
</template>