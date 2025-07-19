// Advanced component registry with auto-discovery
import { defineAsyncComponent } from 'vue'

export interface GridComponentConfig {
  id: string
  component: ReturnType<typeof defineAsyncComponent>
  metadata: {
    name: string
    description: string
    category: string
    defaultSize: { w: number; h: number }
    minSize?: { w: number; h: number }
    maxSize?: { w: number; h: number }
    icon?: string
  }
}

// For even larger scale (100+ components), you could use Vite's glob imports
export function createAutoComponentRegistry(): Record<string, GridComponentConfig> {
  // This would auto-discover all components in the project-team directory
  const modules = import.meta.glob('~/components/project-team/*Card.vue')
  const registry: Record<string, GridComponentConfig> = {}

  for (const [path, loader] of Object.entries(modules)) {
    const componentName = path
      .replace(/^.*\//, '')
      .replace(/Card\.vue$/, '')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/^-/, '')

    registry[componentName] = {
      id: componentName,
      component: defineAsyncComponent(loader as any),
      metadata: {
        name: componentName.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        description: `${componentName} dashboard component`,
        category: 'Dashboard',
        defaultSize: { w: 6, h: 4 }
      }
    }
  }

  return registry
}

// Manual registry with full configuration (recommended for production)
export function createConfiguredComponentRegistry(): Record<string, GridComponentConfig> {
  return {
    'team-overview': {
      id: 'team-overview',
      component: defineAsyncComponent(() => import('~/components/project-team/TeamOverviewCard.vue')),
      metadata: {
        name: 'Team Overview',
        description: 'Display team statistics and key metrics',
        category: 'Dashboard',
        defaultSize: { w: 6, h: 4 },
        minSize: { w: 4, h: 3 },
        icon: 'users'
      }
    },
    'recent-activity': {
      id: 'recent-activity',
      component: defineAsyncComponent(() => import('~/components/project-team/RecentActivityCard.vue')),
      metadata: {
        name: 'Recent Activity',
        description: 'Show latest team activities and updates',
        category: 'Activity',
        defaultSize: { w: 6, h: 8 },
        minSize: { w: 4, h: 4 },
        icon: 'activity'
      }
    },
    'project-stats': {
      id: 'project-stats',
      component: defineAsyncComponent(() => import('@/components/project-team/ProjectStatsCard.vue')),
      metadata: {
        name: 'Project Statistics',
        description: 'View project progress and metrics',
        category: 'Analytics',
        defaultSize: { w: 6, h: 5 },
        minSize: { w: 4, h: 4 },
        icon: 'bar-chart'
      }
    }
    // Add more configured components here...
  }
}

// Utility to get component by ID
export function getComponentById(registry: Record<string, GridComponentConfig>, id: string) {
  return registry[id]?.component || null
}

// Utility to get all available components for a component picker
export function getAvailableComponents(registry: Record<string, GridComponentConfig>) {
  return Object.values(registry).map(config => ({
    id: config.id,
    ...config.metadata
  }))
}
