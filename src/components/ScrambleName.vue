<script setup lang="ts">
import { onMounted } from 'vue'

import { useTextScramble } from '@/composables/useTextScramble'

interface Props {
  text: string
}

const INITIAL_ANIMATION_DELAY = 150

const props = defineProps<Props>()
const { displayText, play } = useTextScramble(props.text, {
  revealDelayFrames: 4,
  frameInterval: 30
})

onMounted(() => {
  setTimeout(play, INITIAL_ANIMATION_DELAY)
})
</script>

<template>
  <h1 class="scramble-name" @mouseenter="play">
    {{ displayText }}<span class="cursor" aria-hidden="true" />
  </h1>
</template>

<style scoped>
.scramble-name {
  display: inline;
  font-family: var(--font-mono);
  font-size: 53px;
  font-weight: 400;
  cursor: default;
}

.cursor {
  display: inline-block;
  width: 27px;
  height: 4px;
  margin-left: 2px;
  vertical-align: baseline;
  background: var(--signal);
  border-radius: 1px;
  white-space: nowrap;
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
