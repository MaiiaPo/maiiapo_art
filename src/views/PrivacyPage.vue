<template>
  <LegalDocumentView
    :document="privacyPolicy"
    title-id="privacy-page-title"
  />
</template>

<script setup lang="ts">
import LegalDocumentView from '../components/legal/LegalDocumentView.vue'
import { privacyPolicy } from '../data/legal'
</script>
