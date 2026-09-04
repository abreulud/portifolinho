<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

import { useLocale } from '@/composables/useLocale'
import type { Post } from '@/types/content'
import { formatShortDate } from '@/utils/formatDate'

const props = defineProps<{
  post: Post
  index: number
  linkTo?: string
}>()

const { locale, copy } = useLocale()
const hasLink = computed(
  () =>
    Boolean(
      (props.linkTo || props.post.hasDetails) &&
      !props.post.locked &&
      !props.post.placeholder
    )
)
const linkTarget = computed(
  () => props.linkTo ?? `/blog/${props.post.slug}`
)
const cardComponent = computed(() => {
  if (props.post.locked) return 'button'
  return hasLink.value ? RouterLink : 'div'
})
const cardBindings = computed(() => {
  if (props.post.locked) {
    return {
      type: 'button',
      'aria-label': `${props.post.title}. ${copy.value.posts.inProgressLabel}. ${copy.value.posts.comingSoon}.`
    }
  }

  return hasLink.value ? { to: linkTarget.value } : {}
})
</script>

<template>
  <article
    :id="`publication-${post.slug}`"
    class="publication-card"
    :class="{
      'publication-card--locked': post.locked,
      'publication-card--placeholder': post.placeholder
    }"
  >
    <span v-if="post.locked" class="publication-lock" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M7 10V8a5 5 0 0 1 10 0v2m-9 0h8a2 2 0 0 1 2 2v7H6v-7a2 2 0 0 1 2-2Z" />
      </svg>
    </span>

    <component
      :is="cardComponent"
      v-bind="cardBindings"
      class="publication-link"
      :class="{
        'publication-link--static': !hasLink,
        'publication-link--locked': post.locked,
        'publication-link--placeholder': post.placeholder
      }"
    >
      <span class="publication-index" aria-hidden="true">
        {{ String(index + 1).padStart(2, '0') }}
      </span>

      <div class="publication-content">
        <div class="publication-meta">
          <span>{{ post.placeholder ? copy.posts.placeholderLabel : post.category }}</span>
          <span v-if="post.locked" class="publication-featured">
            {{ copy.posts.inProgressLabel }}
          </span>
          <span v-else-if="post.featured" class="publication-featured">
            {{ copy.posts.featuredLabel }}
          </span>
        </div>

        <h3 class="publication-title">{{ post.title }}</h3>
        <p class="publication-excerpt">{{ post.excerpt }}</p>

        <div v-if="post.locked" class="publication-footer">
          <span>{{ copy.posts.comingSoon }}</span>
        </div>

        <div
          v-else-if="post.publishedAt || post.readingTimeMinutes"
          class="publication-footer"
        >
          <time v-if="post.publishedAt" :datetime="post.publishedAt">
            {{ formatShortDate(post.publishedAt, locale) }}
          </time>
          <span v-if="post.publishedAt && post.readingTimeMinutes" aria-hidden="true">·</span>
          <span v-if="post.readingTimeMinutes">{{ post.readingTimeMinutes }} min</span>
        </div>
      </div>

      <span v-if="post.placeholder" class="publication-placeholder-mark" aria-hidden="true">
        •••
      </span>
      <span v-if="hasLink" class="publication-arrow" aria-hidden="true">↗</span>
      <span v-if="hasLink" class="sr-only">{{ copy.posts.readArticle }}</span>
    </component>
  </article>
</template>

<style scoped>
.publication-card {
  position: relative;
  overflow: hidden;
  min-height: 230px;
  background:
    radial-gradient(circle at 88% 18%, rgb(43 138 96 / 8%), transparent 28%),
    var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 22px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.publication-card::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  content: '';
  background: var(--signal);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.publication-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: 0 20px 50px rgb(20 28 23 / 7%);
}

.publication-card:hover::before {
  transform: scaleY(1);
}

.publication-card--locked {
  cursor: pointer;
}

.publication-card--locked:active {
  animation: locked-publication-shake 0.36s ease-in-out;
}

.publication-card--placeholder {
  background: transparent;
  border-style: dashed;
}

.publication-card--placeholder::before {
  display: none;
}

