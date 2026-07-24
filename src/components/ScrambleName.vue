<script setup lang="ts">
import { onMounted } from 'vue'

import { useTextScramble } from '@/composables/useTextScramble'

interface Props {
  text: string
}

const props = defineProps<Props>()

const { displayText, play } = useTextScramble(props.text, {
  revealDelayFrames: 4,
  frameInterval: 30
})

// O atraso curto evita que a animação comece antes da fonte terminar de carregar.
onMounted(() => {
  setTimeout(play, 150)
})
</script>

<template>
  <h1 class="scramble-name" @mouseenter="play">
    {{ displayText }}<span class="cursor" aria-hidden="true" />
  </h1>
</template>

<style scoped>
.scramble-name {
  font-family: var(--font-mono);
  font-size: 56px;
  font-weight: 400;
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  margin-bottom: 14px;
  cursor: default;
  min-width: 12ch;
}

.cursor {
  width: 44px;
  height: 4px;
  background: var(--signal);
  margin-bottom: 10px;
  border-radius: 2px;
  animation: blink 1.1s step-end infinite;
}

@keyframes blink {
  0%,
  45% {
    opacity: 1;
  }
  50%,
  95% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }
}
</style>
