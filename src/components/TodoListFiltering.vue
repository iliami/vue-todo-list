<script setup lang="ts">
import { FilterOptions, type Filter } from '@/types/Filter';
import { ref } from 'vue';

function getOptionLabel(option: Filter): string {
  switch (option) {
    case 'all':
      return 'Все';
    case 'done':
      return 'Выполненные';
    case 'not-done':
      return 'Невыполненные';
    default:
      return '';
  }
}

const currentFilter = ref<Filter>('all');

const emit = defineEmits(['update-filter']);

function selectFilter(filter: Filter): void {
  currentFilter.value = filter;
  emit('update-filter', filter);
}
</script>

<template>
  <div class="flex justify-between gap-5 p-5 text-center text-3xl not-xl:flex-col" tabindex="0">
    <a
      v-for="(option, index) in FilterOptions"
      :key="index"
      :id="option"
      @click="selectFilter(option)"
      @keyup.enter="selectFilter(option)"
      @keyup.space.prevent="selectFilter(option)"
      :class="{ selected: option === currentFilter }"
      class="flex-1 cursor-pointer px-2 pb-2 opacity-90 select-none hover:opacity-100"
      href="#"
      target="_self"
    >
      {{ getOptionLabel(option) }}
    </a>
  </div>
</template>

<style scoped>
@layer components {
  .selected {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 4px;
    border-bottom-color: var(--color-white);
  }
}
</style>
