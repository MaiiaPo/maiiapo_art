<template>
  <div class="work-info">
    <p class="work-info__label">{{ t('works.original') }}</p>
    <h1 class="work-info__title">{{ displayTitle }}</h1>
    <p v-if="subtitle" class="work-info__title-en">{{ subtitle }}</p>

    <p v-if="series" class="work-info__series">
      <span class="work-info__series-label">{{ t('works.fromSeries') }}</span>
      <span class="work-info__series-arrow" aria-hidden="true">→</span>
      <RouterLink class="work-info__series-link" :to="seriesPath(series.id)">
        {{ seriesTitle }}
      </RouterLink>
    </p>

    <ul class="work-info__meta">
      <li>{{ work.year }}</li>
      <li>{{ medium }}</li>
      <li>{{ size }}</li>
    </ul>

    <p
      class="work-info__status"
      :class="`work-info__status--${work.status}`"
    >
      {{ t(`status.${work.status}`) }}
    </p>
    <p v-if="shouldShowWorkPrice(work)" class="work-info__price">
      {{ formatPrice(work.price) }}
    </p>

    <button
      v-if="work.status === 'available'"
      class="work-info__order"
      type="button"
      @click="openOrder"
    >
      {{ t('works.order') }}
    </button>

    <div class="work-info__blocks">
      <section v-if="description" class="work-info__block">
        <h2 class="work-info__block-title">{{ t('works.aboutWork') }}</h2>
        <p class="work-info__about">{{ description }}</p>
      </section>

      <section class="work-info__block">
        <h2 class="work-info__block-title">{{ t('works.details') }}</h2>
        <ul class="work-info__details">
          <li><span>{{ t('works.year') }}</span>{{ work.year }}</li>
          <li><span>{{ t('works.medium') }}</span>{{ medium }}</li>
          <li><span>{{ t('works.size') }}</span>{{ size }}</li>
          <li><span>{{ t('works.status') }}</span>{{ t(`status.${work.status}`) }}</li>
        </ul>
      </section>
    </div>

    <Teleport to="body">
      <div
        v-if="orderOpen"
        class="work-order"
        role="dialog"
        aria-modal="true"
        aria-labelledby="work-order-title"
        @click.self="closeOrder"
      >
        <div class="work-order__panel" ref="panelRef" tabindex="-1">
          <button
            class="work-order__close"
            type="button"
            :aria-label="t('works.orderClose')"
            :disabled="status === 'sending'"
            @click="closeOrder"
          >
            ×
          </button>

          <h2 id="work-order-title" class="work-order__title">
            {{ t('works.order') }}
          </h2>
          <p class="work-order__lead">
            {{ t('works.orderLead') }}
          </p>

          <form class="work-order__form" @submit.prevent="onSubmit">
            <label class="work-order__field">
              <span class="visually-hidden">{{ t('works.orderContact') }}</span>
              <input
                v-model="contact"
                class="work-order__input"
                type="text"
                name="contact"
                autocomplete="email"
                :placeholder="t('works.orderContact')"
                :disabled="status === 'sending' || status === 'success'"
                required
              />
            </label>

            <div class="work-order__actions">
              <button
                class="work-order__submit"
                type="submit"
                :disabled="status === 'sending' || status === 'success'"
              >
                {{ status === 'sending' ? t('works.orderSending') : t('works.orderSend') }}
              </button>
              <button
                class="work-order__cancel"
                type="button"
                :disabled="status === 'sending'"
                @click="closeOrder"
              >
                {{ t('works.orderClose') }}
              </button>
            </div>
          </form>

          <p
            v-if="statusMessage"
            class="work-order__note"
            :class="{
              'work-order__note--success': status === 'success',
              'work-order__note--error': status === 'error',
            }"
            role="status"
          >
            {{ statusMessage }}
          </p>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getSeriesById, seriesPath } from '../../data/series'
import {
  formatPrice,
  shouldShowWorkPrice,
  type Work,
} from '../../data/works'
import { localizeMedium, localizeSize, useI18n } from '../../i18n'
import {
  getSeriesDisplayTitle,
  getWorkDescription,
  getWorkDisplayTitle,
  getWorkSubtitle,
} from '../../i18n/content'
import { sendSiteContact } from '../../services/sendSiteContact'

const props = defineProps<{
  work: Work
}>()

const { t, locale } = useI18n()

const displayTitle = computed(() =>
  getWorkDisplayTitle(props.work, locale.value),
)
const subtitle = computed(() => getWorkSubtitle(props.work, locale.value))
const description = computed(() =>
  getWorkDescription(props.work, locale.value),
)
const medium = computed(() => localizeMedium(props.work.medium, locale.value))
const size = computed(() => localizeSize(props.work.size, locale.value))

const series = computed(() => {
  const id = props.work.seriesId
  return id ? getSeriesById(id) : undefined
})

const seriesTitle = computed(() =>
  series.value ? getSeriesDisplayTitle(series.value, locale.value) : '',
)

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const orderOpen = ref(false)
const contact = ref('')
const status = ref<FormStatus>('idle')
const panelRef = ref<HTMLElement | null>(null)

