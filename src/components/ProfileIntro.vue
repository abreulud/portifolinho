<script setup lang="ts">
import { PhGithubLogo } from '@phosphor-icons/vue'

import ProfileStatItem from '@/components/ProfileStatItem.vue'
import ScrambleName from '@/components/ScrambleName.vue'
import { useLocale } from '@/composables/useLocale'
import { techStack } from '@/i18n/messages'

const { copy } = useLocale()
</script>

<template>
  <div class="intro">
    <p class="whoami">$ whoami</p>

    <ScrambleName text="Ludmilla Abreu" />

    <p class="role-line">
      {{ copy.profile.roleStart }}
      <strong>{{ copy.profile.webSecurity }}</strong>
      {{ copy.profile.roleConnector }}
      <strong>{{ copy.profile.backendDevelopment }}</strong>.
    </p>

    <ul class="stack-row" :aria-label="copy.accessibility.techStack">
      <li v-for="tech in techStack" :key="tech" class="stack-pill">{{ tech }}</li>
    </ul>

    <div class="proof-row">
      <ProfileStatItem
        v-for="stat in copy.profile.stats"
        :key="stat.label"
        :stat="stat"
      />
    </div>

    <div class="links">
      <a
        v-for="link in copy.profile.socialLinks"
        :key="link.label"
        :href="link.href"
        :download="link.download || undefined"
        :target="link.download ? undefined : '_blank'"
        :rel="link.download ? undefined : 'noopener noreferrer'"
        class="link-btn"
        :class="{ 'link-btn--primary': link.primary }"
      >
        <PhGithubLogo
          v-if="link.brand === 'github'"
          :size="14"
          weight="regular"
          class="social-icon"
          aria-hidden="true"
        />
        <svg
          v-else-if="link.brand === 'linkedin'"
          class="social-icon social-icon--linkedin"
          viewBox="0 0 50 50"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56c3.97,0,7.19,2.73,7.19,8.26V39z" />
        </svg>
        <span v-else-if="link.glyph" aria-hidden="true">{{ link.glyph }}</span>
        {{ link.label }}
      </a>
    </div>

    <p class="availability">
      <span class="availability-dot" aria-hidden="true" />
      {{ copy.profile.availability }}
    </p>
  </div>
</template>

<style scoped>
.whoami {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--signal-text);
  margin-bottom: 18px;
}

.role-line {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.role-line strong {
  color: var(--ink);
  font-weight: 600;
}

.stack-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  list-style: none;
}

.stack-pill {
  font-family: var(--font-mono);
  font-size: 11px;
  border: 0.5px solid var(--border-strong);
  border-radius: 999px;
  padding: 6px 12px;
  color: var(--text-secondary);
  background: var(--surface);
}

.proof-row {
  display: flex;
  margin-bottom: 28px;
  border: 0.5px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
}

.links {
  display: flex;
  gap: 12px;
  margin-bottom: 22px;
  flex-wrap: wrap;
}

.link-btn {
  font-family: var(--font-mono);
  font-size: 12px;
  border: 0.5px solid var(--border-strong);
  border-radius: 999px;
  padding: 11px 18px;
  color: var(--ink);
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  text-decoration: none;
}

.link-btn--primary {
  color: var(--canvas);
  background: var(--ink);
  border-color: var(--ink);
  font-weight: 700;
}

.social-icon {
  flex: 0 0 auto;
  width: 14px;
  height: 14px;
}

.social-icon--linkedin {
  flex-basis: 16px;
  width: 16px;
  height: 16px;
  display: block;
}

.availability {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}

.availability-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--signal);
}
</style>
