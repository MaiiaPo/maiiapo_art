<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="manifest-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manifest-dialog-title"
      @click.self="close"
    >
      <div class="manifest-dialog__panel" ref="panelRef" tabindex="-1">
        <div class="manifest-dialog__top">
          <h2 id="manifest-dialog-title" class="manifest-dialog__title">
              {{ manifesto.title }}
            </h2>
            <button
              class="manifest-dialog__close"
              type="button"
              :aria-label="t('about.close')"
              @click="close"
            >
            ×
          </button>
        </div>

        <div class="manifest-dialog__body">
          <p
            v-for="(paragraph, index) in manifesto.paragraphs"
            :key="index"
            class="manifest-dialog__p"
          >
            <template
              v-for="(line, lineIndex) in paragraph.split('\n')"
              :key="`${index}-${lineIndex}`"
            >
              <br v-if="lineIndex > 0" />
              {{ line }}
            </template>
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { useI18n } from '../../i18n'
import { getManifesto } from '../../i18n/content'

const open = defineModel<boolean>('open', { default: false })

const { locale, t } = useI18n()
const manifesto = computed(() => getManifesto(locale.value))
const panelRef = ref<HTMLElement | null>(null)

watch(open, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (isOpen) {
    await nextTick()
    panelRef.value?.focus()
  }
})

function close() {
  open.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (!open.value) return
  if (event.key === 'Escape') close()
}

window.addEventListener('keydown', onKeydown)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  if (open.value) document.body.style.overflow = ''
})
</script>

<style scoped>
.manifest-dialog {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(21, 21, 21, 0.45);
  box-sizing: border-box;
}

.manifest-dialog__panel {
  display: flex;
  flex-direction: column;
  width: min(560px, 100%);
  max-height: min(80vh, 720px);
  padding: 28px 28px 32px;
  border: 0;
  background: #f7f7f7;
  color: #151515;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
  outline: none;
  overflow: hidden;
}

.manifest-dialog__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.manifest-dialog__title {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.manifest-dialog__close {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin: -4px -8px 0 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #151515;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.manifest-dialog__close:hover {
  opacity: 0.55;
}

.manifest-dialog__body {
  display: grid;
  gap: 16px;
  overflow: auto;
  padding-right: 4px;
}

.manifest-dialog__p {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: #333;
  white-space: pre-line;
}

@media (max-width: 900px) {
  .manifest-dialog {
    padding: 16px;
  }

  .manifest-dialog__panel {
    padding: 22px 18px 28px;
    max-height: 85vh;
  }
}
</style>
