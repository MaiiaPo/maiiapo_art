<template>
  <span
    class="lazy-image"
    :class="{
      'lazy-image--loaded': loaded,
      'lazy-image--error': errored,
      'lazy-image--fill': fill,
    }"
  >
    <img
      v-if="src"
      class="lazy-image__media"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : undefined"
      :decoding="eager ? 'sync' : 'async'"
      :style="mediaStyle"
      @load="onLoad"
      @error="onError"
    />
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    /** Above-the-fold: load immediately with high priority */
    eager?: boolean
    /** Stretch image to fill the wrapper */
    fill?: boolean
    objectFit?: 'contain' | 'cover' | 'none' | 'scale-down'
    objectPosition?: string
  }>(),
  {
    alt: '',
    eager: false,
    fill: false,
    objectFit: 'contain',
    objectPosition: 'center',
  },
)

const loaded = ref(false)
const errored = ref(false)

const mediaStyle = computed(() => ({
  objectFit: props.objectFit,
  objectPosition: props.objectPosition,
}))

watch(
  () => props.src,
  () => {
    loaded.value = false
    errored.value = false
  },
)

function onLoad() {
  loaded.value = true
}

function onError() {
  errored.value = true
  loaded.value = true
}
</script>

<style scoped>
.lazy-image {
  position: relative;
  display: block;
  overflow: hidden;
  background: linear-gradient(160deg, #e8e8e8 0%, #d8d8d8 55%, #cfcfcf 100%);
}

.lazy-image--fill {
  width: 100%;
  height: 100%;
}

.lazy-image__media {
  display: block;
  width: 100%;
  height: auto;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.lazy-image--fill .lazy-image__media {
  height: 100%;
}

.lazy-image--loaded .lazy-image__media {
  opacity: 1;
}

.lazy-image--error {
  background: linear-gradient(160deg, #dcdcdc 0%, #c4c4c4 55%, #b0b0b0 100%);
}
</style>
