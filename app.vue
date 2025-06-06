<script setup lang="ts">
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
