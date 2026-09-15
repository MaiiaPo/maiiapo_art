<template>
  <div class="sort-dropdown" ref="root">
    <button
      class="sort-dropdown__trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      {{ t('works.sort') }}
      <span class="sort-dropdown__value">{{ currentLabel }}</span>
      <span class="sort-dropdown__chevron" aria-hidden="true" />
    </button>

    <div
      v-if="open"
      class="sort-dropdown__menu"
      role="listbox"
      :aria-label="t('works.sortAria')"
    >
      <button
        v-for="option in options"
        :key="option.value"
        class="sort-dropdown__option"
        type="button"
        role="option"
        :aria-selected="option.value === modelValue"
        :class="{ 'sort-dropdown__option--active': option.value === modelValue }"
        @click="select(option.value)"
      >
        <span class="sort-dropdown__radio" aria-hidden="true" />
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from '../../i18n'

export type SortOptionValue = 'newest' | 'price-asc' | 'price-desc'

const props = defineProps<{
  modelValue: SortOptionValue
}>()

const emit = defineEmits<{
  'update:modelValue': [value: SortOptionValue]
}>()

const { t } = useI18n()

const options = computed(() => [
  { value: 'newest' as const, label: t('works.newest') },
  { value: 'price-asc' as const, label: t('works.priceAsc') },
  { value: 'price-desc' as const, label: t('works.priceDesc') },
])

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const currentLabel = computed(
  () => options.value.find((option) => option.value === props.modelValue)?.label ?? '',
)

function select(value: SortOptionValue) {
  emit('update:modelValue', value)
  open.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (!root.value?.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<style scoped>
.sort-dropdown {
  position: relative;
  margin-left: auto;
}

.sort-dropdown__trigger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: #151515;
  font: inherit;
  font-size: 13px;
  line-height: 1.2;
  cursor: pointer;
}

.sort-dropdown__value {
  color: #151515;
}

.sort-dropdown__chevron {
  width: 6px;
  height: 6px;
  margin-left: 2px;
  border-right: 1.5px solid #151515;
  border-bottom: 1.5px solid #151515;
  transform: translateY(-1px) rotate(45deg);
}

.sort-dropdown__menu {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  z-index: 20;
  min-width: 240px;
  padding: 10px 0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.12);
}

.sort-dropdown__option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  margin: 0;
  padding: 12px 18px;
  border: 0;
  background: transparent;
  color: #222;
  font: inherit;
  font-size: 15px;
  line-height: 1.3;
  text-align: left;
  cursor: pointer;
}

.sort-dropdown__option:hover {
  background: #f7f7f7;
}

.sort-dropdown__radio {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1.5px solid #cfcfcf;
  border-radius: 50%;
  box-sizing: border-box;
}

.sort-dropdown__option--active {
  color: #d51d78;
}

.sort-dropdown__option--active .sort-dropdown__radio {
  border-color: #d51d78;
  background:
    radial-gradient(circle, #d51d78 0 45%, transparent 46%);
}
</style>
