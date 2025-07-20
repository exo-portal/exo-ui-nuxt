<script setup lang="ts">
import { TopNav } from '~/components/index';
import { metaTItleBuilder } from '~/lib/utils';
import { GridLayout, GridItem } from 'grid-layout-plus'
import { reactive, ref } from 'vue'
import { createManualComponentRegistry, createLayoutItem, createLayoutItemWithProps, type LayoutItem } from '~/composables/useComponentRegistry'
import { useDashboardTemplates, componentPresets } from '~/composables/useDashboardTemplates'

const route = useRoute();
const userId = route.query.userId as string | undefined;

// Use the component registry
const componentRegistry = createManualComponentRegistry()

// Use dashboard templates for more advanced management
const {
  currentTemplate,
  dashboardTemplates,
  getCurrentLayout,
  switchTemplate,
  addComponent,
  removeComponent
} = useDashboardTemplates()

// Add edit mode state
const isEditMode = ref(false);
const useTemplateMode = ref(false); // Toggle between manual and template mode

// Function to toggle edit mode
const toggleEditMode = () => {
    isEditMode.value = !isEditMode.value
}

// Function to toggle template mode
const toggleTemplateMode = () => {
    useTemplateMode.value = !useTemplateMode.value
}

// Function to get component by ID
const getComponent = (componentId: string) => {
    return componentRegistry[componentId] || null
}

// Manual layout (original approach)
const manualLayout = reactive<LayoutItem[]>([
    createLayoutItem('user-profile', 0, 0),
    createLayoutItem('recent-activity', 6, 0),
    createLayoutItem('project-stats', 0, 6),
    // Example with props for statistic cards
    createLayoutItemWithProps('statistic-card', 0, 13, {
        title: 'Total Projects',
        statistics: 24,
        subtitle: 'Active projects',
        icons: '📊',
        redirectTo: 'projects'
    }),
    createLayoutItemWithProps('statistic-card', 3, 13, {
        title: 'Team Members',
        statistics: 12,
        subtitle: 'Active members',
        icons: '👥',
        redirectTo: 'team'
    })
])

// Template-based layout (reactive)
const templateLayout = reactive<LayoutItem[]>(getCurrentLayout())

// Watch for template changes and update layout
watch(currentTemplate, () => {
    templateLayout.splice(0, templateLayout.length, ...getCurrentLayout())
})

// Computed layout based on mode
const layout = computed(() => {
    return useTemplateMode.value ? templateLayout : manualLayout
})

// Available templates for selection
const availableTemplates = computed(() => {
    return Object.values(dashboardTemplates)
})

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

        <!-- Control panel -->
        <div class="control-panel">
            <!-- Mode toggle -->
            <div class="mode-controls">
                <button @click="toggleTemplateMode" class="mode-toggle-btn cursor-pointer px-4 py-2.5 rounded-full"
                    :class="useTemplateMode ? 'bg-blue-500 text-white' : 'bg-gray-300'">
                    {{ useTemplateMode ? 'Template Mode' : 'Manual Mode' }}
                </button>
                <button @click="toggleEditMode" class="edit-toggle-btn cursor-pointer px-4 py-2.5 rounded-full bg-main-300">
                    {{ isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode' }}
                </button>
            </div>

            <!-- Template selector (only show in template mode) -->
            <div v-if="useTemplateMode" class="template-controls">
                <label class="template-label">Dashboard Template:</label>
                <select 
                    :value="currentTemplate" 
                    @change="switchTemplate(($event.target as HTMLSelectElement).value)"
                    class="template-select px-3 py-2 border rounded-md">
                    <option v-for="template in availableTemplates" :key="template.id" :value="template.id">
                        {{ template.name }}
                    </option>
                </select>
                <span class="template-description text-sm text-gray-600">
                    {{ dashboardTemplates[currentTemplate]?.description }}
                </span>
            </div>
        </div>

        <GridLayout :class="{ 'edit-mode': isEditMode }" v-model:layout="layout" :col-num="12" :row-height="35"
            :is-draggable="isEditMode" :is-resizable="isEditMode" vertical-compact use-css-transforms>
            <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i"
                :min-h="item.minH" :min-w="item.minW">
                <component :is="getComponent(item.i)" v-if="getComponent(item.i)" :grid-item="item" v-bind="item.props || {}" />
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
.control-panel {
    padding: 1rem;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.mode-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.template-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
}

.template-label {
    font-weight: 600;
    color: #374151;
}

.template-select {
    min-width: 200px;
    background: white;
    border: 1px solid #d1d5db;
}

.template-description {
    font-style: italic;
}

.mode-toggle-btn {
    transition: all 0.2s;
}

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
