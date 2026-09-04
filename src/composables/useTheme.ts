import { nextTick, readonly, ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'portfolio-theme'
const TRANSITION_DURATION = 700

let transitionRunning = false

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
  async function toggleTheme() {
    if (transitionRunning) return

    const nextTheme = currentTheme.value === 'light' ? 'dark' : 'light'
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (
      typeof document.startViewTransition !== 'function' ||
      prefersReducedMotion
    ) {
      currentTheme.value = nextTheme
      return
    }

    transitionRunning = true
    document.documentElement.classList.add('theme-transitioning')

    try {
      const transition = document.startViewTransition(async () => {
        currentTheme.value = nextTheme
        await nextTick()
      })

      await transition.ready

      const radius = Math.hypot(window.innerWidth, window.innerHeight)

      document.documentElement.animate(
        {
          clipPath: [
            'circle(0px at 100% 0%)',
            `circle(${radius}px at 100% 0%)`
          ]
        },
        {
          duration: TRANSITION_DURATION,
          easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
          fill: 'forwards',
          pseudoElement: '::view-transition-new(root)'
        }
      )

      await transition.finished
    } catch {
      currentTheme.value = nextTheme
    } finally {
      document.documentElement.classList.remove('theme-transitioning')
      transitionRunning = false
    }
  }

  return {
    theme: readonly(currentTheme),
    toggleTheme
  }
}
