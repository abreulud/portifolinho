import { computed, readonly, ref, watch } from 'vue'

import {
  localeCodes,
  messages,
  type Locale
} from '@/i18n/messages'

const storageKey = 'portfolio-locale'
const supportedLocales: Locale[] = ['pt', 'en', 'es']

function isLocale(value: string | null): value is Locale {
  return supportedLocales.includes(value as Locale)
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt'

  const savedLocale = window.localStorage.getItem(storageKey)
  if (isLocale(savedLocale)) return savedLocale

  const browserLocale = window.navigator.language.slice(0, 2)
  return isLocale(browserLocale) ? browserLocale : 'pt'
}

const currentLocale = ref<Locale>(getInitialLocale())

// Centralizar a troca aqui mantém o conteúdo, o atributo lang e a preferência em sincronia.
watch(
  currentLocale,
  (locale) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = localeCodes[locale]
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, locale)
    }
  },
  { immediate: true }
)

export function useLocale() {
  const copy = computed(() => messages[currentLocale.value])

  function setLocale(locale: Locale) {
    currentLocale.value = locale
  }

  return {
    locale: readonly(currentLocale),
    copy,
    setLocale
  }
}
