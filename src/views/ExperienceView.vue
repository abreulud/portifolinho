<script setup lang="ts">
import { computed } from 'vue'

import ExperienceEntryItem from '@/components/ExperienceEntryItem.vue'
import ExperienceToolbox from '@/components/ExperienceToolbox.vue'
import ScrambleName from '@/components/ScrambleName.vue'
import { useLocale } from '@/composables/useLocale'

const { copy } = useLocale()
const positionsCount = computed(() =>
  String(copy.value.experience.entries.length).padStart(2, '0')
)
</script>

<template>
  <div class="experience-page">
    <p class="eyebrow">{{ copy.experience.eyebrow }}</p>
    <div class="experience-title">
      <ScrambleName :key="copy.experience.pageTitle" :text="copy.experience.pageTitle" />
    </div>
    <p class="page-intro">{{ copy.experience.intro }}</p>

    <p class="meta-row">
      {{ positionsCount }} {{ copy.experience.positionsLabel }}
      <span class="meta-dot" aria-hidden="true" />
      {{ copy.experience.ongoingLabel }}
    </p>

    <div class="timeline">
      <ExperienceEntryItem
        v-for="entry in copy.experience.entries"
        :key="entry.slug"
        :entry="entry"
      />
    </div>

    <ExperienceToolbox :columns="copy.experience.toolbox" :label="copy.experience.toolboxLabel" />
  </div>
</template>

<style scoped>
.eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--signal-text);
  margin-bottom: 20px;
}

.experience-title {
  margin-bottom: 20px;
}

.page-intro {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 620px;
  line-height: 1.6;
  margin-bottom: 32px;
}

.meta-row {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 48px;
}

.meta-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--signal);
}
</style>
