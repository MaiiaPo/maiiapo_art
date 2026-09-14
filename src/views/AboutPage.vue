<template>
  <section class="about-page" aria-labelledby="about-page-title">
    <div class="about-page__inner">
      <div class="about-page__visual">
        <div class="about-page__photo">
          <img
            class="about-page__img"
            :src="aboutPage.portrait"
            :alt="aboutPage.portraitAlt"
          />
        </div>

        <blockquote class="about-page__quote">
          <p class="about-page__quote-text">«{{ aboutPage.quote }}»</p>
        </blockquote>
      </div>

      <div class="about-page__content">
        <header class="about-page__header">
          <h1 id="about-page-title" class="about-page__title">
            {{ aboutPage.title }}
          </h1>
          <p class="about-page__name">{{ aboutPage.name }}</p>
          <p class="about-page__meta">
            <span
              v-for="(line, index) in aboutPage.metaLines"
              :key="line"
              class="about-page__meta-line"
            >
              <template v-if="index > 0">
                <span class="about-page__meta-sep" aria-hidden="true">|</span>
              </template>
              {{ line }}
            </span>
          </p>
        </header>

        <dl class="about-page__sections">
          <div
            v-for="section in aboutPage.sections"
            :key="section.label"
            class="about-page__row"
          >
            <dt class="about-page__row-label">{{ section.label }}</dt>
            <dd class="about-page__row-body">
              <p
                v-for="(paragraph, index) in section.paragraphs"
                :key="`${section.label}-${index}`"
              >
                {{ paragraph }}
              </p>
              <button
                v-if="section.withManifest"
                class="about-page__manifest-btn"
                type="button"
                @click="openManifest"
              >
                Манифест
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="manifestOpen"
        class="about-manifest"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-manifest-title"
        @click.self="closeManifest"
      >
        <div
          class="about-manifest__panel"
          ref="panelRef"
          tabindex="-1"
        >
          <div class="about-manifest__top">
            <h2 id="about-manifest-title" class="about-manifest__title">
              {{ aboutPage.manifesto.title }}
            </h2>
            <button
              class="about-manifest__close"
              type="button"
              aria-label="Закрыть"
              @click="closeManifest"
            >
              ×
            </button>
          </div>

          <div class="about-manifest__body">
            <p
              v-for="(paragraph, index) in aboutPage.manifesto.paragraphs"
              :key="index"
              class="about-manifest__p"
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
  </section>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch } from 'vue'
import { aboutPage } from '../data/aboutPage'

const manifestOpen = ref(false)
const panelRef = ref<HTMLElement | null>(null)

watch(manifestOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    await nextTick()
    panelRef.value?.focus()
  }
})

function openManifest() {
  manifestOpen.value = true
}

function closeManifest() {
  manifestOpen.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (!manifestOpen.value) return
  if (event.key === 'Escape') closeManifest()
}

window.addEventListener('keydown', onKeydown)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.about-page {
  background: #f3f3f3;
  color: #151515;
}

.about-page__inner {
  display: grid;
  grid-template-columns: minmax(220px, 380px) minmax(0, 1fr);
  align-items: start;
  gap: 0 32px;
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding: 32px 40px 56px;
  box-sizing: border-box;
}

.about-page__visual {
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: transparent;
}

.about-page__photo {
  overflow: hidden;
  aspect-ratio: 3 / 4;
  max-height: 520px;
  background: #ececec;
}

.about-page__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.about-page__quote {
  margin: 18px 0 0;
  padding: 4px 0 0 18px;
  border-left: 2px solid #e8a0bd;
}

.about-page__quote-text {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #9a9a9a;
}

.about-page__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 0;
  box-sizing: border-box;
  background: transparent;
}

.about-page__header {
  margin-bottom: 36px;
  max-width: 520px;
}

.about-page__title {
  margin: 0 0 10px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(36px, 4.4vw, 52px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.about-page__name {
  margin: 0 0 10px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.about-page__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 0;
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 13px;
  line-height: 1.4;
  color: #555;
}

.about-page__meta-sep {
  margin: 0 10px;
  color: #b0b0b0;
}

.about-page__sections {
  display: grid;
  max-width: 560px;
  margin: 0;
}

.about-page__row {
  display: grid;
  grid-template-columns: minmax(120px, 0.42fr) minmax(0, 0.58fr);
  gap: 20px 28px;
  margin: 0;
  padding: 22px 0;
  border-top: 1px solid #d8d8d8;
}

.about-page__row:last-of-type {
  border-bottom: 1px solid #d8d8d8;
}

.about-page__row-label {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.4;
  text-transform: uppercase;
  color: #9a9a9a;
}

.about-page__row-body {
  display: grid;
  gap: 14px;
  margin: 0;
}

.about-page__row-body p {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: #333;
}

.about-page__manifest-btn {
  justify-self: start;
  margin-top: 6px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid currentColor;
  background: transparent;
  color: #d51d78;
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  line-height: 1.2;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.about-page__manifest-btn:hover {
  opacity: 0.7;
}

.about-manifest {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(21, 21, 21, 0.45);
  box-sizing: border-box;
}

.about-manifest__panel {
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

.about-manifest__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-shrink: 0;
}

.about-manifest__title {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.about-manifest__close {
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

.about-manifest__close:hover {
  opacity: 0.55;
}

.about-manifest__body {
  display: grid;
  gap: 16px;
  overflow: auto;
  padding-right: 4px;
}

.about-manifest__p {
  margin: 0;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: #333;
  white-space: pre-line;
}

@media (max-width: 900px) {
  .about-page__inner {
    grid-template-columns: 1fr;
    padding: 24px 20px 48px;
  }

  .about-page__photo {
    max-height: 420px;
    aspect-ratio: 3 / 4;
  }

  .about-page__content {
    padding: 28px 0 0;
  }

  .about-page__row {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 18px 0;
  }

  .about-page__quote {
    margin-top: 16px;
  }

  .about-manifest {
    padding: 16px;
  }

  .about-manifest__panel {
    padding: 22px 18px 28px;
    max-height: 85vh;
  }
}
</style>
