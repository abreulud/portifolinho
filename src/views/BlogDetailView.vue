<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import PreviewRail from '@/components/PreviewRail.vue'
import { useLocale } from '@/composables/useLocale'
import { getPostContent } from '@/content/posts'
import { formatShortDate } from '@/utils/formatDate'
import { renderMarkdownDocument } from '@/utils/renderMarkdown'

const route = useRoute()
const { locale, copy } = useLocale()
const initialTitle = document.title

const slug = computed(() => {
  const routeSlug = route.params.slug
  return Array.isArray(routeSlug) ? (routeSlug[0] ?? '') : (routeSlug ?? '')
})

const post = computed(() =>
  copy.value.posts.items.find(
    (item) => item.slug === slug.value && item.hasDetails
  )
)
const content = computed(() => getPostContent(slug.value, locale.value))
const markdownDocument = computed(() =>
  content.value ? renderMarkdownDocument(content.value) : null
)
const renderedContent = computed(() => markdownDocument.value?.html ?? '')
const railItems = computed(() =>
  markdownDocument.value?.headings ?? []
)

watch(
  post,
  (currentPost) => {
    document.title = currentPost
      ? `${currentPost.title} — Ludmilla Abreu`
      : `${copy.value.posts.notFoundTitle} — Ludmilla Abreu`
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  document.title = initialTitle
})
</script>

<template>
  <main class="post-detail-page">
    <template v-if="post && renderedContent">
      <PreviewRail
        :items="railItems"
        :label="`${post.title}: ${copy.posts.archiveTitle}`"
      />

      <RouterLink to="/blog" class="back-link">
        <span aria-hidden="true">←</span>
        {{ copy.posts.backToBlog }}
      </RouterLink>

      <header class="post-hero">
        <div class="post-meta">
          <span>{{ post.category }}</span>
          <template v-if="post.publishedAt">
            <span aria-hidden="true">·</span>
            <time :datetime="post.publishedAt">
              {{ formatShortDate(post.publishedAt, locale) }}
            </time>
          </template>
          <template v-if="post.readingTimeMinutes">
            <span aria-hidden="true">·</span>
            <span>{{ post.readingTimeMinutes }} min</span>
          </template>
        </div>

        <h1>{{ post.title }}</h1>
        <p class="post-lead">{{ post.excerpt }}</p>
      </header>

      <article class="post-markdown" v-html="renderedContent"></article>

      <footer class="post-detail-footer">
        <RouterLink to="/blog" class="back-link">
          <span aria-hidden="true">←</span>
          {{ copy.posts.backToBlog }}
        </RouterLink>
      </footer>
    </template>

    <section v-else class="post-not-found">
      <p class="post-not-found-code">404 / ~/blog</p>
      <h1>{{ copy.posts.notFoundTitle }}</h1>
      <p>{{ copy.posts.notFoundText }}</p>
      <RouterLink to="/blog" class="back-action">
        <span aria-hidden="true">←</span>
        {{ copy.posts.backToBlog }}
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.post-detail-page {
  max-width: 980px;
  margin: 0 auto;
  padding-top: 60px;
}

.back-link,
.back-action {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  text-decoration: none;
  transition: color 0.15s ease;
}

.back-link:hover,
.back-action:hover {
  color: var(--signal-text);
}

.back-link:focus-visible,
.back-action:focus-visible,
.post-markdown :deep(a:focus-visible) {
  outline: 2px solid var(--signal);
  outline-offset: 4px;
  border-radius: 4px;
}

.post-hero {
  max-width: 820px;
  padding: 44px 0 52px;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 18px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.post-hero h1,
.post-not-found h1 {
  margin: 0;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: clamp(32px, 6vw, 58px);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.post-lead {
  max-width: 720px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.7;
}

.post-markdown {
  max-width: 760px;
  margin: 0 auto;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.8;
}

.post-markdown :deep(h2) {
  scroll-margin-top: 32px;
  margin: 54px 0 16px;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: clamp(21px, 3vw, 28px);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.post-markdown :deep(h2:first-child) {
  margin-top: 0;
}

.post-markdown :deep(h3) {
  margin: 34px 0 12px;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 500;
}

.post-markdown :deep(p) {
  margin: 0 0 18px;
}

.post-markdown :deep(strong) {
  color: var(--ink);
  font-weight: 600;
}

.post-markdown :deep(ul),
.post-markdown :deep(ol) {
  display: grid;
  gap: 8px;
  margin: 0 0 22px;
  padding-left: 24px;
}

.post-markdown :deep(li::marker) {
  color: var(--signal-text);
  font-family: var(--font-mono);
}

.post-markdown :deep(a) {
  color: var(--signal-text);
  text-decoration-color: color-mix(in srgb, var(--signal) 55%, transparent);
  text-underline-offset: 3px;
}

.post-markdown :deep(code) {
  padding: 2px 5px;
  color: var(--signal-text);
  background: var(--signal-soft);
  border-radius: 5px;
  font-family: var(--font-mono);
  font-size: 0.88em;
}

.post-markdown :deep(pre) {
  overflow-x: auto;
  margin: 24px 0;
  padding: 20px;
  color: #dce8df;
  background: #111813;
  border: 0.5px solid rgb(255 255 255 / 8%);
  border-radius: 14px;
  line-height: 1.65;
}

.post-markdown :deep(pre code) {
  padding: 0;
  color: inherit;
  background: transparent;
}

.post-markdown :deep(blockquote) {
  margin: 28px 0;
  padding: 4px 0 4px 20px;
  color: var(--text-muted);
  border-left: 2px solid var(--signal);
}

.post-markdown :deep(hr) {
  margin: 48px 0;
  border: 0;
  border-top: 0.5px solid var(--border);
}

.post-detail-footer {
  max-width: 760px;
  margin: 58px auto 0;
  padding-top: 24px;
  border-top: 0.5px solid var(--border);
}

.post-not-found {
  max-width: 720px;
  min-height: 52vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.post-not-found-code {
  margin: 0 0 18px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 11px;
}

.post-not-found > p:not(.post-not-found-code) {
  max-width: 560px;
  margin: 20px 0 28px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.back-action {
  min-height: 39px;
  padding: 9px 14px;
  color: var(--signal-text);
  background: var(--signal-soft);
  border: 0.5px solid var(--signal);
  border-radius: 9px;
  font-weight: 700;
}

@media (max-width: 640px) {
  .post-detail-page {
    padding-top: 42px;
  }

  .post-hero {
    padding: 34px 0 40px;
  }

  .post-hero h1,
  .post-not-found h1 {
    font-size: clamp(30px, 10vw, 43px);
    text-wrap: pretty;
  }

  .post-markdown {
    font-size: 14px;
    line-height: 1.75;
  }

  .post-markdown :deep(h2) {
    margin-top: 42px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-link,
  .back-action {
    transition: none;
  }
}
</style>
