<script setup lang="ts">
import TodoItem from './TodoItem.vue';
import type { Todo } from '@/types/Todo';

interface Props {
  todos: ReadonlyArray<Todo>;
}

const props = defineProps<Props>();

const emit = defineEmits(['done-todo', 'undone-todo', 'remove-todo']);
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2.5 pr-5 [direction:ltr]">
    <TodoItem
      v-for="todo in props.todos"
      :todo="todo"
      :key="todo.id"
      @done-todo="emit('done-todo', $event)"
      @undone-todo="emit('undone-todo', $event)"
      @remove-todo="emit('remove-todo', $event)"
    />
  </div>
</template>
