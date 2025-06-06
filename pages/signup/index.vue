<script setup lang="ts">
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
        <NuxtLink to="/signin" class="text-blue-500 hover:underline">
            Sign In
        </NuxtLink>
        <NuxtLink to="/forgot-password" class="text-blue-500 hover:underline">
            Forgot Password?
        </NuxtLink>
    </div>
</template>