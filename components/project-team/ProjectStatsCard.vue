<template>
  <DashboardCard title="Project Statistics" subtitle="Key project metrics">
    <div class="stats-container">
      <div class="progress-section">
        <h4>Project Progress</h4>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${projectProgress}%` }"></div>
        </div>
        <span class="progress-text">{{ projectProgress }}% Complete</span>
      </div>
      
      <div class="metrics-grid">
        <div class="metric">
          <span class="metric-value">{{ tasksCompleted }}</span>
          <span class="metric-label">Tasks Done</span>
        </div>
        <div class="metric">
          <span class="metric-value">{{ tasksRemaining }}</span>
          <span class="metric-label">Remaining</span>
        </div>
        <div class="metric">
          <span class="metric-value">{{ daysLeft }}</span>
          <span class="metric-label">Days Left</span>
        </div>
      </div>
    </div>
  </DashboardCard>
</template>

<script setup lang="ts">
import DashboardCard from './DashboardCard.vue';

// Mock data - replace with real data
const projectProgress = ref(73);
const tasksCompleted = ref(45);
const tasksRemaining = ref(17);
const daysLeft = ref(12);
</script>

<style scoped>
.stats-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
}

.progress-section h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #4a5568;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background-color: #48bb78;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.75rem;
  color: #718096;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  flex: 1;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
}

.metric-label {
  font-size: 0.75rem;
  color: #718096;
  margin-top: 0.25rem;
}
</style>
