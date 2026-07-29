<script setup lang="ts">
import { computed } from 'vue'

import ProjectCard from '@/components/ProjectCard.vue'
import type { Project } from '@/types/content'

const props = defineProps<{
  projects: Project[]
}>()

const featuredProject = computed(() => props.projects[0])
const supportingProjects = computed(() => props.projects.slice(1))
</script>

<template>
  <div class="projects-showcase">
    <ProjectCard
      v-if="featuredProject"
      :project="featuredProject"
      variant="featured"
    />

    <div v-if="supportingProjects.length" class="projects-side-stack">
      <ProjectCard
        v-for="project in supportingProjects"
        :key="project.slug"
        :project="project"
        variant="compact"
      />
    </div>
  </div>
</template>

<style scoped>
.projects-showcase {
  display: grid;
  grid-template-columns: minmax(0, 1.32fr) minmax(300px, 1fr);
  gap: 20px;
  align-items: stretch;
}

.projects-side-stack {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

@media (max-width: 860px) {
  .projects-showcase {
    grid-template-columns: 1fr;
  }

  .projects-side-stack {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: none;
  }
}

@media (max-width: 640px) {
  .projects-side-stack {
    grid-template-columns: 1fr;
  }
}
</style>
