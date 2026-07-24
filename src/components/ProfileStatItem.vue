<script setup lang="ts">
import type { ProfileStat } from '@/types/content'

defineProps<{ stat: ProfileStat }>()
</script>

<template>
  <div class="stat">
    <span class="stat-value">{{ stat.value }}</span>
    <span class="stat-label">{{ stat.label }}</span>
  </div>
</template>

<style scoped>
.stat {
  flex: 1;
  padding: 16px 18px;
  border-right: 0.5px solid var(--border);
}

.stat:last-child {
  border-right: none;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: 22px;
  color: var(--ink);
  display: block;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
}
</style>
