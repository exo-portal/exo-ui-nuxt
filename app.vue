<script setup lang="ts">
useHead({
  title: 'Exo Portal',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'author', content: 'Exo Portal Team' }
  ]
})

useSeoMeta({
  title: 'Exo Portal',
  description: 'Exo Portal - Your gateway to personalized experiences and resources.',
  keywords: 'Exo Portal, dashboard, user portal, resources, personalized',
  ogTitle: 'Exo Portal',
  ogDescription: 'Access your personalized dashboard and resources with Exo Portal.',
  ogType: 'website'
})

import { Button } from '@/components/ui/button'

const handleClick = () => {
  console.log('Button clicked')
}
</script>

<template>
  <div class="">
    <Button @click="handleClick">Click me</Button>
  </div>
</template>
