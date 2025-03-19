<script setup lang="ts">
import IconSearch from './icons/IconSearch.vue';
import { ref } from 'vue';

const localSearchQuery = ref('');

const emit = defineEmits<{
  (e: 'update-search', searchQuery: string): void;
}>();

function updateSearchQuery(): void {
  emit('update-search', localSearchQuery.value);
}
</script>

<template>
  <div class="flex gap-2.5">
    <div @click="updateSearchQuery">
      <IconSearch class="h-10 w-10 text-white/50 hover:text-white/60 active:text-white/80" />
    </div>
    <input
      type="text"
      placeholder="Поиск по названию.."
      v-model="localSearchQuery"
      @input="updateSearchQuery"
      class="w-full rounded-lg border border-[#454a61] bg-[#454a61] px-4 py-2 text-base text-gray-400 focus:border-[#303241] focus:ring-2 focus:ring-[#303241] focus:outline-none"
    />
  </div>
</template>
