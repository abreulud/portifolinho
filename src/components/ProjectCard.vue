<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import type { Project } from '@/types/content'

defineProps<{ project: Project }>()
const { copy } = useLocale()
</script>

<template>
  <article class="project-card">
    <div v-if="project.coverImage" class="project-cover">
      <img :src="project.coverImage" alt="" loading="lazy" decoding="async" />
    </div>

    <div class="project-body">
      <p class="project-tag">{{ project.index }} / {{ project.tag.toUpperCase() }}</p>
      <h4 class="project-title">{{ project.title }}</h4>

      <p class="project-impact">
        <strong>{{ copy.projects.problemLabel }}:</strong> {{ project.impact.problem }}<br />
        <strong>{{ copy.projects.resultLabel }}:</strong> {{ project.impact.result }}
      </p>

      <div class="project-actions">
        <a :href="project.repoUrl" target="_blank" rel="noopener noreferrer" class="action-btn">
          ⌘ {{ copy.projects.sourceCode }}
        </a>

        <a
          v-if="project.demoUrl"
          :href="project.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="action-btn action-btn--demo"
        >
          ▶ {{ copy.projects.viewDemo }}
        </a>

        <span v-else class="action-btn action-btn--disabled" aria-disabled="true">
          ▶ {{ copy.projects.comingSoon }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  transition: border-color 0.15s;
}

.project-card:hover {
  border-color: var(--border-strong);
}

.project-cover {
  aspect-ratio: 16 / 9;
  background: var(--canvas);
}

.project-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.project-body {
  padding: 26px;
}

.project-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--signal-text);
  margin-bottom: 12px;
}

.project-title {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
}

.project-impact {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  margin-bottom: 16px;
}

.project-impact strong {
  color: var(--text-secondary);
  font-weight: 600;
}

.project-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  font-family: var(--font-mono);
  font-size: 11px;
  border: 0.5px solid var(--border-strong);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 36px;
  text-decoration: none;
  background: var(--canvas);
}

.action-btn--demo {
  background: var(--signal-soft);
  border-color: var(--signal);
  color: var(--signal-text);
  font-weight: 600;
}

.action-btn--disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
