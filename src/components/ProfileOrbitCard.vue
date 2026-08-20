<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { copy } = useLocale()
</script>

<template>
  <div class="profile-orbit">
    <div class="rings">
      <div class="ring ring--outer">
        <div class="ring ring--core">
          <img
            src="/foto-perfil.webp"
            :alt="copy.accessibility.profilePhoto"
            class="profile-photo"
            width="310"
            height="310"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-orbit {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.rings {
  width: min(340px, 100%);
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring--outer {
  width: 100%;
  height: 100%;
  border: 0.5px solid var(--border-strong);
}

.ring--core {
  width: 92.5%;
  height: 92.5%;
  overflow: hidden;
}

.profile-photo {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>
