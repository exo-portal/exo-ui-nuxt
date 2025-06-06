<script setup lang="ts">
import { PATH } from '~/config';

definePageMeta({
    layout: 'auth'
})

useHead({
    title: 'Exo - Forgot Password | OTP',
})

const router = useRouter()
</script>

<template>
    <div class="min-h-screen">
        <h2 class="text-2xl font-bold mb-4">Wellcome to Forgot Password - OTP</h2>
        <NuxtLink :to="PATH.FORGOT_PASSWORD_RESET.path" class="mx-4 text-blue-500 hover:underline">
            RESET
        </NuxtLink>
        <button @click="router.back()" class="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Back
        </button>
    </div>
</template>