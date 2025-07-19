<template>
  <DashboardCard title="Team Overview" subtitle="Current team statistics">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-number">{{ teamMembers }}</div>
        <div class="stat-label">Team Members</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ activeProjects }}</div>
        <div class="stat-label">Active Projects</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ completedTasks }}</div>
        <div class="stat-label">Completed Tasks</div>
      </div>
    </div>
  </DashboardCard>
</template>

<script setup lang="ts">
import DashboardCard from './DashboardCard.vue';

// Mock data - replace with real data from your API
const teamMembers = ref(12);
const activeProjects = ref(8);
const completedTasks = ref(147);
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 1rem;
  height: 100%;
}

.stat-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #4299e1;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
