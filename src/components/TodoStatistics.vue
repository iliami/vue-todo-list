<script setup lang="ts">
interface Props {
  all: number;
  done: number;
}

const props = defineProps<Props>();
</script>

<template>
  <div>
    <p>Всего: {{ props.all }}</p>
    <p>Выполнено: {{ props.done }}</p>
  </div>
</template>
