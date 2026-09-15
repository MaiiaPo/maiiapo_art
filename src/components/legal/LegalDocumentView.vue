<template>
  <section class="legal-page" :aria-labelledby="titleId">
    <div class="legal-page__inner">
      <header class="legal-page__header">
        <h1 :id="titleId" class="legal-page__title">{{ document.title }}</h1>
        <p class="legal-page__revised">
          {{ t('legal.revised', { date: document.revisedAt }) }}
        </p>
      </header>

      <div class="legal-page__body">
        <template v-for="(block, index) in document.blocks" :key="index">
          <h2 v-if="block.type === 'h'" class="legal-page__heading">
            {{ block.text }}
          </h2>
          <p v-else-if="block.type === 'p'" class="legal-page__text">
            {{ block.text }}
          </p>
          <ul v-else-if="block.type === 'list'" class="legal-page__list">
            <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
              {{ item }}
            </li>
          </ul>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LegalDocument } from '../../data/legal'
import { useI18n } from '../../i18n'

const props = defineProps<{
  document: LegalDocument
  titleId?: string
}>()

const { t } = useI18n()
const titleId = computed(() => props.titleId ?? 'legal-page-title')
</script>

<style scoped>
.legal-page {
  padding: 48px 40px 72px;
  background: #f7f7f7;
  color: #151515;
}

.legal-page__inner {
  max-width: 760px;
  margin-inline: auto;
}

.legal-page__header {
  margin-bottom: 36px;
  padding-bottom: 24px;
  border-bottom: 1px solid #ddd;
}

.legal-page__title {
  margin: 0 0 12px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-transform: uppercase;
}

.legal-page__revised {
  margin: 0;
  font-size: 13px;
  color: #777;
}

.legal-page__body {
  display: grid;
  gap: 14px;
}

.legal-page__heading {
  margin: 18px 0 0;
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
}

.legal-page__text {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: #333;
}

.legal-page__list {
  margin: 0;
  padding-left: 1.25em;
  font-size: 14px;
  line-height: 1.65;
  color: #333;
}

.legal-page__list li + li {
  margin-top: 6px;
}

@media (max-width: 900px) {
  .legal-page {
    padding: 36px 20px 56px;
  }
}
</style>
