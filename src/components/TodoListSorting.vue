<script setup lang="ts">
import IconSort from './icons/IconSort.vue';
import { type SortOrder, type SortField, SortFieldOptions } from '@/types/SortSettings';
import { ref } from 'vue';

const localSortOrder = ref<SortOrder>('asc');
const localSortField = ref<SortField>('createdAt');

const emit = defineEmits<{
  (e: 'update-sort', order: SortOrder, field: SortField): void;
}>();

function toggleSortOrder(): void {
  localSortOrder.value = localSortOrder.value == 'asc' ? 'desc' : 'asc';
  emit('update-sort', localSortOrder.value, localSortField.value);
}

function selectSortField(): void {
  emit('update-sort', localSortOrder.value, localSortField.value);
}

function getOptionLabel(option: SortField): string {
  switch (option) {
    case 'name':
      return 'Название задачи';
    case 'createdAt':
      return 'Дата создания';
    case 'urgency':
      return 'Срочность';
    default:
      return '';
  }
}
</script>

<template>
  <div class="flex gap-2.5">
    <button
      @click="toggleSortOrder"
      class="h-fit w-fit text-white/50 hover:text-white/60 active:text-white/80"
      :class="{ 'scale-x-[1] scale-y-[-1]': localSortOrder === 'desc' }"
    >
      <IconSort class="h-10 w-10" />
    </button>
    <select
      name="field-name"
      id="field-name"
      class="w-full rounded-lg border border-[#454a61] bg-[#454a61] px-4 py-2 text-base text-gray-400 focus:border-[#303241] focus:ring-2 focus:ring-[#303241] focus:outline-none"
      v-model="localSortField"
      @change="selectSortField"
    >
      <option
        v-for="option in SortFieldOptions"
        :key="option"
        :value="option"
        :selected="option === localSortField"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
