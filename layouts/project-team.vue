<script setup lang="ts">
import { LoadingMask } from '~/components/index';
import { useIdle } from '@vueuse/core'
import { watch } from 'vue'
import { useRouter } from 'vue-router'


console.log('project-team layout mounted')

const router = useRouter()

const { idle } = useIdle(20 * 1000)
watch(idle, (isIdle) => {
    if (isIdle) {
        router.push('/logout')
    }
})
</script>

<template>
    <main class="flex min-h-screen bg-amber-300">
        <LoadingMask />
        <slot />
    </main>
</template>