<script setup lang="ts">
import { ref } from 'vue'

import ExperienceEntryItem from '@/components/ExperienceEntryItem.vue'
import ExperienceToolbox from '@/components/ExperienceToolbox.vue'
import ScrambleName from '@/components/ScrambleName.vue'
import { useLocale } from '@/composables/useLocale'

const { copy } = useLocale()
const activeEntrySlug = ref<string | null>(null)

function toggleEntry(slug: string) {
  activeEntrySlug.value = activeEntrySlug.value === slug ? null : slug
}
</script>

<template>
  <div class="experience-page">
    <p class="eyebrow">{{ copy.experience.eyebrow }}</p>
    <div class="experience-title">
      <ScrambleName :key="copy.experience.pageTitle" :text="copy.experience.pageTitle" />
    </div>

    <div class="experience-list">
      <ExperienceEntryItem
        v-for="entry in copy.experience.entries"
        :key="entry.slug"
        :entry="entry"
        :is-open="activeEntrySlug === entry.slug"
        @toggle="toggleEntry(entry.slug)"
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
  margin-bottom: 32px;
}

.experience-list {
  display: grid;
  gap: 0;
}

.experience-list :deep(.entry + .entry) {
  border-top: 0.5px solid var(--border);
}
</style>
