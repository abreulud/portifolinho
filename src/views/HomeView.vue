<script setup lang="ts">
import { computed } from 'vue'

import CompactPostCard from '@/components/CompactPostCard.vue'
import FeaturedPostCard from '@/components/FeaturedPostCard.vue'
import HeroSection from '@/components/HeroSection.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ScrollHint from '@/components/ScrollHint.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import { useLocale } from '@/composables/useLocale'

const { copy } = useLocale()
const featuredPost = computed(() => copy.value.posts.items[0])
const otherPosts = computed(() => copy.value.posts.items.slice(1))
</script>

<template>
  <HeroSection />
  <ScrollHint />

  <section class="posts-section">
    <SectionHeader
      :eyebrow="copy.posts.eyebrow"
      :title="copy.posts.sectionTitle"
      :see-all-label="copy.accessibility.seeAll"
      see-all-to="/blog"
    />

    <div class="posts-grid">
      <FeaturedPostCard v-if="featuredPost" :post="featuredPost" />

      <div class="posts-side-stack">
        <CompactPostCard
          v-for="(post, i) in otherPosts"
          :key="post.slug"
          :post="post"
          :index="String(i + 1).padStart(2, '0')"
        />
      </div>
    </div>
  </section>

  <section class="projects-section">
    <SectionHeader
      :eyebrow="copy.projects.eyebrow"
      :title="copy.projects.sectionTitle"
      :see-all-label="copy.accessibility.seeAll"
      see-all-to="/projetos"
    />

    <div class="projects-grid">
      <ProjectCard
        v-for="project in copy.projects.items"
        :key="project.slug"
        :project="project"
      />
    </div>
  </section>
</template>

<style scoped>
.posts-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 20px;
}

.posts-side-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.projects-section {
  margin-top: 64px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 860px) {
  .posts-grid,
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
