<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import type { Post } from '@/types/content'
import { formatShortDate } from '@/utils/formatDate'

defineProps<{ post: Post }>()
const { locale, copy } = useLocale()
</script>

<template>
  <router-link :to="`/blog/${post.slug}`" class="featured-card">
    <div class="featured-top">
      <span>{{ copy.posts.featuredLabel }}</span>
      <span>{{ post.readingTimeMinutes }} min</span>
    </div>

    <h3 class="featured-title">{{ post.title }}</h3>
    <p class="featured-excerpt">{{ post.excerpt }}</p>

    <div class="featured-bottom">
      <span>{{ formatShortDate(post.publishedAt, locale) }} · {{ post.category }}</span>
      <span class="read-cta">{{ copy.posts.readArticle }} →</span>
    </div>
  </router-link>
</template>

<style scoped>
.featured-card {
  display: block;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 22px;
  padding: 32px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;
}

.featured-card:hover {
  border-color: var(--border-strong);
}

.featured-top {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.featured-title {
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 400;
  line-height: 1.3;
  margin-bottom: 14px;
}

.featured-excerpt {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
}

.featured-bottom {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.read-cta {
  color: var(--signal-text);
  font-weight: 700;
}
</style>
