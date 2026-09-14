<template>
  <section class="about" aria-labelledby="contacts-title">
    <div class="about__inner">
    <div class="about__copy">
      <p class="about__label">[ {{ aboutArtist.label }} ]</p>
      <h1 id="contacts-title" class="about__title">
        <span>На</span>
        <span>связи</span>
      </h1>
      <p class="about__intro">{{ aboutArtist.intro }}</p>

      <dl class="about__contacts">
        <div
          v-for="item in aboutArtist.contacts"
          :key="item.label"
          class="about__contact"
        >
          <dt class="about__contact-label">{{ item.label }}:</dt>
          <dd class="about__contact-value">
            <a
              v-if="item.href"
              class="about__contact-link"
              :href="item.href"
              :target="item.href.startsWith('http') ? '_blank' : undefined"
              :rel="item.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            >
              {{ item.value }}
            </a>
            <template v-else>{{ item.value }}</template>
          </dd>
        </div>
      </dl>

      <div class="about__form-block">
        <p class="about__form-lead">{{ aboutArtist.formLead }}</p>
        <form class="about__form" @submit.prevent="onSubmit">
          <label class="about__field">
            <span class="visually-hidden">{{ aboutArtist.formPlaceholder }}</span>
            <input
              v-model="contact"
              class="about__input"
              type="text"
              name="contact"
              autocomplete="email"
              :placeholder="aboutArtist.formPlaceholder"
              :disabled="status === 'sending' || status === 'success'"
              required
            />
            <button
              class="about__submit"
              type="submit"
              aria-label="Отправить"
              :disabled="status === 'sending' || status === 'success'"
            >
              →
            </button>
          </label>
        </form>
        <p
          class="about__form-note"
          :class="{
            'about__form-note--success': status === 'success',
            'about__form-note--error': status === 'error',
          }"
          role="status"
        >
          {{ statusMessage }}
        </p>
      </div>
    </div>

    <div class="about__portrait">
      <img
        class="about__portrait-img"
        :src="aboutArtist.portrait"
        :alt="aboutArtist.portraitAlt"
      />
    </div>

    <aside class="about__aside">
      <img
        class="about__signature"
        :src="aboutArtist.signature"
        alt="Maiia Po"
      />
      <p class="about__slogan">
        <span
          v-for="(line, index) in aboutArtist.slogan"
          :key="index"
          class="about__slogan-line"
        >
          {{ line }}
        </span>
      </p>
    </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { aboutArtist } from '../data/aboutArtist'
import { sendSiteContact } from '../services/sendSiteContact'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const contact = ref('')
const status = ref<FormStatus>('idle')

const statusMessage = computed(() => {
  switch (status.value) {
    case 'sending':
      return 'Отправляю…'
    case 'success':
      return 'Спасибо! Сообщение отправлено.'
    case 'error':
      return 'Не удалось отправить. Попробуйте еще раз или напишите на почту.'
    default:
      return aboutArtist.formNote
  }
})

async function onSubmit() {
  const value = contact.value.trim()
  if (!value || status.value === 'sending' || status.value === 'success') return

  status.value = 'sending'

  try {
    await sendSiteContact(value)
    status.value = 'success'
    contact.value = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<style scoped>
.about {
  padding: 48px 40px 64px;
  background: #f3f3f3;
  color: #151515;
}

.about__inner {
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) minmax(280px, 1.1fr) minmax(160px, 0.5fr);
  gap: 40px 48px;
  align-items: center;
  max-width: 1200px;
  min-height: calc(100vh - 180px);
  margin-inline: auto;
}

.about__copy {
  max-width: 380px;
}

.about__label {
  margin: 0 0 20px;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: #151515;
}

.about__label::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 12px;
  background: #d51d78;
}

.about__title {
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(42px, 5.5vw, 64px);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.about__intro {
  margin: 0 0 28px;
  max-width: 340px;
  font-size: 14px;
  line-height: 1.5;
  color: #222;
}

.about__contacts {
  display: grid;
  gap: 10px;
  margin: 0 0 28px;
}

.about__contact {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 12px;
  align-items: baseline;
  margin: 0;
}

.about__contact-label,
.about__contact-value {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.about__contact-label {
  color: #151515;
}

.about__contact-link {
  color: inherit;
  text-decoration: none;
}

.about__contact-link:hover {
  opacity: 0.65;
}

.about__form-block {
  padding-top: 24px;
  border-top: 1px solid #d8d8d8;
}

.about__form-lead {
  margin: 0 0 16px;
  max-width: 340px;
  font-size: 14px;
  line-height: 1.5;
}

.about__form {
  margin: 0 0 10px;
}

.about__field {
  position: relative;
  display: block;
}

.about__input {
  width: 100%;
  height: 48px;
  padding: 0 48px 0 16px;
  border: 1px solid #cfcfcf;
  border-radius: 0;
  background: #ececec;
  color: #151515;
  font: inherit;
  font-size: 14px;
  outline: none;
}

.about__input::placeholder {
  color: #8a8a8a;
}

.about__input:focus {
  border-color: #bdbdbd;
  background: #efefef;
}

.about__submit {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 48px;
  border: 0;
  background: transparent;
  color: #d51d78;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.about__submit:hover {
  opacity: 0.7;
}

.about__form-note {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  color: #9a9a9a;
}

.about__form-note--success {
  color: #2f6b3a;
}

.about__form-note--error {
  color: #b42318;
}

.about__input:disabled,
.about__submit:disabled {
  cursor: default;
  opacity: 0.7;
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

.about__portrait {
  min-width: 0;
  justify-self: center;
  width: 100%;
  max-width: 520px;
}

.about__portrait-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(72vh, 680px);
  object-fit: cover;
  object-position: center top;
}

.about__aside {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 28px;
  max-width: 200px;
}

.about__signature {
  display: block;
  width: min(100%, 160px);
  height: auto;
}

.about__slogan {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding-top: 18px;
  font-family: "Oswald", sans-serif;
  font-size: clamp(18px, 1.8vw, 22px);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.about__slogan::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 2px;
  background: #d51d78;
}

.about__slogan-line {
  display: block;
}

@media (max-width: 1100px) {
  .about__inner {
    grid-template-columns: minmax(240px, 0.95fr) minmax(240px, 1fr) minmax(140px, 0.45fr);
    gap: 32px 28px;
  }

  .about {
    padding: 40px 28px 56px;
  }
}

@media (max-width: 900px) {
  .about {
    padding: 40px 20px 56px;
  }

  .about__inner {
    grid-template-columns: 1fr;
    gap: 36px;
    min-height: 0;
  }

  .about__copy {
    max-width: none;
    order: 1;
  }

  .about__portrait {
    max-width: 420px;
    order: 2;
  }

  .about__aside {
    max-width: none;
    order: 3;
  }
}
</style>
