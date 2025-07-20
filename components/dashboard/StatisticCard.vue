<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
  statistics: string | number;
  icons?: string;
  redirectTo?: string; // router name for navigation
  gridItem?: any; // Accept grid item prop (passed by grid layout)
}

const props = defineProps<Props>();
</script>

<template>
    <div class="flex justify-center items-center h-full">
        <div class="statistic-card">
            <div v-if="props.icons" class="icon">
                {{ props.icons }}
            </div>
            <h3 class="title">{{ props.title }}</h3>
            <div class="statistics">{{ props.statistics }}</div>
            <p v-if="props.subtitle" class="subtitle">{{ props.subtitle }}</p>
            <router-link v-if="props.redirectTo" :to="{ name: props.redirectTo }" class="redirect-link">
                View Details
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.statistic-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    background: white;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    width: 100%;
    height: 100%;
    text-align: center;
}

.icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.title {
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    margin: 0 0 0.5rem 0;
}

.statistics {
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.25rem;
}

.subtitle {
    font-size: 0.75rem;
    color: #6b7280;
    margin: 0 0 1rem 0;
}

.redirect-link {
    font-size: 0.75rem;
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
}

.redirect-link:hover {
    text-decoration: underline;
}
</style>