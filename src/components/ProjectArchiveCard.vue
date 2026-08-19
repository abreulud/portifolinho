<script setup lang="ts">
import { computed } from 'vue'

import { useLocale } from '@/composables/useLocale'
import type { Project } from '@/types/content'
import { formatShortDate } from '@/utils/formatDate'

const props = withDefaults(
  defineProps<{
    project: Project
    featured?: boolean
  }>(),
  {
    featured: false
  }
)

const { locale, copy } = useLocale()
const statusLabel = computed(() => {
  if (props.project.placeholder) {
    return copy.value.projects.placeholderLabel
  }

  return props.project.status === 'live'
    ? copy.value.projects.liveLabel
    : copy.value.projects.inProgressLabel
})
</script>

<template>
  <component
    :is="project.locked ? 'button' : 'article'"
    class="archive-card"
    :class="{
      'archive-card--featured': featured,
      'archive-card--locked': project.locked,
      'archive-card--placeholder': project.placeholder
    }"
    :type="project.locked ? 'button' : undefined"
    :aria-label="
      project.locked
        ? `${project.title}. ${statusLabel}. ${copy.projects.comingSoon}.`
        : undefined
    "
  >
    <span v-if="project.locked" class="archive-lock" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M7 10V8a5 5 0 0 1 10 0v2m-9 0h8a2 2 0 0 1 2 2v7H6v-7a2 2 0 0 1 2-2Z" />
      </svg>
    </span>

    <div class="archive-visual" aria-hidden="true">
      <img
        v-if="project.coverImage"
        :src="project.coverImage"
        alt=""
        loading="lazy"
        decoding="async"
      />

      <div
        v-else
        class="archive-fallback"
        :class="{ 'archive-fallback--placeholder': project.placeholder }"
      >
        <span v-if="project.placeholder" class="archive-placeholder-mark">•••</span>

        <template v-else>
          <span class="log-line log-line--one"></span>
          <span class="log-line log-line--two"></span>
          <span class="log-line log-line--three"></span>
          <span class="log-pulse"></span>
        </template>
      </div>
    </div>

    <div class="archive-content">
      <div class="archive-kicker">
        <span v-if="featured" class="new-badge">
          {{ copy.projects.newLabel }}
        </span>
        <span>{{ project.index }} / {{ project.tag }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ statusLabel }}</span>
      </div>

      <h2 class="archive-title">{{ project.title }}</h2>

      <ul v-if="project.topics" class="archive-topics">
        <li v-for="topic in project.topics" :key="topic" class="archive-topic">
          {{ topic }}
        </li>
      </ul>

      <div v-else-if="featured && project.impact" class="archive-impact">
        <p>
          <strong>{{ copy.projects.problemLabel }}:</strong>
          {{ project.impact.problem }}
        </p>
        <p>
          <strong>{{ copy.projects.resultLabel }}:</strong>
          {{ project.impact.result }}
        </p>
      </div>

      <p v-else-if="project.impact" class="archive-summary">
        {{ project.impact.result }}
      </p>

      <div class="archive-footer">
        <time v-if="project.publishedAt" :datetime="project.publishedAt" class="archive-date">
          {{ formatShortDate(project.publishedAt, locale) }}
        </time>

        <div class="archive-actions">
          <a
            v-if="project.repoUrl && !project.locked"
            :href="project.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="archive-action"
          >
            {{ copy.projects.sourceCode }}
            <span aria-hidden="true">↗</span>
          </a>

          <a
            v-if="project.demoUrl && !project.locked"
            :href="project.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="archive-action archive-action--primary"
          >
            {{ copy.projects.viewDemo }}
            <span aria-hidden="true">→</span>
          </a>

          <span
            v-if="project.locked || (!project.repoUrl && !project.demoUrl)"
            class="archive-action archive-action--disabled"
            aria-disabled="true"
          >
            {{ copy.projects.comingSoon }}
          </span>
        </div>
      </div>
    </div>
  </component>
</template>

<style scoped>
.archive-card {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  min-height: 170px;
  padding: 0;
  color: inherit;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 20px;
  font: inherit;
  text-align: left;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.archive-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: 0 18px 44px rgb(20 28 23 / 7%);
}

.archive-card--placeholder {
  background: transparent;
  border-style: dashed;
}

.archive-card--placeholder:hover {
  transform: none;
  border-color: var(--border-strong);
  box-shadow: none;
}

.archive-card--placeholder .archive-title {
  color: var(--text-secondary);
}

.archive-card--placeholder .archive-visual {
  background: transparent;
}

.archive-card--locked {
  cursor: pointer;
}

