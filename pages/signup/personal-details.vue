<script setup lang="ts">
import { BackButton, PersonalDetailsForm, PersonalDetailsHeader } from '~/components/index';
import { metaTItleBuilder } from '~/lib';

definePageMeta({
    layout: 'auth'
})

useHead({
    title: metaTItleBuilder("Sign Up | Personal Details"),
})

const router = useRouter()
</script>

<template>
    <section class="basis-8/12 flex gap-9 flex-col justify-center items-center">
        <div class="flex flex-col w-lg justify-start">
            <BackButton />
            <PersonalDetailsHeader />
            <PersonalDetailsForm />
        </div>
    </section>
</template>