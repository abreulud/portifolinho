<script setup lang="ts">
import { computed } from 'vue'

import HeroSection from '@/components/HeroSection.vue'
import ProjectShowcase from '@/components/ProjectShowcase.vue'
import PublicationList from '@/components/PublicationList.vue'
import ScrollHint from '@/components/ScrollHint.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { useLocale } from '@/composables/useLocale'

const { copy } = useLocale()
const homePublications = computed(() => copy.value.posts.items.slice(0, 2))
</script>

<template>
  <main>
    <HeroSection />
    <ScrollHint />

    <section id="projetos">
      <SectionHeader
        :eyebrow="copy.projects.eyebrow"
        :title="copy.projects.sectionTitle"
        :see-all-label="copy.projects.viewAllProjects"
        see-all-to="/projetos"
      />

      <ProjectShowcase :projects="copy.projects.items" />

      <router-link to="/projetos" class="projects-see-all">
        {{ copy.projects.viewAllProjects }}
        <span aria-hidden="true">→</span>
      </router-link>
    </section>

    <section id="blog" class="posts-section">
      <SectionHeader
        :eyebrow="copy.posts.eyebrow"
        :title="copy.posts.sectionTitle"
        :see-all-label="copy.posts.viewAllPosts"
        see-all-to="/blog"
      />

      <PublicationList :posts="homePublications" archive-link="/blog" />

      <router-link to="/blog" class="publications-see-all">
        {{ copy.posts.viewAllPosts }}
        <span aria-hidden="true">→</span>
      </router-link>
    </section>
  </main>
</template>

<style scoped>

#projetos {
  margin-top: 70px;
}

.posts-section {
  margin-top: 64px;
}

.projects-see-all,
.publications-see-all {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 28px auto 0;
  padding: 6px 4px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 12px;
  text-decoration: none;
  transition: gap 0.2s ease, color 0.2s ease;
}

.projects-see-all:hover,
.publications-see-all:hover {
  gap: 12px;
  color: var(--signal);
}

.projects-see-all:focus-visible,
.publications-see-all:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 5px;
  border-radius: 4px;
}

@media (max-width: 640px) {
  .projects-see-all {
    margin-top: 22px;
  }

  .publications-see-all {
    margin-top: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .projects-see-all,
  .publications-see-all {
    transition: none;
  }
}
</style>
