<script setup lang="ts">
import { reactive } from 'vue'
import { GridLayout, GridItem } from 'grid-layout-plus'
import { createManualComponentRegistry, createLayoutItem, createLayoutItemWithPropsAndId } from '~/composables/useComponentRegistry'


// Use the component registry
const componentRegistry = createManualComponentRegistry()

// Add edit mode state
const isEditMode = ref(false);

// Function to toggle edit mode
const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value
}

// Function to get component by ID
const getComponent = (componentId: string) => {
    // Map of unique IDs to component types
    const componentTypeMap: Record<string, string> = {
        'user-profile': 'user-profile',
        'total-projects': 'statistic-card',
        'total-clients': 'statistic-card',
        'total-task': 'statistic-card',
        'total-overdue-task': 'statistic-card',
        'time-card': 'time-card',
        'present-day-dtr-card': 'dtr-card',
        'absent-day-dtr-card': 'dtr-card',
        'late-hours-dtr-card': 'dtr-card',
        'overtime-hours-dtr-card': 'dtr-card',
    };

    const componentType = componentTypeMap[componentId] || componentId;
    return componentRegistry[componentType] || null
}

const presetLayout = reactive({
    lg: [
        // // User Profile
        createLayoutItem({
            componentId: 'user-profile',
            x: 0,
            y: 0,
            breakpoint: 'lg'
        }),

        // Statistic Cards
        createLayoutItemWithPropsAndId('statistic-card', 'total-projects', 4, 0, {
            title: 'Total Projects',
            statistics: 24,
            subtitle: 'Active projects',
            icons: '📊'
        }),
        createLayoutItemWithPropsAndId('statistic-card', 'total-clients', 4, 4, {
            title: 'Total Clients',
            statistics: 12,
            subtitle: 'Overall Projects',
            icons: '👥'
        }),

        createLayoutItem({
            componentId: 'time-card',
            x: 9,
            y: 0,
            breakpoint: 'lg'
        }),
        // createLayoutItemWithPropsAndId('statistic-card', 'total-task', 3, 3, {
        //     title: 'Total Task',
        //     statistics: 13,
        //     subtitle: 'Overall Projects',
        //     icons: '✅'
        // }),
        // createLayoutItemWithPropsAndId('statistic-card', 'total-overdue-task', 6, 3, {
        //     title: 'Total Overdue Task',
        //     statistics: 13,
        //     subtitle: 'Overall Projects',
        //     icons: '✅'
        // }),

        // // Time Logs Card

        // // Dtr Cards
        // createLayoutItemWithPropsAndId('dtr-card', 'present-day-dtr-card', 0, 6, {
        //     title: 'Present Day DTR',
        //     statistics: 8,
        //     subtitle: 'Today\'s Time Log',
        //     icons: '🕒'
        // }),
        // createLayoutItemWithPropsAndId('dtr-card', 'late-hours-dtr-card', 3, 6, {
        //     title: 'Absent Day DTR',
        //     statistics: 2,
        //     subtitle: 'Today\'s Time Log',
        //     icons: '🕒'
        // }),
        // createLayoutItemWithPropsAndId('dtr-card', 'overtime-hours-dtr-card', 6, 6, {
        //     title: 'Overtime Late Hours DTR',
        //     statistics: 2,
        //     subtitle: 'Today\'s Time Log',
        //     icons: '🕒'
        // }),
    ],
    md: [
        // User Profile
        createLayoutItem({
            componentId: 'user-profile',
            x: 0,
            y: 0,
            breakpoint: 'md'
        }),
    ],
});

const layout = ref(presetLayout.lg);
</script>
<template>

    <!-- Edit mode toggle button -->
    <div class="edit-controls">
        <button @click="toggleEditMode" class="edit-toggle-btn cursor-pointer px-4 py-2.5 rounded-full bg-main-300">
            {{ isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode' }}
        </button>
    </div>

    <GridLayout responsive :class="{ 'edit-mode m-4': isEditMode }" v-model:layout="layout" :col-num="12"
        :row-height="60" :margin="[24, 24]" :is-draggable="isEditMode" :is-resizable="isEditMode" vertical-compact
        use-css-transforms>
        <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
            :min-h="item.minH" :min-w="item.minW">
            <component :is="getComponent(item.i)" v-if="getComponent(item.i)" :grid-item="item"
                v-bind="item.props || {}" />

            <!-- Fallback for unknown components -->
            <div v-else class="unknown-component">
                <h3>Unknown Component</h3>
                <p>Component "{{ item.i }}" not found</p>
            </div>
        </GridItem>
    </GridLayout>
</template>


<style scoped>
.vgl-layout {
    margin: 0px 100px;
    position: relative;
}

:deep(.vgl-item:not(.vgl-item--placeholder)) {
    background-color: #ccc;
    border: 1px solid black;
}

:deep(.vgl-item--resizing) {
    opacity: 90%;
}

.vgl-layout.edit-mode::before {
    position: absolute;
    width: calc(100% - 5px);
    height: calc(100% - 5px);
    margin: 5px;
    content: '';
    background-image: linear-gradient(to right, lightgrey 1px, transparent 1px),
        linear-gradient(to bottom, lightgrey 1px, transparent 1px);
    background-repeat: repeat;
    background-size: calc(calc(100% - 5px) / 12) 85px;
}

:deep(.vgl-item--static) {
    background-color: #cce;
}

.text {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    font-size: 24px;
    text-align: center;
}

.unknown-component {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #fed7d7;
    border: 2px dashed #e53e3e;
    border-radius: 8px;
    color: #e53e3e;
    text-align: center;
}

.unknown-component h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
}

.unknown-component p {
    margin: 0;
    font-size: 0.875rem;
}
</style>