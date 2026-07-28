<script setup lang="ts">
import { computed, ref } from 'vue'

import type { ExperienceEntry } from '@/types/content'

const props = defineProps<{
  entry: ExperienceEntry
}>()

const isOpen = ref(false)
const buttonId = computed(() => 'experience-trigger-' + props.entry.slug)
const panelId = computed(() => 'experience-panel-' + props.entry.slug)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="entry" :class="{ 'entry--open': isOpen }">
    <button
      :id="buttonId"
      type="button"
      class="entry-head"
      :aria-expanded="isOpen"
      :aria-controls="panelId"
      @click="toggle"
    >
      <span class="entry-period">{{ entry.period }}</span>

      <span class="entry-heading">
        <span class="entry-role">{{ entry.role }}</span>
        <span class="entry-company">{{ entry.company }}</span>
      </span>

      <span class="entry-chevron" aria-hidden="true">⌄</span>
    </button>

    <div
      :id="panelId"
      class="entry-body"
      role="region"
      :aria-labelledby="buttonId"
      :aria-hidden="!isOpen"
    >
      <div class="entry-body-shell">
        <div class="entry-body-inner">
          <p class="entry-description">{{ entry.description }}</p>

          <ul class="entry-skills">
            <li v-for="skill in entry.skills" :key="skill" class="skill-chip">{{ skill }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.entry {
  border-top: 0.5px solid var(--border);
}

.entry:last-child {
  border-bottom: 0.5px solid var(--border);
}

.entry-head {
  width: 100%;
  display: grid;
  grid-template-columns: 140px 1fr 32px;
  gap: 20px;
  align-items: center;
  padding: 24px 4px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: inherit;
  color: inherit;
}

.entry-head:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 4px;
  border-radius: 4px;
}

.entry-period {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--signal-text);
}

.entry-heading {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.entry-role {
  font-family: var(--font-mono);
  font-size: 18px;
}

.entry-company {
  font-size: 13px;
  color: var(--text-muted);
}

.entry-chevron {
  justify-self: end;
  color: var(--text-muted);
  transition: transform 0.2s;
}

.entry--open .entry-chevron {
  transform: rotate(180deg);
  color: var(--signal-text);
}

.entry-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s ease;
}

.entry--open .entry-body {
  grid-template-rows: 1fr;
}

.entry-body-shell {
  min-height: 0;
  overflow: hidden;
}

.entry-body-inner {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  padding: 0 4px 28px 164px;
}

.entry-description {
  max-width: 720px;
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.entry-skills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-chip {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  border: 0.5px solid var(--border-strong);
  border-radius: 999px;
  padding: 5px 12px;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .entry-head {
    grid-template-columns: 1fr 24px;
  }

  .entry-period {
    grid-column: 1 / -1;
  }

  .entry-body-inner {
    padding-left: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .entry-body,
  .entry-chevron {
    transition: none;
  }
}
</style>
