<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

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
const statusLabel = computed(() =>
  props.project.status === 'live'
    ? copy.value.projects.liveLabel
    : copy.value.projects.inProgressLabel
)
</script>

<template>
  <component
    :is="project.locked ? 'button' : 'article'"
    class="project-card"
    :class="[
      `project-card--${variant}`,
      {
        'project-card--locked': project.locked
      }
    ]"
    :type="project.locked ? 'button' : undefined"
    :aria-label="
      project.locked
        ? `${project.title}. ${statusLabel}. ${copy.projects.comingSoon}.`
        : undefined
    "
  >
    <span v-if="project.locked" class="project-lock" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M7 10V8a5 5 0 0 1 10 0v2m-9 0h8a2 2 0 0 1 2 2v7H6v-7a2 2 0 0 1 2-2Z" />
      </svg>
    </span>

    <div class="project-cover" aria-hidden="true">
      <img
        v-if="project.coverImage"
        :src="project.coverImage"
        :class="{
          'project-cover-image--zoomed': project.coverZoom
        }"
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
      <div class="project-meta">
        <p class="project-tag">{{ project.index }} / {{ project.tag.toUpperCase() }}</p>
        <span
          v-if="project.status === 'in-progress'"
          class="project-status"
        >
          {{ statusLabel }}
        </span>
      </div>

      <h3 class="project-title">{{ project.title }}</h3>

      <ul v-if="project.topics" class="project-topics">
        <li v-for="topic in project.topics" :key="topic" class="project-topic">
          {{ topic }}
        </li>
      </ul>

      <p v-else-if="isCompact && project.impact" class="project-summary">
        {{ project.impact.result }}
      </p>

      <p v-else-if="project.impact" class="project-impact">
        <span>
          <strong>{{ copy.projects.problemLabel }}:</strong>
          {{ project.impact.problem }}
        </span>
        <span>
          <strong>{{ copy.projects.resultLabel }}:</strong>
          {{ project.impact.result }}
        </span>
      </p>

      <RouterLink
        v-if="isCompact && project.hasDetails && !project.locked"
        :to="`/projetos/${project.slug}`"
        class="project-inline-link"
      >
        {{ copy.projects.viewProject }}
        <span aria-hidden="true">→</span>
      </RouterLink>

      <div v-if="!isCompact" class="project-actions">
        <RouterLink
          v-if="project.hasDetails && !project.locked"
          :to="`/projetos/${project.slug}`"
          class="action-btn action-btn--demo"
        >
          <span aria-hidden="true">↳</span>
          {{ copy.projects.viewProject }}
        </RouterLink>

        <a
          v-if="project.repoUrl && !project.locked"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn"
        >
          <span aria-hidden="true">⌘</span>
          {{ copy.projects.sourceCode }}
        </a>

        <span
          v-if="
            project.locked ||
            (!project.hasDetails && !project.repoUrl)
          "
          class="action-btn action-btn--disabled"
          aria-disabled="true"
        >
          <span aria-hidden="true">○</span>
          {{ copy.projects.comingSoon }}
        </span>
      </div>
    </div>
  </component>
</template>

<style scoped>
.project-card {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  display: grid;
  padding: 0;
  color: inherit;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 20px;
  font: inherit;
  text-align: left;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-2px);
  box-shadow: 0 18px 44px rgb(20 28 23 / 7%);
}

.project-card--locked {
  cursor: pointer;
}

.project-card--locked:active {
  animation: locked-project-shake 0.36s ease-in-out;
}

.project-card--locked:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 4px;
}

.project-lock {
  position: absolute;
  z-index: 2;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  color: var(--signal-text);
  background: var(--surface);
  border: 0.5px solid var(--border-strong);
  border-radius: 7px;
  box-shadow: 0 6px 18px rgb(20 28 23 / 8%);
}

.project-lock svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
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

.project-cover-image--zoomed {
  object-position: 54% 48%;
  transform: scale(1.36);
  transform-origin: 56% 48%;
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

.project-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  align-items: center;
  margin-bottom: 10px;
}

.project-tag {
  margin: 0;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.project-card--compact .project-meta {
  margin-bottom: 6px;
}

.project-card--compact .project-tag {
  font-size: 9px;
}

.project-status {
  padding: 3px 7px;
  color: var(--signal-text);
  background: var(--signal-soft);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 9px;
  line-height: 1.2;
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

.project-inline-link {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  margin-top: 10px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 600;
  text-decoration: none;
}

.project-inline-link span {
  transition: transform 0.15s ease;
}

.project-inline-link:hover span {
  transform: translateX(3px);
}

.project-inline-link:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 4px;
  border-radius: 3px;
}

.project-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 14px 0 20px;
  padding: 0;
  list-style: none;
}

.project-topic {
  padding: 6px 12px;
  color: var(--text-secondary);
  background: var(--surface);
  border: 0.5px solid var(--border-strong);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.2;
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

@keyframes locked-project-shake {
  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-4px) rotate(-0.2deg);
  }

  50% {
    transform: translateX(4px) rotate(0.2deg);
  }

  75% {
    transform: translateX(-2px);
  }
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
  .project-card,
  .project-inline-link span {
    transition: none;
  }

  .project-card--locked:active {
    animation: none;
  }
}
</style>
