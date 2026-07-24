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
  border-top: 0.5px solid var(--border);
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.footer-link {
  color: var(--signal-text);
  text-decoration: none;
}
</style>
