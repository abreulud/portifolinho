import { onBeforeUnmount, ref } from 'vue'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%_'

interface ScrambleOptions {
  revealDelayFrames?: number
  frameInterval?: number
}

function randomScrambleChar(): string {
  const randomIndex = Math.floor(Math.random() * SCRAMBLE_CHARS.length)
  return SCRAMBLE_CHARS[randomIndex]
}

export function useTextScramble(originalText: string, options: ScrambleOptions = {}) {
  const { revealDelayFrames = 3, frameInterval = 35 } = options
  const displayText = ref(originalText)
  const isScrambling = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null
  let frame = 0

  function stop() {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
    }

    isScrambling.value = false
  }

  function play() {
    if (isScrambling.value) return

    isScrambling.value = true
    frame = 0

    const totalFrames = originalText.length * revealDelayFrames

    intervalId = setInterval(() => {
      frame += 1

      const revealedChars = Math.floor(frame / revealDelayFrames)

      displayText.value = originalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < revealedChars) return originalText[index]

          return randomScrambleChar()
        })
        .join('')

      if (frame >= totalFrames) {
        displayText.value = originalText
        stop()
      }
    }, frameInterval)
  }

  onBeforeUnmount(stop)

  return { displayText, isScrambling, play }
}
