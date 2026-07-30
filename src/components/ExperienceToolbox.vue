<script setup lang="ts">
import { computed } from 'vue'

import type { ToolboxColumn } from '@/types/content'

const props = defineProps<{
  columns: ToolboxColumn[]
  label: string
}>()

const totalItems = computed(() =>
  props.columns.reduce((total, column) => total + column.items.length, 0)
)

const groupMarks = ['</>', '#', '>_']
</script>

<template>
  <section class="toolbox" aria-labelledby="toolbox-title">
    <header class="toolbox-header">
      <div>
        <p class="toolbox-kicker">stack.config</p>
        <h2 id="toolbox-title" class="toolbox-title">{{ label }}</h2>
      </div>

      <p class="toolbox-total">
        <span class="status-dot" aria-hidden="true" />
        {{ String(totalItems).padStart(2, '0') }} skills
      </p>
    </header>

    <div class="toolbox-grid">
      <section
        v-for="(column, index) in columns"
        :key="column.label"
        class="toolbox-group"
      >
        <header class="group-header">
          <span class="group-mark" aria-hidden="true">
            {{ groupMarks[index] ?? '•' }}
          </span>

          <div class="group-heading">
            <p class="group-index">0{{ index + 1 }}</p>
            <h3 class="group-title">{{ column.label }}</h3>
          </div>
        </header>

        <ul class="skill-list">
          <li v-for="item in column.items" :key="item" class="skill-item">
            <span class="skill-dot" aria-hidden="true" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped>
.toolbox {
  margin-top: clamp(48px, 7vw, 72px);
  padding-top: 28px;
  border-top: 0.5px solid var(--border-strong);
}

.toolbox-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}

.toolbox-kicker,
.toolbox-total,
.group-index,
.skill-item {
  font-family: var(--font-mono);
}

.toolbox-kicker {
  margin-bottom: 8px;
  color: var(--signal-text);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.toolbox-title {
  color: var(--ink);
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 600;
  line-height: 1.1;
}

.toolbox-total {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 11px;
  white-space: nowrap;
}

.status-dot,
.skill-dot {
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--signal);
}

.status-dot {
  width: 7px;
  height: 7px;
  box-shadow: 0 0 0 4px var(--signal-soft);
}

.toolbox-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.toolbox-group {
  min-width: 0;
  padding: 20px;
  overflow: hidden;
  background: color-mix(in srgb, var(--surface) 92%, var(--signal-soft));
  border: 0.5px solid var(--border);
  border-radius: 18px;
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 0.5px solid var(--border);
}

.group-mark {
  display: grid;
  flex: 0 0 42px;
  width: 42px;
  height: 42px;
  place-items: center;
  color: var(--signal-text);
  background: var(--signal-soft);
  border: 0.5px solid color-mix(in srgb, var(--signal) 38%, transparent);
  border-radius: 12px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 700;
}

.group-heading {
  min-width: 0;
}

.group-index {
  margin-bottom: 4px;
  color: var(--text-muted);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.group-title {
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.skill-list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 42px;
  padding: 10px 12px;
  color: var(--text-secondary);
  background: color-mix(in srgb, var(--canvas) 72%, transparent);
  border: 0.5px solid var(--border);
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.35;
}

.skill-dot {
  width: 6px;
  height: 6px;
  box-shadow: 0 0 0 3px var(--signal-soft);
}

@media (hover: hover) {
  .toolbox-group:hover {
    transform: translateY(-3px);
    border-color: var(--border-strong);
    box-shadow: 0 14px 30px rgb(0 0 0 / 6%);
  }
}

@media (max-width: 900px) {
  .toolbox-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .toolbox-group:last-child {
    grid-column: 1 / -1;
  }

  .toolbox-group:last-child .skill-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .toolbox {
    padding-top: 24px;
  }

  .toolbox-header {
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .toolbox-grid {
    grid-template-columns: 1fr;
  }

  .toolbox-group,
  .toolbox-group:last-child {
    grid-column: auto;
  }

  .skill-list,
  .toolbox-group:last-child .skill-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 420px) {
  .toolbox-header {
    flex-direction: column;
    gap: 12px;
  }

  .toolbox-group {
    padding: 16px;
  }

  .skill-list,
  .toolbox-group:last-child .skill-list {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toolbox-group {
    transition: none;
  }
}
</style>
