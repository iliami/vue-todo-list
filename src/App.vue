<script setup lang="ts">
import PanelContainer from './components/PanelContainer.vue';
import ScrollbarContainer from './components/ScrollbarContainer.vue';
import TodoAddForm from './components/TodoAddForm.vue';
import TodoList from './components/TodoList.vue';
import TodoFiltering from './components/TodoFiltering.vue';
import TodoStatistics from './components/TodoStatistics.vue';
import { type Todo } from '@/types/Todo';
import type { Filter } from '@/types/Filter';
import { ref, computed } from 'vue';

const currentFilter = ref<Filter>('all');

const todos = ref<Array<Todo>>([]);

const filteredTodos = computed(() => {
  if (currentFilter.value === 'done') {
    return todos.value.filter((t) => t.done);
  } else if (currentFilter.value === 'not-done') {
    return todos.value.filter((t) => !t.done);
  }
  return todos.value;
});

function handleAdd(newTodo: Todo): void {
  todos.value.push(newTodo);
}

function handleUpdateFilter(filter: Filter): void {
  currentFilter.value = filter;
}

function handleDone(todo: Todo): void {
  todo.done = true;
}
function handleUndone(todo: Todo): void {
  todo.done = false;
}
function handleRemove(todo: Todo): void {
  todos.value = todos.value.filter((t) => t !== todo);
}
</script>

<template>
  <div class="flex h-dvh w-dvw max-w-[1600px] bg-[#25283a] pb-10 text-white">
    <div class="m-5 mr-2.5 flex h-full flex-3 flex-col gap-5">
      <div>
        <PanelContainer>
          <TodoFiltering @update-filter="handleUpdateFilter" />
        </PanelContainer>
      </div>
      <div class="h-px min-h-96 flex-1">
        <PanelContainer>
          <ScrollbarContainer>
            <TodoList
              :todos="filteredTodos"
              @done-todo="handleDone"
              @undone-todo="handleUndone"
              @remove-todo="handleRemove"
            />
          </ScrollbarContainer>
        </PanelContainer>
      </div>
    </div>
    <div class="m-5 ml-2.5 flex h-full flex-1 flex-col gap-5">
      <div class="flex-2 text-2xl font-bold text-[#f3f3f3]">
        <PanelContainer>
          <TodoAddForm @add-todo="handleAdd" />
        </PanelContainer>
      </div>
      <div class="flex-1 text-2xl font-bold text-[#f3f3f3]">
        <PanelContainer>
          <TodoStatistics :all="todos.length" :done="todos.filter((t) => t.done).length" />
        </PanelContainer>
      </div>
    </div>
  </div>
</template>
