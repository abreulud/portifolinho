<script setup lang="ts">
import type { Post } from '@/types/content'

defineProps<{
  post: Post
  index: string
}>()
</script>

<template>
  <router-link :to="`/blog/${post.slug}`" class="compact-card">
    <span class="compact-index">{{ index }}</span>
    <span class="compact-body">
      <span class="compact-title">{{ post.title }}</span>
      <span class="compact-excerpt">{{ post.excerpt }}</span>
    </span>
  </router-link>
</template>

<style scoped>
.compact-card {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 22px;
  padding: 28px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;
}

.compact-card:hover {
  border-color: var(--border-strong);
}

.compact-index {
  font-family: var(--font-mono);
  font-size: 20px;
  color: var(--signal-text);
  min-width: 24px;
}

.compact-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.compact-title {
  font-family: var(--font-mono);
  font-size: 16px;
  font-weight: 400;
}

.compact-excerpt {
  font-size: 12px;
  color: var(--text-muted);
}
</style>
