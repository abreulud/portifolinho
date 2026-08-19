<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="app-background">
    <div class="page">
      <NavBar />
      <router-view />
      <SiteFooter />
    </div>
  </div>
</template>

<style scoped>
.app-background {
  min-height: 100vh;
  overflow-x: clip;
}

.page {
  padding: 64px 80px 96px;
  max-width: 1280px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .page {
    padding: 32px 20px 64px;
  }
}
</style>
