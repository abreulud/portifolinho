<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
}>()
</script>

<template>
  <header class="section-header">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 class="section-title">{{ title }}</h2>
  </header>
</template>

<style scoped>
.section-header {
  margin-bottom: 28px;
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--signal-text);
  margin-bottom: 15px;
}

.section-title {
  font-family: var(--font-mono);
  font-size: 30px;
  font-weight: 400;
}
</style>
