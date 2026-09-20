<template>
  <LegalDocumentView
    :document="legalDocument"
    title-id="privacy-page-title"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LegalDocumentView from '../components/legal/LegalDocumentView.vue'
import { privacyPolicy, withLegalSiteUrl } from '../data/legal'

const legalDocument = computed(() => withLegalSiteUrl(privacyPolicy))
</script>
