<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

interface PreviewRailItem {
  id: string
  label: string
  description: string
}

const props = defineProps<{
  items: PreviewRailItem[]
  label: string
}>()

const hoveredId = ref<string | null>(null)
const focusedId = ref<string | null>(null)
const activeId = ref<string | null>(null)
const scrollPosition = ref(0)
let scrollFrame: number | null = null
let contentResizeObserver: ResizeObserver | undefined

const selectedId = computed(() => hoveredId.value ?? focusedId.value)
const selectedIndex = computed(() =>
  props.items.findIndex((item) => item.id === selectedId.value)
)
const scaledPosition = computed(() =>
  selectedIndex.value >= 0 ? selectedIndex.value : scrollPosition.value
)
const selectedItem = computed(() =>
  props.items.find((item) => item.id === selectedId.value)
)

function tickScale(index: number) {
  const distance = Math.abs(scaledPosition.value - index)

  if (distance <= 1) return 1 - distance * 0.32
  if (distance <= 2) return 0.68 - (distance - 1) * 0.24
  if (distance <= 3) return 0.44 - (distance - 2) * 0.19
  return 0.25
}

function clearHoveredItem(id: string) {
  if (hoveredId.value === id) hoveredId.value = null
}

function clearFocusedItem(id: string) {
  if (focusedId.value === id) focusedId.value = null
}

function updateActiveItem() {
  scrollFrame = null

  const headings = props.items
    .map((item) => document.getElementById(item.id))
    .filter((heading): heading is HTMLElement => Boolean(heading))

  if (!headings.length) {
    activeId.value = null
    return
  }

  const headingPositions = headings.map(
    (heading) => heading.getBoundingClientRect().top + window.scrollY
  )
  const activationLine = Math.min(
    Math.max(window.innerHeight * 0.36, 140),
    300
  )
  const readingPosition = window.scrollY + activationLine
  const reachedPageEnd =
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 2

  if (reachedPageEnd) {
    const lastIndex = headings.length - 1
    activeId.value = headings[lastIndex].id
    scrollPosition.value = lastIndex
    return
  }

  let currentIndex = 0

  for (let index = 1; index < headingPositions.length; index += 1) {
    if (headingPositions[index] > readingPosition) break
    currentIndex = index
  }

  const nextPosition = headingPositions[currentIndex + 1]
  const currentPosition = headingPositions[currentIndex]

  activeId.value = headings[currentIndex].id

  if (nextPosition === undefined || readingPosition <= currentPosition) {
    scrollPosition.value = currentIndex
    return
  }

  const sectionProgress = Math.min(
    1,
    (readingPosition - currentPosition) / (nextPosition - currentPosition)
  )
  scrollPosition.value = currentIndex + sectionProgress
}

function scheduleActiveItemUpdate() {
  if (scrollFrame !== null) return
  scrollFrame = window.requestAnimationFrame(updateActiveItem)
}

function navigateToHeading(event: MouseEvent, id: string) {
  const heading = document.getElementById(id)
  if (!heading) return

  event.preventDefault()
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  heading.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start'
  })
  window.history.replaceState(null, '', `#${id}`)
  activeId.value = id
}

onMounted(() => {
  updateActiveItem()
  window.addEventListener('scroll', scheduleActiveItemUpdate, { passive: true })
  window.addEventListener('resize', scheduleActiveItemUpdate)

  if ('ResizeObserver' in window) {
    contentResizeObserver = new ResizeObserver(scheduleActiveItemUpdate)
    contentResizeObserver.observe(document.body)
  }
})

watch(
  () => props.items,
  async () => {
    await nextTick()
    updateActiveItem()
  }
)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleActiveItemUpdate)
  window.removeEventListener('resize', scheduleActiveItemUpdate)
  contentResizeObserver?.disconnect()

  if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame)
})
</script>

<template>
  <nav
    v-if="items.length"
    class="preview-rail"
    :class="{ 'preview-rail--interacting': selectedId }"
    :aria-label="label"
  >
    <ol class="preview-rail__list">
      <li v-for="(item, index) in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          class="preview-rail__link"
          :aria-label="item.label"
          :aria-current="activeId === item.id ? 'location' : undefined"
          @mouseenter="hoveredId = item.id"
          @mouseleave="clearHoveredItem(item.id)"
          @focus="focusedId = item.id"
          @blur="clearFocusedItem(item.id)"
          @click="navigateToHeading($event, item.id)"
        >
          <span
            class="preview-rail__tick"
            :class="{
              'preview-rail__tick--active': selectedId === item.id,
              'preview-rail__tick--current': activeId === item.id
            }"
            :style="{ '--tick-scale': tickScale(index) }"
            aria-hidden="true"
          ></span>
        </a>
      </li>
    </ol>

    <Transition name="preview-card">
      <div
        v-if="selectedItem"
        :key="selectedItem.id"
        class="preview-rail__card"
        aria-hidden="true"
      >
        <span class="preview-rail__card-index">
          {{ String(selectedIndex + 1).padStart(2, '0') }}
        </span>
        <strong>{{ selectedItem.label }}</strong>
        <p>{{ selectedItem.description }}</p>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.preview-rail {
  position: fixed;
  z-index: 20;
  top: 50%;
  left: 18px;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
}

.preview-rail__list {
  width: 34px;
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 10px 0;
  list-style: none;
}

.preview-rail__link {
  width: 34px;
  height: 12px;
  display: flex;
  align-items: center;
  color: var(--text-muted);
  text-decoration: none;
}

.preview-rail__tick {
  width: 28px;
  height: 2px;
  display: block;
  background: currentcolor;
  border-radius: 999px;
  opacity: 0.52;
  transform: scaleX(var(--tick-scale));
  transform-origin: left center;
  transition:
    color 0.18s ease,
    opacity 0.18s ease,
    transform 80ms linear;
}

.preview-rail--interacting .preview-rail__tick {
  transition:
    color 0.18s ease,
    opacity 0.18s ease,
    transform 0.24s cubic-bezier(0.22, 1, 0.36, 1);
}

.preview-rail__tick--active {
  color: var(--signal);
  opacity: 1;
}

.preview-rail__tick--current {
  color: var(--signal-text);
  opacity: 0.82;
}

.preview-rail__tick--active.preview-rail__tick--current {
  color: var(--signal);
  opacity: 1;
}

.preview-rail__link:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 2px;
  border-radius: 4px;
}

.preview-rail__card {
  position: absolute;
  top: 50%;
  left: 45px;
  width: min(290px, calc(100vw - 82px));
  padding: 15px 17px 16px;
  background: color-mix(in srgb, var(--surface) 94%, transparent);
  border: 0.5px solid var(--border-strong);
  border-radius: 12px;
  box-shadow: 0 16px 45px rgb(20 28 23 / 12%);
  pointer-events: none;
  transform: translateY(-50%);
  backdrop-filter: blur(12px);
}

.preview-rail__card-index {
  display: block;
  margin-bottom: 7px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.08em;
}

.preview-rail__card strong {
  display: block;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
}

.preview-rail__card p {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  margin-top: 7px;
  color: var(--text-muted);
  font-size: 11px;
  line-height: 1.55;
}

.preview-card-enter-active,
.preview-card-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.2s ease;
}

.preview-card-enter-from,
.preview-card-leave-to {
  opacity: 0;
  transform: translate(7px, -50%);
}

@media (max-width: 900px) {
  .preview-rail {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview-rail__tick,
  .preview-card-enter-active,
  .preview-card-leave-active {
    transition: none;
  }
}
</style>
