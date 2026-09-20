<template>
  <LegalDocumentView
    :document="legalDocument"
    title-id="privacy-page-title"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LegalDocumentView from '../components/legal/LegalDocumentView.vue'
import { privacyPolicy, withLegalSiteUrl } from '../data/legal'
import { resolvePublicSiteUrl, siteUrlFromHostname } from '../services/geo'

const legalDocument = ref(withLegalSiteUrl(privacyPolicy, siteUrlFromHostname()))

onMounted(async () => {
  legalDocument.value = withLegalSiteUrl(
    privacyPolicy,
    await resolvePublicSiteUrl(),
  )
})
</script>
