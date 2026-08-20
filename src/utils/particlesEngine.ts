import { loadBasic } from '@tsparticles/basic'
import { tsParticles, type Engine } from '@tsparticles/engine'
import { loadTextShape } from '@tsparticles/shape-text'

let enginePromise: Promise<Engine> | undefined

export function getParticlesEngine(): Promise<Engine> {
  if (!enginePromise) {
    enginePromise = Promise.all([loadBasic(tsParticles), loadTextShape(tsParticles)])
      .then(() => tsParticles)
      .catch((error: unknown) => {
        enginePromise = undefined
        throw error
      })
  }

  return enginePromise
}
