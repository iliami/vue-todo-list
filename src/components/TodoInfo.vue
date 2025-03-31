<script setup lang="ts">
import type { Todo } from '@/types/Todo';
import { formatDate } from '@/utils/DateUtils';
import ScrollbarContainer from './ScrollbarContainer.vue';

defineProps<{ todo: Readonly<Todo> }>();
</script>

<template>
  <div
    class="flex max-h-144 flex-col font-sans text-[#f3f3f3] select-none [direction:rtl]"
    :class="{
      'h-fit': todo.description === '',
    }"
  >
    <h3
      aria-label="Название задачи"
      class="my-5 cursor-text text-4xl font-bold select-text"
      :class="{
        'line-through decoration-solid decoration-2': todo.done,
      }"
    >
      {{ todo.name }}
    </h3>
    <p aria-label="Дата создания задачи" class="text-md my-2.5 cursor-default font-medium">
      Создано: {{ formatDate(todo.createdAt) }}
    </p>
    <p
      aria-label="Дата последнего изменения задачи"
      class="text-md my-2.5 cursor-default font-medium"
    >
      Обновлено: {{ formatDate(todo.history[todo.history.length - 1].date) }}
    </p>
    <ScrollbarContainer v-if="todo.description !== ''" class="mt-5 h-fit flex-auto">
      <p
        aria-label="Описание задачи"
        v-if="todo.description !== ''"
        class="cursor-text text-2xl font-semibold break-words select-text [direction:ltr]"
      >
        {{ todo.description }}
      </p>
    </ScrollbarContainer>
  </div>
</template>

<style scoped></style>
