<script setup lang="ts">
import { BackIcon } from '~/assets/index';
import Button from '../ui/button/Button.vue';

const router = useRouter();
</script>

<template>
    <Button class="py-2 px-4 items-center w-fit flex gap-2 hover:bg-neutral-700" @click="router.back()" variant="ghost"
        type="button" aria-label="Go back">
        <BackIcon class="stroke-neutral-500" />
        <span class="text-body-normal text-neutral-500">{{ $t('common.back') }}</span>
    </Button>
</template>