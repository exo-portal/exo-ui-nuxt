<template>
  <div class="dashboard-card">
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div>
    <div class="card-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<style scoped>
.dashboard-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
}

.card-header {
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #718096;
  margin: 0;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