const statusMessage = computed(() => {
  switch (status.value) {
    case 'success':
      return t('works.orderSuccess')
    case 'error':
      return t('works.orderError')
    default:
      return ''
  }
})

watch(orderOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) {
    await nextTick()
    panelRef.value?.focus()
  }
})

function openOrder() {
  status.value = 'idle'
  contact.value = ''
  orderOpen.value = true
}

function closeOrder() {
  if (status.value === 'sending') return
  orderOpen.value = false
}

async function onSubmit() {
  const value = contact.value.trim()
  if (!value || status.value === 'sending' || status.value === 'success') return

  status.value = 'sending'

  try {
    await sendSiteContact({
      contact: value,
      workTitle: `${displayTitle.value} / ${props.work.title}`,
      workId: props.work.id,
    })
    status.value = 'success'
    contact.value = ''
  } catch {
    status.value = 'error'
  }
}

function onKeydown(event: KeyboardEvent) {
  if (!orderOpen.value) return
  if (event.key === 'Escape') closeOrder()
}

window.addEventListener('keydown', onKeydown)

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.work-info {
  min-width: 0;
}

.work-info__label {
  margin: 0 0 12px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: #8a8a8a;
}

.work-info__title {
  margin: 0 0 8px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.05;
  text-transform: uppercase;
}

.work-info__title-en {
  margin: 0 0 18px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.3;
  text-transform: uppercase;
  color: #8a8a8a;
}

.work-info__series {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35em;
  margin: 0 0 16px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.3;
  text-transform: uppercase;
}

.work-info__series-label,
.work-info__series-arrow {
  color: #151515;
}

.work-info__series-link {
  color: #d51d78;
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.work-info__series-link:hover {
  opacity: 0.65;
}

.work-info__meta {
  display: grid;
  gap: 4px;
  margin: 0 0 18px;
  padding: 0;
  list-style: none;
  font-size: 14px;
  line-height: 1.45;
  color: #333;
}

.work-info__status {
  margin: 0 0 6px;
  font-size: 14px;
}

.work-info__status--available {
  color: #d51d78;
}

.work-info__status--sold {
  color: #888;
}

.work-info__status--reserved {
  color: #b45f00;
}

.work-info__status--in-progress {
  color: #888;
}

.work-info__price {
  margin: 0 0 18px;
  font-size: 22px;
  font-weight: 600;
}

.work-info__order {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 28px;
  padding: 12px 22px;
  border: 0;
  background: #d51d78;
  color: #fff;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.work-info__order:hover {
  opacity: 0.85;
}

.work-info__blocks {
  display: grid;
  border-top: 1px solid #ddd;
}

.work-info__block {
  padding: 16px 0 18px;
  border-bottom: 1px solid #ddd;
}

.work-info__block-title {
  margin: 0 0 14px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.work-info__about {
  margin: 0;
  max-width: 42ch;
  font-size: 14px;
  line-height: 1.55;
  color: #444;
  white-space: pre-line;
}

.work-info__details {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  color: #333;
}

.work-info__details li {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 12px;
}

.work-info__details span {
  color: #888;
}

.work-order {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(21, 21, 21, 0.45);
  box-sizing: border-box;
}

.work-order__panel {
  position: relative;
  width: min(440px, 100%);
  padding: 28px 28px 32px;
  background: #f7f7f7;
  color: #151515;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
  outline: none;
}

.work-order__close {
  position: absolute;
  top: 12px;
  right: 14px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #151515;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.work-order__close:hover:not(:disabled) {
  opacity: 0.55;
}

.work-order__close:disabled {
  cursor: default;
  opacity: 0.4;
}

.work-order__title {
  margin: 0 32px 12px 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.work-order__lead {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.work-order__form {
  display: grid;
  gap: 16px;
}

.work-order__field {
  display: block;
}

.work-order__input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #cfcfcf;
  border-radius: 0;
  background: #ececec;
  color: #151515;
  font: inherit;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}

.work-order__input::placeholder {
  color: #8a8a8a;
}

.work-order__input:focus {
  border-color: #bdbdbd;
  background: #efefef;
}

.work-order__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.work-order__submit,
.work-order__cancel {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid #151515;
  font-family: "Inter", sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, opacity 0.2s ease;
}

.work-order__submit {
  background: #d51d78;
  border-color: #d51d78;
  color: #fff;
}

.work-order__submit:hover:not(:disabled) {
  opacity: 0.88;
}

.work-order__cancel {
  background: transparent;
  color: #151515;
}

.work-order__cancel:hover:not(:disabled) {
  background: #151515;
  color: #f7f7f7;
}

.work-order__submit:disabled,
.work-order__cancel:disabled,
.work-order__input:disabled {
  cursor: default;
  opacity: 0.7;
}

.work-order__note {
  margin: 14px 0 0;
  font-size: 12px;
  line-height: 1.4;
  color: #9a9a9a;
}

.work-order__note--success {
  color: #2f6b3a;
}

.work-order__note--error {
  color: #b42318;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 560px) {
  .work-order {
    padding: 16px;
  }

  .work-order__panel {
    padding: 22px 18px 28px;
  }

  .work-order__actions {
    flex-direction: column;
  }

  .work-order__submit,
  .work-order__cancel {
    width: 100%;
  }
}
</style>
