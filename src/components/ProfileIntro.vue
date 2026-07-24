<script setup lang="ts">
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
        target="_blank"
        rel="noopener noreferrer"
        class="link-btn"
        :class="{ 'link-btn--primary': link.primary }"
      >
        {{ link.glyph }} {{ link.label }}
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
  background: var(--ink);
  color: var(--canvas);
  border-color: var(--ink);
  font-weight: 700;
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
