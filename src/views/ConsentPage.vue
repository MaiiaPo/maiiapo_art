<template>
  <LegalDocumentView
    :document="legalDocument"
    title-id="consent-page-title"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LegalDocumentView from '../components/legal/LegalDocumentView.vue'
import { personalDataConsent, withLegalSiteUrl } from '../data/legal'
import { resolvePublicSiteUrl, siteUrlFromHostname } from '../services/geo'

const legalDocument = ref(
  withLegalSiteUrl(personalDataConsent, siteUrlFromHostname()),
)

onMounted(async () => {
  legalDocument.value = withLegalSiteUrl(
    personalDataConsent,
    await resolvePublicSiteUrl(),
  )
})
</script>
