<template>
  <section class="about-page" aria-labelledby="about-page-title">
    <div class="about-page__inner">
      <div class="about-page__visual">
        <div class="about-page__photo">
          <LazyImage
            class="about-page__img"
            fill
            eager
            :src="aboutPage.portrait"
            :alt="aboutPage.portraitAlt"
            object-fit="cover"
            object-position="center top"
          />
        </div>

        <blockquote class="about-page__quote">
          <p class="about-page__quote-text">«{{ t('about.quote') }}»</p>
        </blockquote>
      </div>

      <div class="about-page__content">
        <header class="about-page__header">
          <h1 id="about-page-title" class="about-page__title">
            {{ t('about.title') }}
          </h1>
          <p class="about-page__name">{{ aboutPage.name }}</p>
          <p class="about-page__meta">
            <span class="about-page__meta-line">{{ t('about.metaPerm') }}</span>
            <span class="about-page__meta-sep" aria-hidden="true">|</span>
            <span class="about-page__meta-line">{{ t('about.metaMoscow') }}</span>
          </p>
        </header>

        <dl class="about-page__sections">
          <div
            v-for="section in sections"
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
                {{ t('about.manifesto') }}
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <ManifestDialog v-model:open="manifestOpen" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ManifestDialog from '../components/about/ManifestDialog.vue'
import LazyImage from '../components/ui/LazyImage.vue'
import { aboutPage } from '../data/aboutPage'
import { useI18n } from '../i18n'

const { t } = useI18n()
const manifestOpen = ref(false)

const sections = computed(() => [
  {
    label: t('about.education'),
    paragraphs: [t('about.educationText')],
  },
  {
    label: t('about.practice'),
    paragraphs: [t('about.practiceText')],
  },
  {
    label: t('about.art'),
    withManifest: true,
    paragraphs: [t('about.artP1'), t('about.artP2'), t('about.artP3')],
  },
])

function openManifest() {
  manifestOpen.value = true
}
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
  width: 100%;
  height: 100%;
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
}
</style>
