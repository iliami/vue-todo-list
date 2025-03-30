<script setup lang="ts">
defineProps<{
  all: number;
  done: number;
}>();
</script>

<template>
  <div>
    <p>Всего: {{ all }}</p>
    <p>Выполнено: {{ done }}</p>
  </div>
</template>
