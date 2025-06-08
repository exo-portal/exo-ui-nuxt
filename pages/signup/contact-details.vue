<script setup lang="ts">
import { metaTItleBuilder } from '~/lib';

definePageMeta({
    layout: 'auth',
    middleware: ['signup-flow-middleware']
})

useHead({
    title: metaTItleBuilder("Sign Up | Contact Details"),
})
const router = useRouter()
</script>

<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Welcome to Sign in Page CONTACT Details</h2>
        <button @click="router.back()" class="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Back
        </button>
    </div>
</template>