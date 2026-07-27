<script setup lang="ts">
import type { ToolboxColumn } from '@/types/content'

defineProps<{
  columns: ToolboxColumn[]
  label: string
}>()
</script>

<template>
  <div class="toolbox">
    <p class="toolbox-title">{{ label }}</p>

    <div class="toolbox-grid">
      <div v-for="column in columns" :key="column.label" class="toolbox-column">
        <p class="column-label">{{ column.label }}</p>
        <p v-for="item in column.items" :key="item" class="column-item">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbox {
  margin-top: 56px;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 22px;
  padding: 36px 40px;
}

.toolbox-title {
  font-family: var(--font-mono);
  font-size: 20px;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
}

.toolbox-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.column-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--signal-text);
  margin-bottom: 14px;
}

.column-item {
  font-family: var(--font-mono);
  font-size: 15px;
  color: var(--ink);
  margin-bottom: 8px;
}

@media (max-width: 640px) {
  .toolbox {
    padding: 24px;
  }

  .toolbox-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
