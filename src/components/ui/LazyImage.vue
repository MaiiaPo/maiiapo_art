<template>
  <span
    class="lazy-image"
    :class="{
      'lazy-image--loaded': loaded,
      'lazy-image--error': errored,
      'lazy-image--fill': fill,
    }"
  >
    <picture v-if="pictureSources.length" class="lazy-image__picture">
      <source
        v-for="source in pictureSources"
        :key="source.format"
        :type="`image/${source.format === 'jpg' ? 'jpeg' : source.format}`"
        :srcset="source.srcset"
        :sizes="sizes"
      />
      <img
        v-if="fallbackSrc"
        class="lazy-image__media"
        :src="fallbackSrc"
        :width="fallbackWidth"
        :height="fallbackHeight"
        :alt="alt"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : undefined"
        :decoding="eager ? 'sync' : 'async'"
        :sizes="sizes"
        :style="mediaStyle"
        @load="onLoad"
        @error="onError"
      />
    </picture>

    <img
      v-else-if="fallbackSrc"
      class="lazy-image__media"
      :src="fallbackSrc"
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

type PictureVariant = {
  src: string
  w?: number
  width?: number
  h?: number
  height?: number
}

type ResponsivePicture = {
  sources?: Record<string, string | PictureVariant[]>
  img?: PictureVariant
  fallback?: string | PictureVariant
}

type ImageSource = string | ResponsivePicture

const props = withDefaults(
  defineProps<{
    src?: ImageSource
    alt?: string
    /** Above-the-fold: load immediately with high priority */
    eager?: boolean
    /** Stretch image to fill the wrapper */
    fill?: boolean
    /** Hint used by responsive images to choose the smallest useful file. */
    sizes?: string
    objectFit?: 'contain' | 'cover' | 'none' | 'scale-down'
    objectPosition?: string
  }>(),
  {
    alt: '',
    eager: false,
    fill: false,
    sizes: '(max-width: 900px) 100vw, 50vw',
    objectFit: 'contain',
    objectPosition: 'center',
  },
)

const loaded = ref(false)
const errored = ref(false)

const responsivePicture = computed<ResponsivePicture | null>(() => {
  if (!props.src || typeof props.src === 'string') return null
  return props.src
})

function toSrcset(value: string | PictureVariant[]): string {
  if (typeof value === 'string') return value
  return value
    .map((item) => `${item.src} ${item.w ?? item.width ?? ''}w`.trim())
    .join(', ')
}

const pictureSources = computed(() => {
  const sources = responsivePicture.value?.sources
  if (!sources) return []

  return Object.entries(sources)
    .map(([format, value]) => ({ format, srcset: toSrcset(value) }))
    .filter((source) => source.srcset)
})

const fallback = computed<PictureVariant | null>(() => {
  if (!props.src) return null
  if (typeof props.src === 'string') return { src: props.src }

  if (props.src.img?.src) return props.src.img
  if (typeof props.src.fallback === 'string') return { src: props.src.fallback }
  if (props.src.fallback?.src) return props.src.fallback

  return null
})

const fallbackSrc = computed(() => fallback.value?.src ?? '')
const fallbackWidth = computed(() => fallback.value?.w ?? fallback.value?.width)
const fallbackHeight = computed(() => fallback.value?.h ?? fallback.value?.height)

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

.lazy-image__picture {
  display: block;
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
