import { defineAsyncComponent } from "vue";

// Type for component registry
export type ComponentRegistry = Record<
  string,
  ReturnType<typeof defineAsyncComponent>
>;

// Auto-register components from a directory
export function createComponentRegistry(
  componentMap: Record<string, () => Promise<any>>
): ComponentRegistry {
  const registry: ComponentRegistry = {};

  for (const [path, loader] of Object.entries(componentMap)) {
    // Extract component name from path
    // e.g., './TeamOverviewCard.vue' -> 'team-overview'
    const componentName = path
      .replace(/^.*\//, "") // Remove directory path
      .replace(/\.vue$/, "") // Remove .vue extension
      .replace(/([A-Z])/g, "-$1") // Convert PascalCase to kebab-case
      .toLowerCase()
      .replace(/^-/, ""); // Remove leading dash

    registry[componentName] = defineAsyncComponent(loader);
  }

  return registry;
}

// Alternative: Manual registry for full control
export function createManualComponentRegistry(): ComponentRegistry {
  return {
    "user-profile": defineAsyncComponent(
      () => import("@/components/dashboard/UserProfileCard.vue")
    ),
    "statistic-card": defineAsyncComponent(
      () => import("@/components/dashboard/StatisticCard.vue")
    ),
    // Existing Components
    "team-overview": defineAsyncComponent(
      () => import("~/components/project-team/TeamOverviewCard.vue")
    ),
    "recent-activity": defineAsyncComponent(
      () => import("~/components/project-team/RecentActivityCard.vue")
    ),
    "project-stats": defineAsyncComponent(
      () => import("@/components/project-team/ProjectStatsCard.vue")
    ),

    // Example of how to add more components:
    // 'task-board': defineAsyncComponent(() => import('~/components/project-team/TaskBoardCard.vue')),
    // 'milestone-tracker': defineAsyncComponent(() => import('~/components/project-team/MilestoneTrackerCard.vue')),
    // 'team-members': defineAsyncComponent(() => import('~/components/project-team/TeamMembersCard.vue')),
    // 'team-performance': defineAsyncComponent(() => import('~/components/project-team/TeamPerformanceCard.vue')),
    // 'team-calendar': defineAsyncComponent(() => import('~/components/project-team/TeamCalendarCard.vue')),
    // 'productivity-chart': defineAsyncComponent(() => import('~/components/project-team/ProductivityChartCard.vue')),
    // 'time-tracking': defineAsyncComponent(() => import('~/components/project-team/TimeTrackingCard.vue')),
    // 'budget-overview': defineAsyncComponent(() => import('~/components/project-team/BudgetOverviewCard.vue')),
    // 'announcements': defineAsyncComponent(() => import('~/components/project-team/AnnouncementsCard.vue')),
    // 'chat-widget': defineAsyncComponent(() => import('~/components/project-team/ChatWidgetCard.vue')),
    // 'notifications': defineAsyncComponent(() => import('~/components/project-team/NotificationsCard.vue')),
    // 'file-manager': defineAsyncComponent(() => import('~/components/project-team/FileManagerCard.vue')),
    // 'code-review': defineAsyncComponent(() => import('~/components/project-team/CodeReviewCard.vue')),
    // 'deployment-status': defineAsyncComponent(() => import('~/components/project-team/DeploymentStatusCard.vue')),
    // ... add more as you create them
  };
}

// Component metadata for dashboard configuration
export interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultSize: { w: number; h: number };
  minSize?: { w: number; h: number };
  maxSize?: { w: number; h: number };
}

// Layout item interface
export interface LayoutItem {
  x: number;
  y: number;
  w: number;
  h: number;
  i: string;
  minW: number;
  minH: number;
  maxW?: number;
  maxH?: number;
  props?: Record<string, any>;
}

export const componentMetadata: ComponentMetadata[] = [
  {
    id: "user-profile",
    name: "User Profile",
    description: "Display user profile information and settings",
    category: "Dashboard",
    defaultSize: { w: 6, h: 5 },
    minSize: { w: 6, h: 5 },
    maxSize: { w: 12, h: 6 },
  },
  {
    id: "statistic-card",
    name: "Statistic Card",
    description: "Display a single statistic with icon and description",
    category: "Dashboard",
    defaultSize: { w: 3, h: 4 },
    minSize: { w: 3, h: 4 },
    maxSize: { w: 6, h: 6 },
  },
  //   TODO:: Sample Only
  {
    id: "team-overview",
    name: "Team Overview",
    description: "Display team statistics and key metrics",
    category: "Dashboard",
    defaultSize: { w: 6, h: 6 },
    minSize: { w: 6, h: 6 },
    maxSize: { w: 12, h: 12 },
  },
  {
    id: "recent-activity",
    name: "Recent Activity",
    description: "Show latest team activities and updates",
    category: "Dashboard",
    defaultSize: { w: 6, h: 8 },
    minSize: { w: 4, h: 6 },
    maxSize: { w: 12, h: 15 },
  },
  {
    id: "project-stats",
    name: "Project Statistics",
    description: "View project progress and key metrics",
    category: "Analytics",
    defaultSize: { w: 6, h: 7 },
    minSize: { w: 6, h: 7 },
    maxSize: { w: 12, h: 10 },
  },
  // Add metadata for all your components...
];

// Helper function to create layout items with proper sizing constraints
export function createLayoutItem(
  componentId: string,
  x: number,
  y: number,
  customSize?: { w?: number; h?: number }
): LayoutItem {
  const metadata = componentMetadata.find((meta) => meta.id === componentId);

  if (!metadata) {
    console.warn(`No metadata found for component: ${componentId}`);
    return {
      x,
      y,
      w: customSize?.w || 4,
      h: customSize?.h || 4,
      i: componentId,
      minW: 2,
      minH: 2,
      props: {}, // Add props property
    };
  }

  return {
    x,
    y,
    w: customSize?.w || metadata.defaultSize.w,
    h: customSize?.h || metadata.defaultSize.h,
    i: componentId,
    minW: metadata.minSize?.w || 2,
    minH: metadata.minSize?.h || 2,
    maxW: metadata.maxSize?.w,
    maxH: metadata.maxSize?.h,
    props: {}, // Add props property
  };
}

// Helper function to create layout items with props
export function createLayoutItemWithProps(
  componentId: string,
  x: number,
  y: number,
  props: Record<string, any>,
  customSize?: { w?: number; h?: number }
): LayoutItem {
  const baseItem = createLayoutItem(componentId, x, y, customSize);
  return {
    ...baseItem,
    props,
  };
}
