<template>
  <LegalDocumentView
    :document="personalDataConsent"
    title-id="consent-page-title"
  />
</template>

<script setup lang="ts">
import LegalDocumentView from '../components/legal/LegalDocumentView.vue'
import { personalDataConsent } from '../data/legal'
</script>
