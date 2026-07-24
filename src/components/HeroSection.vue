<script setup lang="ts">
import ProfileIntro from '@/components/ProfileIntro.vue'
import ProfileOrbitCard from '@/components/ProfileOrbitCard.vue'
</script>

<template>
  <section class="hero-wrap">
    <div class="hero">
      <ProfileIntro />

      <ProfileOrbitCard />
    </div>
  </section>
</template>

<style scoped>
.hero-wrap {
  min-height: 640px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 0 72px;
}

.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 64px;
  align-items: center;
  width: 100%;
}

@media (max-width: 860px) {
  .hero {
    grid-template-columns: 1fr;
  }
}
</style>
