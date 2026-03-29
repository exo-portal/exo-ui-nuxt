<script setup lang="ts">
/**
 * ExoBrand — Logo mark + wordmark for Exo Portal.
 *
 * Props
 * ──────────────────────────────────────────────────────────
 * size          'sm' | 'md' | 'lg'  — icon size (default 'md')
 * orientation   'vertical' | 'horizontal'  — layout (default 'vertical')
 * theme         'light' | 'dark'  — text colour (default 'light')
 * showTagline   boolean  — show "Your workplace, elevated." line (default false)
 */

interface Props {
    size?: 'sm' | 'md' | 'lg'
    orientation?: 'vertical' | 'horizontal'
    theme?: 'light' | 'dark'
    showTagline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    orientation: 'vertical',
    theme: 'light',
    showTagline: false,
})

// Each mounted instance needs a unique gradient ID to prevent SVG cross-contamination
const uid = Math.random().toString(36).slice(2, 9)
const gradId = `exo-g-${uid}`

const iconSize = computed(() => ({ sm: 36, md: 48, lg: 60 }[props.size ?? 'md']))
const nameSize = computed(() => ({ sm: 'text-body-large', md: 'text-sub-heading-4', lg: 'text-sub-heading-3' }[props.size ?? 'md']))
const nameColour = computed(() => props.theme === 'dark' ? 'text-neutral-50' : 'text-neutral-900')
const metaColour = computed(() => props.theme === 'dark' ? 'text-neutral-300' : 'text-neutral-400')
</script>

<template>
    <!-- Vertical: icon stacked above text -->
    <div v-if="orientation === 'vertical'" class="flex flex-col items-center gap-3">
        <!-- Icon -->
        <svg :width="iconSize" :height="iconSize" viewBox="0 0 48 48" fill="none"
            xmlns="http://www.w3.org/2000/svg" class="drop-shadow-lg shrink-0" aria-hidden="true">
            <defs>
                <linearGradient :id="gradId" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#48cfff" />
                    <stop offset="0.5" stop-color="#1eb1ff" />
                    <stop offset="1" stop-color="#007ffd" />
                </linearGradient>
            </defs>
            <!-- Background -->
            <rect width="48" height="48" rx="13" :fill="`url(#${gradId})`" />
            <!-- Glass inner border -->
            <rect x="1.5" y="1.5" width="45" height="45" rx="11.5" stroke="rgba(255,255,255,0.22)"
                stroke-width="1" fill="none" />
            <!-- Portal-E mark ─────────────────────────────── -->
            <!-- Left arc: the portal "doorway" (curved spine of the E) -->
            <path d="M 13 15 Q 7 24 13 33" stroke="white" stroke-width="3" stroke-linecap="round"
                fill="none" />
            <!-- Top bar (full width) -->
            <path d="M 12 15 L 37 15" stroke="white" stroke-width="3" stroke-linecap="round" />
            <!-- Middle bar (shorter — creates the E silhouette) -->
            <path d="M 12 24 L 30 24" stroke="white" stroke-width="3" stroke-linecap="round" />
            <!-- Bottom bar (full width) -->
            <path d="M 12 33 L 37 33" stroke="white" stroke-width="3" stroke-linecap="round" />
            <!-- Portal exit dot — destination node -->
            <circle cx="33" cy="24" r="2.8" fill="white" fill-opacity="0.45" />
        </svg>

        <!-- Wordmark + descriptor -->
        <div class="flex flex-col items-center gap-1">
            <span :class="['font-bold tracking-tight leading-none', nameSize, nameColour]">
                Exo Portal
            </span>
            <span :class="['text-caption tracking-[0.14em] uppercase font-medium', metaColour]">
                Employee · Experience · Organization
            </span>
            <span v-if="showTagline" :class="['text-caption mt-0.5 italic', metaColour]">
                Your workplace, elevated.
            </span>
        </div>
    </div>

    <!-- Horizontal: icon inline with text -->
    <div v-else class="flex items-center gap-3 shrink-0">
        <!-- Icon -->
        <svg :width="iconSize" :height="iconSize" viewBox="0 0 48 48" fill="none"
            xmlns="http://www.w3.org/2000/svg" class="drop-shadow-sm shrink-0" aria-hidden="true">
            <defs>
                <linearGradient :id="gradId" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#48cfff" />
                    <stop offset="0.5" stop-color="#1eb1ff" />
                    <stop offset="1" stop-color="#007ffd" />
                </linearGradient>
            </defs>
            <rect width="48" height="48" rx="13" :fill="`url(#${gradId})`" />
            <rect x="1.5" y="1.5" width="45" height="45" rx="11.5" stroke="rgba(255,255,255,0.22)"
                stroke-width="1" fill="none" />
            <path d="M 13 15 Q 7 24 13 33" stroke="white" stroke-width="3" stroke-linecap="round"
                fill="none" />
            <path d="M 12 15 L 37 15" stroke="white" stroke-width="3" stroke-linecap="round" />
            <path d="M 12 24 L 30 24" stroke="white" stroke-width="3" stroke-linecap="round" />
            <path d="M 12 33 L 37 33" stroke="white" stroke-width="3" stroke-linecap="round" />
            <circle cx="33" cy="24" r="2.8" fill="white" fill-opacity="0.45" />
        </svg>

        <!-- Wordmark -->
        <div class="flex flex-col gap-0.5">
            <span :class="['font-bold tracking-tight leading-none', nameSize, nameColour]">
                Exo Portal
            </span>
            <span v-if="showTagline" :class="['text-caption', metaColour]">
                Your workplace, elevated.
            </span>
        </div>
    </div>
</template>
