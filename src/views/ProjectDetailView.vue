<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import { getProjectContent } from '@/content/projects'
import { useLocale } from '@/composables/useLocale'
import { formatShortDate } from '@/utils/formatDate'
import { renderMarkdown } from '@/utils/renderMarkdown'

const route = useRoute()
const { locale, copy } = useLocale()
const initialTitle = document.title

const slug = computed(() => {
  const routeSlug = route.params.slug
  return Array.isArray(routeSlug) ? (routeSlug[0] ?? '') : (routeSlug ?? '')
})

const project = computed(() =>
  copy.value.projects.items.find(
    (item) => item.slug === slug.value && item.hasDetails
  )
)

const content = computed(() => getProjectContent(slug.value, locale.value))
const renderedContent = computed(() =>
  content.value ? renderMarkdown(content.value) : ''
)
const detailImage = computed(
  () => project.value?.detailImage ?? project.value?.coverImage
)
const detailImageAlt = computed(
  () =>
    project.value?.detailImageAlt ??
    project.value?.coverAlt ??
    project.value?.title ??
    ''
)
const statusLabel = computed(() =>
  project.value?.status === 'live'
    ? copy.value.projects.liveLabel
    : copy.value.projects.inProgressLabel
)

watch(
  project,
  (currentProject) => {
    document.title = currentProject
      ? `${currentProject.title} — Ludmilla Abreu`
      : `${copy.value.projects.notFoundTitle} — Ludmilla Abreu`
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  document.title = initialTitle
})
</script>

<template>
  <main class="project-detail-page">
    <template v-if="project && renderedContent">
      <RouterLink to="/projetos" class="back-link">
        <span aria-hidden="true">←</span>
        {{ copy.projects.backToProjects }}
      </RouterLink>

      <header class="project-hero">
        <div class="project-hero-meta">
          <span>{{ project.index }} / {{ project.tag }}</span>
          <span aria-hidden="true">·</span>
          <span>{{ statusLabel }}</span>
          <template v-if="project.publishedAt">
            <span aria-hidden="true">·</span>
            <time :datetime="project.publishedAt">
              {{ formatShortDate(project.publishedAt, locale) }}
            </time>
          </template>
        </div>

        <h1>{{ project.title }}</h1>
        <p v-if="project.impact" class="project-lead">
          {{ project.impact.result }}
        </p>

        <div class="project-hero-actions">
          <a
            v-if="project.repoUrl"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-action hero-action--primary"
          >
            {{ copy.projects.sourceCode }}
            <span aria-hidden="true">↗</span>
          </a>

          <a
            v-if="project.demoUrl"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hero-action"
          >
            {{ copy.projects.viewDemo }}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <figure v-if="detailImage" class="project-hero-image">
        <img
          :src="detailImage"
          :alt="detailImageAlt"
          decoding="async"
        />
      </figure>

      <article class="project-markdown" v-html="renderedContent"></article>

      <footer class="project-detail-footer">
        <RouterLink to="/projetos" class="back-link">
          <span aria-hidden="true">←</span>
          {{ copy.projects.backToProjects }}
        </RouterLink>
      </footer>
    </template>

    <section v-else class="project-not-found">
      <p class="project-not-found-code">404 / ~/projetos</p>
      <h1>{{ copy.projects.notFoundTitle }}</h1>
      <p>{{ copy.projects.notFoundText }}</p>
      <RouterLink to="/projetos" class="hero-action hero-action--primary">
        <span aria-hidden="true">←</span>
        {{ copy.projects.backToProjects }}
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.project-detail-page {
  max-width: 980px;
  margin: 0 auto;
  padding-top: 60px;
}

.back-link {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
  text-decoration: none;
  transition: color 0.15s ease;
}

.back-link:hover {
  color: var(--signal-text);
}

.back-link:focus-visible,
.hero-action:focus-visible,
.project-markdown :deep(a:focus-visible) {
  outline: 2px solid var(--signal);
  outline-offset: 4px;
  border-radius: 4px;
}

.project-hero {
  max-width: 820px;
  padding: 44px 0 36px;
}

