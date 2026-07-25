import { readonly, ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const storageKey = 'portfolio-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const saved = window.localStorage.getItem(storageKey)
  return saved === 'dark' ? 'dark' : 'light'
}

const currentTheme = ref<Theme>(getInitialTheme())

// mesma ideia do useLocale: um watch só aplicando no <html> e salvando,
// em vez de cada componente cuidar disso por conta própria
watch(
  currentTheme,
  (theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey, theme)
    }
  },
  { immediate: true }
)

export function useTheme() {
  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme: readonly(currentTheme),
    toggleTheme
  }
}