.publication-card--placeholder:hover {
  transform: none;
  border-color: var(--border-strong);
  box-shadow: none;
}

.publication-lock {
  position: absolute;
  z-index: 3;
  top: 18px;
  right: 18px;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  color: var(--signal-text);
  background: var(--surface);
  border: 0.5px solid var(--border-strong);
  border-radius: 8px;
  box-shadow: 0 6px 18px rgb(20 28 23 / 8%);
}

.publication-lock svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.7;
}

.publication-link {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  min-height: 230px;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 44px;
  gap: 20px;
  align-items: start;
  padding: 30px 32px;
  color: inherit;
  background: transparent;
  border: 0;
  font: inherit;
  text-align: left;
  text-decoration: none;
}

.publication-link--locked {
  width: 100%;
  cursor: pointer;
}

.publication-link--placeholder {
  background:
    linear-gradient(color-mix(in srgb, var(--border) 15%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--border) 15%, transparent) 1px, transparent 1px);
  background-size: 22px 22px;
}

.publication-link:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: -5px;
  border-radius: 22px;
}

.publication-link--static {
  grid-template-columns: 48px minmax(0, 1fr);
}

.publication-link--static.publication-link--placeholder {
  grid-template-columns: 48px minmax(0, 1fr) 44px;
}

.publication-index {
  padding-top: 3px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 13px;
}

.publication-content {
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-self: stretch;
}

.publication-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin-bottom: 14px;
  color: var(--signal-text);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.publication-featured {
  padding: 3px 7px;
  color: var(--text-secondary);
  background: var(--signal-soft);
  border-radius: 999px;
  letter-spacing: 0;
  text-transform: none;
}

.publication-title {
  max-width: 800px;
  margin: 0;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: clamp(21px, 2.4vw, 30px);
  font-weight: 500;
  line-height: 1.24;
  text-wrap: balance;
}

.publication-card--placeholder .publication-title {
  color: var(--text-secondary);
}

.publication-excerpt {
  max-width: 720px;
  margin: 13px 0 24px;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.65;
}

.publication-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  align-items: center;
  margin-top: auto;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 11px;
}

.publication-arrow {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  justify-self: end;
  color: var(--signal-text);
  border: 0.5px solid var(--border-strong);
  border-radius: 50%;
  font-size: 17px;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.25s ease;
}

.publication-placeholder-mark {
  grid-column: 3;
  grid-row: 1 / span 2;
  align-self: center;
  justify-self: end;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 17px;
  letter-spacing: 0.16em;
}

@keyframes locked-publication-shake {
  0%,
  100% {
    transform: translateX(0);
  }

  25% {
    transform: translateX(-4px) rotate(-0.2deg);
  }

  50% {
    transform: translateX(4px) rotate(0.2deg);
  }

  75% {
    transform: translateX(-2px);
  }
}

.publication-card:hover .publication-arrow {
  color: var(--surface);
  background: var(--signal);
  border-color: var(--signal);
  transform: translate(2px, -2px);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .publication-card,
  .publication-link {
    min-height: 0;
  }

  .publication-link {
    grid-template-columns: minmax(0, 1fr) 36px;
    gap: 14px;
    padding: 23px 21px 24px;
  }

  .publication-link--static {
    grid-template-columns: minmax(0, 1fr);
  }

  .publication-link--static.publication-link--placeholder {
    grid-template-columns: minmax(0, 1fr) 36px;
  }

  .publication-index {
    grid-column: 1 / -1;
    padding: 0;
    font-size: 11px;
  }

  .publication-content {
    grid-column: 1;
  }

  .publication-arrow {
    grid-column: 2;
    grid-row: 2;
    width: 34px;
    height: 34px;
    font-size: 15px;
  }

  .publication-placeholder-mark {
    grid-column: 2;
    grid-row: 2;
  }

  .publication-meta {
    margin-bottom: 10px;
  }

  .publication-title {
    font-size: 19px;
    line-height: 1.3;
    text-wrap: pretty;
  }

  .publication-excerpt {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    margin: 11px 0 20px;
    font-size: 13px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .publication-card,
  .publication-card::before,
  .publication-arrow {
    transition: none;
  }

  .publication-card--locked:active {
    animation: none;
  }
}
</style>
