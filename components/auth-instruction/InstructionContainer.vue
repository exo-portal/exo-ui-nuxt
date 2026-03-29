<script setup lang="ts">
import type { TxKeyPath } from '~/i18n/i18n';
import Separator from '../ui/separator/Separator.vue';
import ExoBrand from '../common/ExoBrand.vue';

defineProps<{
  title: TxKeyPath;
  subTitle: TxKeyPath;
  topBadgeTitleKey: TxKeyPath;
  bottomBadgeTitleKey?: TxKeyPath;
}>();
</script>

<template>
  <aside class="hidden sm:flex flex-col shrink-0 sm:basis-5/12 md:basis-4/12 bg-main-700 px-6 sm:px-8 md:px-11 py-8 md:py-12 select-none">
    <header class="flex flex-col gap-8">
      <ExoBrand size="sm" orientation="horizontal" theme="dark" />
      <div class="flex flex-col gap-2">
        <h1 class="text-body-large font-bold text-neutral-50">
          {{ $t(title) }}
        </h1>
        <h2 class="text-body-normal font-normal text-neutral-50">
          {{ $t(subTitle) }}
        </h2>
      </div>

      <section class="space-y-2" aria-labelledby="top-badge-title">
        <p id="top-badge-title" class="text-neutral-50 text-label">
          {{ $t(topBadgeTitleKey) }}
        </p>
        <slot name="topBadge" />
      </section>

      <section v-if="bottomBadgeTitleKey" class="space-y-2" aria-labelledby="bottom-badge-title">
        <div class="px-8">
          <Separator />
        </div>
        <p id="bottom-badge-title" class="text-neutral-50 text-label">
          {{ $t(bottomBadgeTitleKey) }}
        </p>
        <slot name="bottomBadge" />
      </section>
    </header>
    <main>
      <slot />
    </main>
  </aside>
</template>