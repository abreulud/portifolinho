<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

withDefaults(
  defineProps<{
    delay?: number
    direction?: 'left' | 'right'
  }>(),
  {
    delay: 0,
    direction: 'left'
  }
)

const element = ref<HTMLElement | null>(null)
const isReady = ref(false)
const isVisible = ref(false)
let observer: IntersectionObserver | undefined

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    isVisible.value = true
    return
  }

  isReady.value = true
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return

      isVisible.value = true
      observer?.disconnect()
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.16
    }
  )

  if (element.value) observer.observe(element.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div
    ref="element"
    class="reveal"
    :class="[
      `reveal--${direction}`,
      {
        'reveal--ready': isReady,
        'is-visible': isVisible
      }
    ]"
    :style="{ '--reveal-delay': `${delay}ms` }"
  >
    <slot />
  </div>
</template>

<style scoped>
.reveal {
  min-width: 0;
}

.reveal--ready {
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay),
    filter 0.7s ease var(--reveal-delay),
    clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1) var(--reveal-delay);
}

.reveal--ready:not(.is-visible) {
  opacity: 0;
  filter: blur(7px);
  clip-path: inset(0 0 18% 0 round 20px);
}

.reveal--ready.reveal--left:not(.is-visible) {
  transform: translate3d(-34px, 34px, 0);
}

.reveal--ready.reveal--right:not(.is-visible) {
  transform: translate3d(34px, 34px, 0);
}

.reveal--ready.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  filter: blur(0);
  clip-path: inset(0 0 0 0 round 20px);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    filter: none;
    clip-path: none;
    transition: none;
  }
}
</style>
