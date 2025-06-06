<script setup lang="ts">
const router = useRouter()
</script>

<template>
    <div class="min-h-screen flex items-center justify-center">
        <h2 class="text-2xl font-bold mb-4">Wellcome to Forgot Password</h2>
        <button @click="router.back()" class="mt-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Back
        </button>
    </div>
</template>