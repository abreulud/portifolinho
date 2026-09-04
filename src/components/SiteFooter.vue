<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const currentYear = new Date().getFullYear()
const { copy } = useLocale()
</script>

<template>
  <footer class="site-footer">
    <span>© {{ currentYear }} {{ copy.footer.createdBy }}</span>
    <span>
      {{ copy.footer.location }} ·
      <a href="mailto:ludmillaabreu07@gmail.com" class="footer-link">
        {{ copy.footer.availability }} →
      </a>
    </span>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 80px;
  padding-top: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 14px 24px;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.footer-link {
  color: var(--signal-text);
  text-decoration: none;
}

@media (max-width: 640px) {
  .site-footer {
    flex-direction: column;
  }
}
</style>
