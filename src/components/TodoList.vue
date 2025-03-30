<script setup lang="ts">
import TodoItem from './TodoItem.vue';
import type { Todo } from '@/types/Todo';

interface Props {
  todos: ReadonlyArray<Todo>;
}

defineProps<Props>();

const emit = defineEmits<{
  (event: 'navigate-to', todo: Todo): void;
  (event: 'done-todo', todoId: Todo['id']): void;
  (event: 'undone-todo', todoId: Todo['id']): void;
  (event: 'edit-todo', todoId: Todo['id']): void;
  (event: 'remove-todo', todoId: Todo['id']): void;
}>();
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2.5 pr-5 [direction:ltr]">
    <TodoItem
      v-for="todo in todos"
      :todo="todo"
      :key="todo.id"
      @navigate-to="emit('navigate-to', $event)"
      @done-todo="emit('done-todo', $event)"
      @undone-todo="emit('undone-todo', $event)"
      @edit-todo="emit('edit-todo', $event)"
      @remove-todo="emit('remove-todo', $event)"
    />
  </div>
</template>
