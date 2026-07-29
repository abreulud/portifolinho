<script setup lang="ts">
import PublicationCard from '@/components/PublicationCard.vue'
import RevealOnScroll from '@/components/RevealOnScroll.vue'
import type { Post } from '@/types/content'

defineProps<{
  posts: Post[]
  archiveLink?: string
}>()
</script>

<template>
  <div class="publication-list">
    <RevealOnScroll
      v-for="(post, index) in posts"
      :key="post.slug"
      :delay="index * 90"
      :direction="index % 2 === 0 ? 'left' : 'right'"
    >
      <PublicationCard
        :post="post"
        :index="index"
        :link-to="archiveLink"
      />
    </RevealOnScroll>
  </div>
</template>

<style scoped>
.publication-list {
  display: grid;
  gap: 18px;
}
</style>
