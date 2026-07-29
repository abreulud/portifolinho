<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/composables/useLocale'
import type { Project } from '@/types/content'

const props = withDefaults(
  defineProps<{
    project: Project
    variant?: 'featured' | 'compact'
  }>(),
  {
    variant: 'featured'
  }
)

const { copy } = useLocale()
const isCompact = computed(() => props.variant === 'compact')
</script>

<template>
  <article
    class="project-card"
    :class="`project-card--${variant}`"
  >
    <div class="project-cover" aria-hidden="true">
      <img
        v-if="project.coverImage"
        :src="project.coverImage"
        alt=""
        loading="lazy"
        decoding="async"
      />

      <div v-else class="project-cover-fallback">
        <span class="fallback-line fallback-line--one"></span>
        <span class="fallback-line fallback-line--two"></span>
        <span class="fallback-line fallback-line--three"></span>
        <span class="fallback-alert"></span>
      </div>
    </div>

    <div class="project-body">
      <p class="project-tag">{{ project.index }} / {{ project.tag.toUpperCase() }}</p>
      <h3 class="project-title">{{ project.title }}</h3>

      <p v-if="isCompact" class="project-summary">
        {{ project.impact.result }}
      </p>

      <p v-else class="project-impact">
        <span>
          <strong>{{ copy.projects.problemLabel }}:</strong>
          {{ project.impact.problem }}
        </span>
        <span>
          <strong>{{ copy.projects.resultLabel }}:</strong>
          {{ project.impact.result }}
        </span>
      </p>

      <div v-if="!isCompact" class="project-actions">
        <a
          v-if="project.repoUrl"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn"
        >
          <span aria-hidden="true">⌘</span>
          {{ copy.projects.sourceCode }}
        </a>

        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn action-btn--demo"
        >
          <span aria-hidden="true">▶</span>
          {{ copy.projects.viewDemo }}
        </a>

        <span
          v-else
          class="action-btn action-btn--disabled"
          aria-disabled="true"
        >
          <span aria-hidden="true">○</span>
          {{ copy.projects.comingSoon }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  min-width: 0;
  overflow: hidden;
  display: grid;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 20px;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
  box-shadow: 0 18px 44px rgb(20 28 23 / 7%);
}

.project-card--featured {
  grid-template-columns: minmax(160px, 34%) minmax(0, 1fr);
  min-height: 286px;
}

.project-card--compact {
  grid-template-columns: 116px minmax(0, 1fr);
  min-height: 133px;
}

.project-cover {
  min-width: 0;
  min-height: 100%;
  overflow: hidden;
  background: #111813;
}

.project-cover img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.project-card--featured .project-cover img {
  object-position: center;
}

.project-cover-fallback {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 130px;
  overflow: hidden;
  background:
    linear-gradient(rgb(255 255 255 / 3%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 3%) 1px, transparent 1px),
    #111820;
  background-size: 18px 18px;
}

.fallback-line {
  position: absolute;
  left: 18px;
  height: 2px;
  border-radius: 99px;
  background: #4a8bc1;
}

.fallback-line--one {
  top: 38px;
  width: 54px;
}

.fallback-line--two {
  top: 54px;
  width: 72px;
  opacity: 0.7;
}

.fallback-line--three {
  top: 70px;
  width: 42px;
  opacity: 0.5;
}

.fallback-alert {
  position: absolute;
  top: 52px;
  right: 18px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d36d5f;
  box-shadow: 0 0 0 5px rgb(211 109 95 / 12%);
}

.project-body {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 28px;
}

.project-card--compact .project-body {
  justify-content: center;
  padding: 18px 20px;
}

.project-tag {
  margin: 0 0 10px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.project-card--compact .project-tag {
  margin-bottom: 6px;
  font-size: 9px;
}

.project-title {
  margin: 0;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.3;
}

.project-card--compact .project-title {
  font-size: 14px;
}

.project-impact {
  display: grid;
  gap: 4px;
  max-width: 560px;
  margin: 14px 0 20px;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.55;
}

.project-impact strong {
  color: var(--text-secondary);
  font-weight: 600;
}

.project-summary {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 7px 0 0;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.45;
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.action-btn {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  color: var(--text-secondary);
  background: var(--canvas);
  border: 0.5px solid var(--border-strong);
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  text-decoration: none;
  transition: border-color 0.15s ease, background-color 0.15s ease;
}

a.action-btn:hover {
  border-color: var(--signal);
}

.action-btn:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
}

.action-btn--demo {
  color: var(--signal-text);
  background: var(--signal-soft);
  border-color: var(--signal);
  font-weight: 600;
}

.action-btn--disabled {
  opacity: 0.5;
}

@media (max-width: 1040px) {
  .project-card--featured {
    grid-template-columns: minmax(150px, 31%) minmax(0, 1fr);
  }

  .project-body {
    padding: 24px;
  }
}

@media (max-width: 860px) {
  .project-card--featured {
    min-height: 270px;
  }

  .project-card--compact {
    min-height: 144px;
  }
}

@media (max-width: 640px) {
  .project-card,
  .project-card--featured,
  .project-card--compact {
    grid-template-columns: 1fr;
  }

  .project-card--featured {
    min-height: 0;
  }

  .project-card--featured .project-cover {
    min-height: 0;
    aspect-ratio: 16 / 8;
  }

  .project-card--compact {
    grid-template-columns: 94px minmax(0, 1fr);
    min-height: 124px;
  }

  .project-body {
    padding: 22px;
  }

  .project-card--compact .project-body {
    padding: 16px;
  }

  .project-title {
    font-size: 17px;
  }

  .project-actions {
    margin-top: 4px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: none;
  }
}
</style>
