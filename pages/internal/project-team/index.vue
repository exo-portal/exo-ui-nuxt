<script setup lang="ts">
import { TopNav } from '~/components/index';
import { metaTItleBuilder } from '~/lib/utils';
import { GridLayout, GridItem } from 'grid-layout-plus'
import { reactive } from 'vue'
import { createManualComponentRegistry, createLayoutItem } from '~/composables/useComponentRegistry'

const route = useRoute();
const userId = route.query.userId as string | undefined;

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
    return componentRegistry[componentId] || null
}

const layout = reactive([

    createLayoutItem('user-profile', 0, 0),
    createLayoutItem('recent-activity', 6, 0),
    createLayoutItem('project-stats', 0, 6)
])

useHead({
    title: metaTItleBuilder('Project Team'),
})

definePageMeta({
    requireAuth: true,
});
</script>

<template>
    <div>
        <TopNav />

        <!-- Edit mode toggle button -->
        <div class="edit-controls">
            <button @click="toggleEditMode" class="edit-toggle-btn cursor-pointer px-4 py-2.5 rounded-full bg-main-300">
                {{ isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode' }}
            </button>
        </div>

        <GridLayout :class="{ 'edit-mode': isEditMode }" v-model:layout="layout" :col-num="12" :row-height="35"
            :is-draggable="isEditMode" :is-resizable="isEditMode" vertical-compact use-css-transforms>
            <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
                :min-h="item.minH" :min-w="item.minW">
                <component :is="getComponent(item.i)" v-if="getComponent(item.i)" :grid-item="item" />
                <!-- Fallback for unknown components -->
                <div v-else class="unknown-component">
                    <h3>Unknown Component</h3>
                    <p>Component "{{ item.i }}" not found</p>
                </div>
            </GridItem>
        </GridLayout>
    </div>
</template>

<style scoped>
.vgl-layout {
    background-color: #eee;
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
    background-size: calc(calc(100% - 5px) / 12) 40px;
}

:deep(.vgl-item:not(.vgl-item--placeholder)) {
    background-color: #ccc;
    border: 1px solid black;
}

:deep(.vgl-item--resizing) {
    opacity: 90%;
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