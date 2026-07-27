import { readonly, ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'

  const savedTheme = window.localStorage.getItem(STORAGE_KEY)
  return savedTheme === 'dark' ? 'dark' : 'light'
}

const currentTheme = ref<Theme>(getInitialTheme())

watch(
  currentTheme,
  (theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, theme)
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
