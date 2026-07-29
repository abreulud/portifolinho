<script setup lang="ts">
import PublicationList from '@/components/PublicationList.vue'
import { useLocale } from '@/composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <main class="publications-page">
    <header class="publications-header">
      <p class="publications-eyebrow">{{ copy.posts.eyebrow }}</p>
      <h1>{{ copy.posts.archiveTitle }}</h1>
      <p>{{ copy.posts.archiveIntro }}</p>
    </header>

    <PublicationList :posts="copy.posts.items" />
  </main>
</template>

<style scoped>
.publications-page {
  padding-top: 72px;
}

.publications-header {
  max-width: 760px;
  margin-bottom: 34px;
}

.publications-eyebrow {
  margin-bottom: 18px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
}

.publications-header h1 {
  margin: 0 0 14px;
  font-family: var(--font-mono);
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 400;
  line-height: 1.15;
}

.publications-header > p:last-child {
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.7;
}

@media (max-width: 640px) {
  .publications-page {
    padding-top: 48px;
  }

  .publications-header {
    margin-bottom: 26px;
  }
}
</style>
