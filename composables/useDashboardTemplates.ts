import { reactive, ref, readonly } from "vue";
import type { LayoutItem } from "./useComponentRegistry";
import { createLayoutItemWithProps } from "./useComponentRegistry";

// Component configuration interface
export interface ComponentConfig {
  id: string;
  componentType: string;
  props: Record<string, any>;
  position: { x: number; y: number };
  size?: { w?: number; h?: number };
}

// Dashboard configuration
export interface DashboardConfig {
  id: string;
  name: string;
  description?: string;
  layout: ComponentConfig[];
  settings?: Record<string, any>;
}

// Component props presets for common configurations
export const componentPresets = {
  statisticCard: {
    totalProjects: {
      title: "Total Projects",
      statistics: 24,
      subtitle: "Active projects",
      icons: "📊",
      redirectTo: "projects",
    },
    totalClients: {
      title: "Total Clients",
      statistics: 12,
      subtitle: "Overall Projects",
      icons: "👥",
      redirectTo: "cliets",
    },
    // teamMembers: {
    //   title: 'Team Members',
    //   statistics: 12,
    //   subtitle: 'Active members',
    //   icons: '👥',
    //   redirectTo: 'team'
    // },
    // completedTasks: {
    //   title: 'Completed Tasks',
    //   statistics: 156,
    //   subtitle: 'This month',
    //   icons: '✅',
    //   redirectTo: 'tasks'
    // },
    // revenue: {
    //   title: 'Revenue',
    //   statistics: '$42,500',
    //   subtitle: 'This quarter',
    //   icons: '💰',
    //   redirectTo: 'analytics'
    // }
  },
  // Add more presets for other component types
};

// Dashboard templates
export const dashboardTemplates: Record<string, DashboardConfig> = {
  default: {
    id: "default",
    name: "Default Dashboard",
    description: "A balanced view of project metrics and team activity",
    layout: [
      {
        id: "user-profile-1",
        componentType: "user-profile",
        props: {},
        position: { x: 0, y: 0 },
      },
      {
        id: "recent-activity-1",
        componentType: "recent-activity",
        props: {},
        position: { x: 6, y: 0 },
      },
      {
        id: "project-stats-1",
        componentType: "project-stats",
        props: {},
        position: { x: 0, y: 6 },
      },
    ],
  },

  analytics: {
    id: "analytics",
    name: "Analytics Dashboard",
    description: "Focus on metrics and statistics",
    layout: [
      {
        id: "total-projects",
        componentType: "statistic-card",
        props: componentPresets.statisticCard.totalProjects,
        position: { x: 0, y: 0 },
      },
      {
        id: "total-clients",
        componentType: "statistic-card",
        props: componentPresets.statisticCard.totalClients,
        position: { x: 0, y: 0 },
      },
      //   {
      //     id: 'team-members',
      //     componentType: 'statistic-card',
      //     props: componentPresets.statisticCard.teamMembers,
      //     position: { x: 3, y: 0 }
      //   },
      //   {
      //     id: 'completed-tasks',
      //     componentType: 'statistic-card',
      //     props: componentPresets.statisticCard.completedTasks,
      //     position: { x: 6, y: 0 }
      //   },
      //   {
      //     id: 'revenue',
      //     componentType: 'statistic-card',
      //     props: componentPresets.statisticCard.revenue,
      //     position: { x: 9, y: 0 }
      //   },
      //   {
      //     id: 'project-stats-1',
      //     componentType: 'project-stats',
      //     props: {},
      //     position: { x: 0, y: 4 }
      //   },
      //   {
      //     id: 'recent-activity-1',
      //     componentType: 'recent-activity',
      //     props: {},
      //     position: { x: 6, y: 4 }
      //   }
    ],
  },
};

// Composable for managing dashboard layouts with props
export function useDashboardTemplates() {
  const currentTemplate = ref<string>("default");
  const customLayout = ref<ComponentConfig[]>([]);
  const isCustomMode = ref(false);

  // Convert component config to layout items
  const configToLayoutItems = (configs: ComponentConfig[]): LayoutItem[] => {
    return configs.map((config) =>
      createLayoutItemWithProps(
        config.componentType,
        config.position.x,
        config.position.y,
        config.props,
        config.size
      )
    );
  };

  // Get current layout items
  const getCurrentLayout = (): LayoutItem[] => {
    if (isCustomMode.value && customLayout.value.length > 0) {
      return configToLayoutItems(customLayout.value);
    }

    const template = dashboardTemplates[currentTemplate.value];
    return template ? configToLayoutItems(template.layout) : [];
  };

  // Switch to a template
  const switchTemplate = (templateId: string) => {
    if (dashboardTemplates[templateId]) {
      currentTemplate.value = templateId;
      isCustomMode.value = false;
    }
  };

  // Add a new component to custom layout
  const addComponent = (config: ComponentConfig) => {
    customLayout.value.push(config);
    isCustomMode.value = true;
  };

  // Remove a component from custom layout
  const removeComponent = (componentId: string) => {
    customLayout.value = customLayout.value.filter((c) => c.id !== componentId);
  };

  // Update component props
  const updateComponentProps = (
    componentId: string,
    newProps: Record<string, any>
  ) => {
    const component = customLayout.value.find((c) => c.id === componentId);
    if (component) {
      component.props = { ...component.props, ...newProps };
    }
  };

  // Save current layout as template
  const saveAsTemplate = (
    templateId: string,
    name: string,
    description?: string
  ) => {
    const layout = isCustomMode.value
      ? customLayout.value
      : dashboardTemplates[currentTemplate.value].layout;
    dashboardTemplates[templateId] = {
      id: templateId,
      name,
      description,
      layout: [...layout],
    };
  };

  return {
    currentTemplate: readonly(currentTemplate),
    customLayout: readonly(customLayout),
    isCustomMode: readonly(isCustomMode),
    dashboardTemplates,
    componentPresets,
    getCurrentLayout,
    switchTemplate,
    addComponent,
    removeComponent,
    updateComponentProps,
    saveAsTemplate,
    configToLayoutItems,
  };
}

// Helper to create a statistic card config
export function createStatisticCardConfig(
  id: string,
  x: number,
  y: number,
  presetKey: keyof typeof componentPresets.statisticCard,
  customProps?: Partial<typeof componentPresets.statisticCard.totalProjects>
): ComponentConfig {
  return {
    id,
    componentType: "statistic-card",
    props: {
      ...componentPresets.statisticCard[presetKey],
      ...customProps,
    },
    position: { x, y },
  };
}
