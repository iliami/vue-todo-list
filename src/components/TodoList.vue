<script setup lang="ts">
import TodoItem from './TodoItem.vue';
import type { Todo } from './types/Todo';

interface Props {
  todos: Todo[];
}

const props = defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2.5 pr-5 [direction:ltr]">
    <TodoItem v-for="todo in props.todos" :todo="todo" :key="todo.id" />
  </div>
</template>
