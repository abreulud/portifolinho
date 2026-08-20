<script setup lang="ts">
import type { Container, ISourceOptions } from '@tsparticles/engine'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

import { useTheme } from '@/composables/useTheme'
import { getParticlesEngine } from '@/utils/particlesEngine'

const TRAIL_ID = 'binary-cursor-trail'
const EMISSION_INTERVAL = 65
const CURSOR_TAIL_OFFSET = { x: 11, y: 17 }

function getTrailColor() {
  const styles = getComputedStyle(document.documentElement)
  return styles.getPropertyValue('--text-muted').trim() || '#777a74'
}

function getTrailOpacity() {
  return document.documentElement.dataset.theme === 'dark' ? 0.62 : 0.86
}

function createOptions(): ISourceOptions {
  return {
    detectRetina: true,
    fpsLimit: 45,
    fullScreen: false,
    pauseOnBlur: true,
    pauseOnOutsideViewport: false,
    resize: {
      delay: 0.3,
      enable: true
    },
    particles: {
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'destroy'
        },
        speed: {
          min: 0.08,
          max: 0.24
        },
        straight: false
      },
      number: {
        value: 0
      },
      opacity: {
        value: {
          min: 0.1,
          max: getTrailOpacity()
        },
        animation: {
          destroy: 'min',
          enable: true,
          mode: 'decrease',
          speed: 0.55,
          startValue: 'max',
          sync: true
        }
      },
      paint: {
        fill: {
          color: {
            value: getTrailColor()
          },
          enable: true,
          opacity: 0.95
        }
      },
      shape: {
        type: 'text',
        options: {
          text: {
            font: 'JetBrains Mono',
            style: '',
            value: ['0', '1'],
            weight: '500'
          }
        }
      },
      size: {
        value: {
          min: 4,
          max: 6
        }
      }
    }
  }
}

const { theme } = useTheme()
const isEnabled = ref(false)
const trailElement = ref<HTMLDivElement>()

let container: Container | undefined
let finePointerQuery: MediaQueryList | undefined
let reducedMotionQuery: MediaQueryList | undefined
let renderRequest = 0
let lastEmission = 0

function destroyTrail() {
  renderRequest += 1
  container?.destroy()
  container = undefined
  lastEmission = 0
}

async function renderTrail() {
  const currentRequest = ++renderRequest
  container?.destroy()
  container = undefined

  const engine = await getParticlesEngine()

  if (currentRequest !== renderRequest || !isEnabled.value || !trailElement.value) return

  container = await engine.load({
    element: trailElement.value,
    id: TRAIL_ID,
    options: createOptions()
  })
}

function updateAvailability() {
  isEnabled.value = Boolean(finePointerQuery?.matches && !reducedMotionQuery?.matches)
}

function emitBit(event: MouseEvent) {
  if (!container) return

  const now = performance.now()
  if (now - lastEmission < EMISSION_INTERVAL) return

  const canvas = container.canvas.domElement
  if (!canvas) return

  const bounds = canvas.getBoundingClientRect()
  const pixelRatio = container.retina.pixelRatio

  container.particles.push(1, {
    x: (event.clientX - bounds.left + CURSOR_TAIL_OFFSET.x) * pixelRatio,
    y: (event.clientY - bounds.top + CURSOR_TAIL_OFFSET.y) * pixelRatio
  })

  lastEmission = now
}

watch(isEnabled, (enabled) => {
  if (!enabled) {
    destroyTrail()
    return
  }

  void renderTrail()
}, { flush: 'post' })

watch(theme, () => {
  if (isEnabled.value) void renderTrail()
})

onMounted(() => {
  finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  finePointerQuery.addEventListener('change', updateAvailability)
  reducedMotionQuery.addEventListener('change', updateAvailability)
  window.addEventListener('mousemove', emitBit, { passive: true })
  updateAvailability()
})

onBeforeUnmount(() => {
  finePointerQuery?.removeEventListener('change', updateAvailability)
  reducedMotionQuery?.removeEventListener('change', updateAvailability)
  window.removeEventListener('mousemove', emitBit)
  destroyTrail()
})
</script>

<template>
  <div
    v-if="isEnabled"
    :id="TRAIL_ID"
    ref="trailElement"
    class="binary-cursor-trail"
    aria-hidden="true"
  />
</template>

<style scoped>
.binary-cursor-trail {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.binary-cursor-trail :deep(canvas) {
  display: block;
  pointer-events: none;
}
</style>