.archive-card--locked:active {
  animation: locked-project-shake 0.36s ease-in-out;
}

.archive-card--locked:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 4px;
}

.archive-lock {
  position: absolute;
  z-index: 2;
  top: 18px;
  right: 18px;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  color: var(--signal-text);
  background: var(--surface);
  border: 0.5px solid var(--border-strong);
  border-radius: 8px;
  box-shadow: 0 6px 18px rgb(20 28 23 / 8%);
}

.archive-lock svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

.archive-card--featured {
  grid-template-columns: minmax(250px, 34%) minmax(0, 1fr);
  min-height: 310px;
}

.archive-visual {
  min-width: 0;
  min-height: 100%;
  overflow: hidden;
  background: #111813;
}

.archive-visual img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.archive-fallback {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 170px;
  background:
    linear-gradient(rgb(255 255 255 / 3%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 3%) 1px, transparent 1px),
    #101821;
  background-size: 22px 22px;
}

.archive-fallback--placeholder {
  display: grid;
  place-items: center;
  background:
    linear-gradient(color-mix(in srgb, var(--border) 20%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--border) 20%, transparent) 1px, transparent 1px),
    transparent;
  background-size: 22px 22px;
  border-right: 0.5px dashed var(--border);
}

.archive-placeholder-mark {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 20px;
  letter-spacing: 0.18em;
}

.log-line {
  position: absolute;
  left: 18%;
  height: 2px;
  border-radius: 99px;
  background: #579ed5;
}

.log-line--one {
  top: 38%;
  width: 46%;
}

.log-line--two {
  top: 48%;
  width: 62%;
  opacity: 0.7;
}

.log-line--three {
  top: 58%;
  width: 32%;
  opacity: 0.48;
}

.log-pulse {
  position: absolute;
  top: calc(48% - 3px);
  right: 19%;
  width: 8px;
  height: 8px;
  background: #d36d5f;
  border-radius: 50%;
  box-shadow: 0 0 0 7px rgb(211 109 95 / 13%);
}

.archive-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 27px 31px;
}

.archive-card--featured .archive-content {
  padding: 36px 40px;
}

.archive-kicker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 13px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.new-badge {
  padding: 5px 10px;
  color: var(--signal-text);
  background: var(--signal-soft);
  border-radius: 999px;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
}

.archive-title {
  margin: 0;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 21px;
  font-weight: 500;
  line-height: 1.3;
  text-wrap: balance;
}

.archive-card--featured .archive-title {
  font-size: clamp(25px, 3vw, 34px);
}

.archive-impact {
  display: grid;
  gap: 6px;
  max-width: 720px;
  margin: 18px 0 24px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}

.archive-impact strong {
  color: var(--text-secondary);
  font-weight: 600;
}

.archive-summary {
  max-width: 720px;
  margin: 10px 0 20px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.6;
}

.archive-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-width: 720px;
  margin: 16px 0 24px;
  padding: 0;
  list-style: none;
}

.archive-topic {
  padding: 6px 12px;
  color: var(--text-secondary);
  background: var(--surface);
  border: 0.5px solid var(--border-strong);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 11px;
  line-height: 1.2;
}

.archive-footer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 14px 24px;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.archive-date {
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 10px;
}

.archive-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.archive-action {
  min-height: 34px;
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 7px 12px;
  color: var(--text-secondary);
  background: var(--canvas);
  border: 0.5px solid var(--border-strong);
  border-radius: 8px;
  font-family: var(--font-mono);
  font-size: 10px;
  text-decoration: none;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.archive-action:hover {
  color: var(--signal-text);
  border-color: var(--signal);
}

.archive-action:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
}

.archive-action--primary {
  color: var(--signal-text);
  background: var(--signal-soft);
  border-color: var(--signal);
  font-weight: 700;
}

.archive-action--disabled {
  opacity: 0.55;
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

@media (max-width: 760px) {
  .archive-card,
  .archive-card--featured {
    grid-template-columns: 1fr;
  }

  .archive-visual {
    min-height: 0;
    aspect-ratio: 16 / 7;
  }

  .archive-card--featured .archive-visual {
    aspect-ratio: 16 / 9;
  }

  .archive-content,
  .archive-card--featured .archive-content {
    padding: 25px 23px;
  }

  .archive-title,
  .archive-card--featured .archive-title {
    font-size: clamp(20px, 6vw, 27px);
    text-wrap: pretty;
  }

  .archive-footer {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .archive-card,
  .archive-action {
    transition: none;
  }

  .archive-card--locked:active {
    animation: none;
  }
}
</style>
