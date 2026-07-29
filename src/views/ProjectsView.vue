<script setup lang="ts">
import { computed } from 'vue'

import ProjectArchiveCard from '@/components/ProjectArchiveCard.vue'
import ScrambleName from '@/components/ScrambleName.vue'
import { useLocale } from '@/composables/useLocale'

const { copy } = useLocale()
const orderedProjects = computed(() =>
  [...copy.value.projects.items].sort((firstProject, secondProject) =>
    secondProject.publishedAt.localeCompare(firstProject.publishedAt)
  )
)
</script>

<template>
  <main class="projects-page">
    <header class="projects-header">
      <p class="projects-eyebrow">{{ copy.projects.pageEyebrow }}</p>
      <div class="projects-title">
        <ScrambleName
          :key="copy.projects.pageTitle"
          :text="copy.projects.pageTitle"
        />
      </div>
      <p class="projects-intro">{{ copy.projects.pageIntro }}</p>
    </header>

    <section class="projects-archive" :aria-label="copy.projects.sectionTitle">
      <ProjectArchiveCard
        v-for="(project, index) in orderedProjects"
        :key="project.slug"
        :project="project"
        :featured="index === 0"
      />
    </section>
  </main>
</template>

<style scoped>
.projects-page {
  position: relative;
  padding-top: 72px;
}

.projects-header {
  max-width: 780px;
  margin-bottom: 38px;
}

.projects-eyebrow {
  margin-bottom: 18px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
}

.projects-title {
  margin-bottom: 22px;
}

.projects-intro {
  max-width: 700px;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.7;
}

.projects-archive {
  display: grid;
  gap: 20px;
}

@media (max-width: 640px) {
  .projects-page {
    padding-top: 48px;
  }

  .projects-header {
    margin-bottom: 30px;
  }

  .projects-intro {
    font-size: 14px;
  }
}
</style>
