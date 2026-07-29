<template>
  <section class="page-stub">
    <p class="page-stub__label">[ {{ label }} ]</p>
    <h1 class="page-stub__title">{{ title }}</h1>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  label: string
}>()
</script>

<style scoped>
.page-stub {
  padding: 64px 40px;
}

.page-stub__label {
  margin: 0 0 12px;
  font-size: 13px;
  color: #777;
}

.page-stub__title {
  margin: 0;
  font-family: "Oswald", sans-serif;
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .page-stub {
    padding: 40px 20px;
  }
}
</style>
