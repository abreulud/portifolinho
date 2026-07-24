<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'

const { copy } = useLocale()
</script>
  <template>
   <div class="profile-orbit">
    <!--
    <span class="profile-orbit-label">{{ copy.profile.cardLabel }}</span>
    <ul class="badge-row" :aria-label="copy.accessibility.activityIndicators">
      <li v-for="badge in copy.profile.badges" :key="badge.label" class="badge">
        <span v-if="badge.live" class="badge-live-dot" aria-hidden="true" />
        <span v-if="badge.icon">{{ badge.icon }}</span>
        {{ badge.label }}
      </li>
    </ul>
    -->

    <div class="rings">
      <div class="ring ring--outer">
        <div class="ring ring--mid">
          <div class="ring ring--core">
            <img
              src="/foto-perfil.png"
              :alt="copy.accessibility.profilePhoto"
              class="profile-photo"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/*.profile-orbit {
  background: var(--surface);
  border: 0.5px solid var(--border);
  border-radius: 22px;
  padding: 24px;
  position: relative;
  height: 400px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.04);
}

.profile-orbit-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  position: absolute;
  top: 29px;
  right: 29px;
}

.badge-row {
  position: absolute;
  top: 24px;
  left: 24px;
  right: 76px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  list-style: none;
}

.badge {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-muted);
  border: 0.5px solid var(--border-strong);
  border-radius: 8px;
  padding: 6px 10px;
  background: var(--canvas);
  display: flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
}

.badge-live-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--signal);
  flex-shrink: 0;
}
*/

.rings {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 56px);
  margin-top: 5px;
}

.ring {
  border-radius: 50%;
  border: 0.5px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
}

.ring--outer {
  width: 340px;
  height: 340px;
}


.ring--core {
  width: 310px;
  height: 310px;
  background: var(--signal-soft);
  border: none;
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
