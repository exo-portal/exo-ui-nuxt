<template>
  <DashboardCard title="Recent Activity" subtitle="Latest team updates">
    <div class="activity-list">
      <div v-for="activity in activities" :key="activity.id" class="activity-item">
        <div class="activity-dot"></div>
        <div class="activity-content">
          <div class="activity-title">{{ activity.title }}</div>
          <div class="activity-time">{{ activity.time }}</div>
        </div>
      </div>
    </div>
  </DashboardCard>
</template>

<script setup lang="ts">
import DashboardCard from './DashboardCard.vue';

interface Activity {
  id: number;
  title: string;
  time: string;
}

// Mock data - replace with real data from your API
const activities = ref<Activity[]>([
  { id: 1, title: 'John completed UI Design task', time: '2 hours ago' },
  { id: 2, title: 'Sarah joined the team', time: '5 hours ago' },
  { id: 3, title: 'Project milestone reached', time: '1 day ago' },
  { id: 4, title: 'Code review completed', time: '2 days ago' },
]);
</script>

<style scoped>
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.activity-dot {
  width: 8px;
  height: 8px;
  background-color: #4299e1;
  border-radius: 50%;
  margin-top: 0.25rem;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 0.875rem;
  color: #2d3748;
  line-height: 1.4;
}

.activity-time {
  font-size: 0.75rem;
  color: #718096;
  margin-top: 0.125rem;
}
</style>
