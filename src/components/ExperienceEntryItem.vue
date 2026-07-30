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
  <article class="entry" :class="{ 'entry--open': isOpen }">
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

      <span class="entry-sign" aria-hidden="true">⌄</span>
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
          <p v-if="entry.location" class="entry-location">{{ entry.location }}</p>
          <p class="entry-description">{{ entry.description }}</p>

          <ul class="entry-skills" aria-label="Skills">
            <li v-for="skill in entry.skills" :key="skill" class="skill-chip">
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
.entry {
  border-top: 0.5px solid var(--border);
}

.entry:last-child {
  border-bottom: 0.5px solid var(--border);
}

.entry-head {
  display: grid;
  grid-template-columns: 210px minmax(0, 1fr) 36px;
  gap: 24px;
  align-items: center;
  width: 100%;
  padding: 22px 4px;
  color: inherit;
  background: transparent;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  transition: transform 160ms ease;
}

.entry-head:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 4px;
}

.entry-period {
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.5;
}

.entry-heading {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 5px;
}

.entry-role {
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 18px;
  line-height: 1.35;
}

.entry-company {
  color: var(--text-muted);
  font-size: 13px;
}

.entry-sign {
  justify-self: end;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 16px;
  transition:
    color 160ms ease,
    transform 160ms ease;
}

.entry--open .entry-sign {
  color: var(--signal-text);
  transform: rotate(180deg);
}

.entry-body {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  opacity: 0;
  transition:
    grid-template-rows 250ms ease,
    opacity 180ms ease,
    visibility 0s linear 250ms;
}

.entry--open .entry-body {
  grid-template-rows: 1fr;
  visibility: visible;
  opacity: 1;
  transition-delay: 0s;
}

.entry-body-shell {
  min-height: 0;
  overflow: hidden;
}

.entry-body-inner {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  padding: 0 44px 28px 238px;
}

.entry-description {
  max-width: 760px;
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.entry-location {
  margin: 0 0 -8px;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.5;
}

.entry-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-chip {
  padding: 6px 12px;
  color: var(--text-muted);
  border: 0.5px solid var(--border-strong);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.3;
  white-space: nowrap;
}

@media (hover: hover) {
  .entry-head:hover {
    transform: translateY(-2px);
  }
}

@media (max-width: 900px) {
  .entry-head {
    grid-template-columns: 170px minmax(0, 1fr) 32px;
    gap: 20px;
  }

  .entry-body-inner {
    padding-left: 190px;
  }
}

@media (max-width: 640px) {
  .entry-head {
    grid-template-columns: minmax(0, 1fr) 32px;
    gap: 10px 16px;
    padding: 20px 4px;
  }

  .entry-period {
    grid-column: 1 / -1;
  }

  .entry-heading {
    grid-column: 1;
  }

  .entry-sign {
    grid-column: 2;
  }

  .entry-role {
    font-size: 16px;
  }

  .entry-body-inner {
    padding: 0 4px 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .entry-head,
  .entry-sign,
  .entry-body {
    transition: none;
  }
}
</style>
