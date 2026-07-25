<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { useLocale } from '@/composables/useLocale'
import {
  availableLocales,
  localeNames,
  navigationItems
} from '@/i18n/messages'

const route = useRoute()
const { locale, copy, setLocale } = useLocale()
const isDarkMode = ref(false)

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <div class="nav-wrap">
    <nav class="nav" :aria-label="copy.accessibility.mainNavigation">
      <router-link
        v-for="link in navigationItems"
        :key="link.path"
        :to="link.path"
        class="nav-link"
        :class="{ 'nav-link--active': route.path === link.path }"
      >
        {{ copy.navigation[link.key] }}
      </router-link>

      <span class="divider" aria-hidden="true" />

      <div
        class="locale-switch"
        role="group"
        :aria-label="copy.accessibility.languageSelector"
      >
        <button
          v-for="option in availableLocales"
          :key="option"
          type="button"
          class="locale-option"
          :class="{ 'locale-option--active': locale === option }"
          :aria-label="localeNames[option]"
          :aria-pressed="locale === option"
          :title="localeNames[option]"
          @click="setLocale(option)"
        >
          {{ option.toUpperCase() }}
        </button>
      </div>

      <button
        type="button"
        class="theme-btn"
        :aria-label="
          isDarkMode
            ? copy.accessibility.switchToLightTheme
            : copy.accessibility.switchToDarkTheme
        "
        @click="toggleTheme"
      >
        {{ isDarkMode ? '𖤓' : '⏾' }}
      </button>
    </nav>
  </div>
</template>

<style scoped>
.nav-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 88px;
}

.nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 28px;
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 999px;
  padding: 12px 24px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 3%);
}

.nav-link {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.03em;
  color: var(--text-muted);
  text-decoration: none;
  padding: 8px 4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-link--active {
  color: var(--ink);
  font-weight: 700;
}

.nav-link--active::before {
  content: '•';
  color: var(--signal);
}

.divider {
  width: 1px;
  height: 16px;
  background: var(--border-strong);
}

.locale-switch {
  display: flex;
  gap: 8px;
  align-items: center;
}

.locale-option {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
   width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.3s ease, color 0.3s ease;

}

.locale-option--active {
  color: var(--ink);
  font-weight: 700;
  background-color: #093a240e;
  border-radius: 50%;
  box-sizing: border-box;
  width: 32px;          
  height: 32px;         
  padding: 0;
}

.locale-option:hover {
  background-color: #093a2405;
  color: var(--ink);
  border-radius: 50%;
  box-sizing: border-box;
  width: 32px;          
  height: 32px;         
  padding: 0;
}

.theme-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0.5px solid var(--border-strong);
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  font-size: 14px;
  cursor: pointer;
}

@media (max-width: 720px) {
  .nav {
    gap: 12px;
    border-radius: 24px;
    padding: 10px 16px;
  }

  .divider {
    display: none;
  }
}
</style>
