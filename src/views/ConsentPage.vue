<template>
  <LegalDocumentView
    :document="legalDocument"
    title-id="consent-page-title"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LegalDocumentView from '../components/legal/LegalDocumentView.vue'
import { personalDataConsent, withLegalSiteUrl } from '../data/legal'

const legalDocument = computed(() => withLegalSiteUrl(personalDataConsent))
</script>
