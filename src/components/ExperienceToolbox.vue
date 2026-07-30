<script setup lang="ts">
import type { ToolboxColumn } from '@/types/content'

defineProps<{
  columns: ToolboxColumn[]
  label: string
}>()

function displayLabel(label: string) {
  return label.replace(/^~\//, '')
}
</script>

<template>
  <section class="toolbox" aria-labelledby="experience-toolbox-title">
    <header class="toolbox-heading">
      <p class="toolbox-eyebrow">stack / skills</p>
      <h2 id="experience-toolbox-title" class="toolbox-title">{{ label }}</h2>
    </header>

    <div class="toolbox-list">
      <section
        v-for="(column, index) in columns"
        :key="column.label"
        class="toolbox-row"
      >
        <header class="row-heading">
          <span class="row-index" aria-hidden="true">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <h3 class="row-title">{{ displayLabel(column.label) }}</h3>
        </header>

        <ul class="skill-list">
          <li v-for="item in column.items" :key="item" class="skill-chip">
            {{ item }}
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>

<style scoped>
.toolbox {
  margin-top: clamp(48px, 7vw, 72px);
}

.toolbox-heading {
  margin-bottom: 22px;
}

.toolbox-eyebrow,
.row-index,
.row-title,
.skill-chip {
  font-family: var(--font-mono);
}

.toolbox-eyebrow {
  margin-bottom: 8px;
  color: var(--signal-text);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.toolbox-title {
  color: var(--ink);
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 600;
  line-height: 1.15;
}

.toolbox-list {
  border-top: 0.5px solid var(--border-strong);
}

.toolbox-row {
  display: grid;
  grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 56px);
  align-items: center;
  padding: 28px 0;
  border-bottom: 0.5px solid var(--border-strong);
}

.row-heading {
  display: flex;
  align-items: baseline;
  gap: 12px;
  min-width: 0;
}

.row-index {
  flex: 0 0 auto;
  color: var(--signal-text);
  font-size: 10px;
  letter-spacing: 0.08em;
}

.row-title {
  color: var(--ink);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.45;
  text-transform: uppercase;
  overflow-wrap: anywhere;
}

.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 9px 16px;
  color: var(--text-secondary);
  background: transparent;
  border: 0.5px solid var(--border-strong);
  border-radius: 999px;
  font-size: 12px;
  line-height: 1.25;
  overflow-wrap: anywhere;
  transition:
    color 160ms ease,
    background-color 160ms ease,
    border-color 160ms ease,
    transform 160ms ease;
}

@media (hover: hover) {
  .skill-chip:hover {
    color: var(--signal-text);
    background: var(--signal-soft);
    border-color: var(--signal);
    transform: translateY(-1px);
  }
}

@media (max-width: 800px) {
  .toolbox-row {
    grid-template-columns: minmax(150px, 190px) minmax(0, 1fr);
    gap: 24px;
  }
}

@media (max-width: 640px) {
  .toolbox-heading {
    margin-bottom: 18px;
  }

  .toolbox-row {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px 0;
  }

  .skill-list {
    gap: 8px;
  }

  .skill-chip {
    flex: 1 1 138px;
    justify-content: center;
    min-height: 42px;
    padding-inline: 14px;
    text-align: center;
  }
}


@media (prefers-reduced-motion: reduce) {
  .skill-chip {
    transition: none;
  }
}
</style>
