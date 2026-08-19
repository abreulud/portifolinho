import { computed, readonly, ref, watch } from 'vue'

import { localeCodes, messages, type Locale } from '@/i18n/messages'

const STORAGE_KEY = 'portfolio-locale'
const SUPPORTED_LOCALES: Locale[] = ['pt', 'en']

function isLocale(value: string | null): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt'

  const savedLocale = window.localStorage.getItem(STORAGE_KEY)
  if (isLocale(savedLocale)) return savedLocale

  const browserLocale = window.navigator.language.slice(0, 2)
  return isLocale(browserLocale) ? browserLocale : 'pt'
}

const currentLocale = ref<Locale>(getInitialLocale())

watch(
  currentLocale,
  (locale) => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = localeCodes[locale]
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, locale)
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
