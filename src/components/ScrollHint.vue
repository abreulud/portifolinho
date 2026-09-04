<script setup lang="ts">
import { PhCaretDown } from '@phosphor-icons/vue'
</script>

<template>
  <div class="scroll-hint" aria-hidden="true">
    <PhCaretDown :size="20" />
  </div>
</template>

<style scoped>
.scroll-hint {
  display: flex;
  justify-content: center;
  margin-bottom: 56px;
  color: var(--text-muted);
  animation: bob 2s ease-in-out infinite;
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-hint {
    animation: none;
  }
}
</style>
