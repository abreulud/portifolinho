<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    seeAllTo?: string
    seeAllLabel?: string
  }>(),
  {
    seeAllTo: undefined,
    seeAllLabel: ''
  }
)
</script>

<template>
  <div class="section-header">
    <div>
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 class="section-title">{{ title }}</h2>
    </div>

    <router-link
      v-if="seeAllTo"
      :to="seeAllTo"
      class="see-all-btn"
      :aria-label="seeAllLabel"
    >
      ↗
    </router-link>
  </div>
</template>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 28px;
}

.eyebrow {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--signal-text);
  margin-bottom: 20px;
}

.section-title {
  font-family: var(--font-mono);
  font-size: 30px;
  font-weight: 400;
}

.see-all-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 0.5px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  text-decoration: none;
  flex-shrink: 0;
}
</style>