.project-hero-meta {
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

.project-hero h1,
.project-not-found h1 {
  margin: 0;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: clamp(32px, 6vw, 58px);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.project-lead {
  max-width: 720px;
  margin: 24px 0 0;
  color: var(--text-secondary);
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.7;
}

.project-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.hero-action {
  min-height: 39px;
  display: inline-flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
  padding: 9px 14px;
  color: var(--text-secondary);
  background: var(--surface);
  border: 0.5px solid var(--border-strong);
  border-radius: 9px;
  font-family: var(--font-mono);
  font-size: 11px;
  text-decoration: none;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.hero-action:hover {
  border-color: var(--signal);
}

.hero-action--primary {
  color: var(--signal-text);
  background: var(--signal-soft);
  border-color: var(--signal);
  font-weight: 700;
}

.project-hero-image {
  overflow: hidden;
  margin: 0 0 54px;
  background: #111813;
  border: 0.5px solid var(--border);
  border-radius: 22px;
  box-shadow: 0 24px 70px rgb(20 28 23 / 9%);
}

.project-hero-image img {
  width: 100%;
  max-height: 620px;
  display: block;
  object-fit: cover;
}

.project-markdown {
  max-width: 760px;
  margin: 0 auto;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.8;
}

.project-markdown :deep(h2) {
  margin: 54px 0 16px;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: clamp(21px, 3vw, 28px);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.025em;
}

.project-markdown :deep(h2:first-child) {
  margin-top: 0;
}

.project-markdown :deep(h3) {
  margin: 34px 0 12px;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 500;
}

.project-markdown :deep(p) {
  margin: 0 0 18px;
}

.project-markdown :deep(strong) {
  color: var(--ink);
  font-weight: 600;
}

.project-markdown :deep(ul),
.project-markdown :deep(ol) {
  display: grid;
  gap: 8px;
  margin: 0 0 22px;
  padding-left: 24px;
}

.project-markdown :deep(li::marker) {
  color: var(--signal-text);
  font-family: var(--font-mono);
}

.project-markdown :deep(a) {
  color: var(--signal-text);
  text-decoration-color: color-mix(in srgb, var(--signal) 55%, transparent);
  text-underline-offset: 3px;
}

.project-markdown :deep(code) {
  padding: 2px 5px;
  color: var(--signal-text);
  background: var(--signal-soft);
  border-radius: 5px;
  font-family: var(--font-mono);
  font-size: 0.88em;
}

.project-markdown :deep(pre) {
  overflow-x: auto;
  margin: 24px 0;
  padding: 20px;
  color: #dce8df;
  background: #111813;
  border: 0.5px solid rgb(255 255 255 / 8%);
  border-radius: 14px;
  line-height: 1.65;
}

.project-markdown :deep(pre code) {
  padding: 0;
  color: inherit;
  background: transparent;
}

.project-markdown :deep(img) {
  width: 100%;
  height: auto;
  display: block;
  margin: 28px 0 8px;
  background: #fff;
  border: 0.5px solid var(--border);
  border-radius: 16px;
}

.project-markdown :deep(blockquote) {
  margin: 28px 0;
  padding: 4px 0 4px 20px;
  color: var(--text-muted);
  border-left: 2px solid var(--signal);
}

.project-markdown :deep(hr) {
  margin: 48px 0;
  border: 0;
  border-top: 0.5px solid var(--border);
}

.project-detail-footer {
  max-width: 760px;
  margin: 58px auto 0;
  padding-top: 24px;
  border-top: 0.5px solid var(--border);
}

.project-not-found {
  max-width: 720px;
  min-height: 52vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.project-not-found-code {
  margin: 0 0 18px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 11px;
}

.project-not-found > p:not(.project-not-found-code) {
  max-width: 560px;
  margin: 20px 0 28px;
  color: var(--text-secondary);
  line-height: 1.7;
}

@media (max-width: 640px) {
  .project-detail-page {
    padding-top: 42px;
  }

  .project-hero {
    padding: 34px 0 28px;
  }

  .project-hero h1,
  .project-not-found h1 {
    font-size: clamp(30px, 10vw, 43px);
    text-wrap: pretty;
  }

  .project-hero-image {
    margin-bottom: 40px;
    border-radius: 15px;
  }

  .project-markdown {
    font-size: 14px;
    line-height: 1.75;
  }

  .project-markdown :deep(h2) {
    margin-top: 42px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .back-link,
  .hero-action {
    transition: none;
  }
}
</style>
