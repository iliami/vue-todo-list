<script setup lang="ts">
import PanelContainer from './components/PanelContainer.vue';
import ScrollbarContainer from './components/ScrollbarContainer.vue';
import TodoAddForm from './components/TodoAddForm.vue';
import TodoList from './components/TodoList.vue';
import TodoListFiltering from './components/TodoListFiltering.vue';
import TodoListSorting from './components/TodoListSorting.vue';
import TodoListStatistics from './components/TodoListStatistics.vue';
import type { Todo, Urgency } from '@/types/Todo';
import { UrgencyOptions } from '@/types/Todo';
import type { Filter } from '@/types/Filter';
import type { SortOrder, SortField } from '@/types/SortSettings';
import { ref, computed } from 'vue';

const currentFilter = ref<Filter>('all');
const currentSortOrder = ref<SortOrder>('asc');
const currentSortField = ref<SortField>('createdAt');

// const todos = ref<Array<Todo>>([]);
const now = Date.now();
const todos = ref<Array<Todo>>(
  Array.from(
    { length: 100 },
    (_, i): Todo => ({
      id: i,
      name: `Название задачи ${i}`,
      createdAt: new Date(now + 10000000 * i),
      urgency: UrgencyOptions[Math.round(Math.random() * 100) % UrgencyOptions.length],
      done: false,
    }),
  ),
);

const computedTodos = computed(() => {
  let filteredTodos = todos.value;
  if (currentFilter.value === 'done') {
    filteredTodos = todos.value.filter((t) => t.done);
  } else if (currentFilter.value === 'not-done') {
    filteredTodos = todos.value.filter((t) => !t.done);
  }

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const field = currentSortField.value;

    if (field === 'createdAt') {
      return currentSortOrder.value === 'asc'
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime();
    } else if (field === 'name') {
      return currentSortOrder.value === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (field === 'urgency') {
      const urgencyOrder: Record<Urgency, number> = {
        none: 0,
        easy: 1,
        medium: 2,
        hard: 3,
      };
      return currentSortOrder.value === 'asc'
        ? urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
        : urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    }

    return 0;
  });

  return sortedTodos;
});

function handleAdd(newTodo: Todo): void {
  todos.value.push(newTodo);
}

function handleUpdateFilter(filter: Filter): void {
  currentFilter.value = filter;
}

function handleUpdateSort(order: SortOrder, field: SortField) {
  currentSortOrder.value = order;
  currentSortField.value = field;
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
  <div class="flex h-svh w-dvw max-w-[1600px] bg-[#25283a] pb-10 text-white">
    <div class="m-5 mr-2.5 flex h-full flex-5 flex-col gap-5">
      <div>
        <PanelContainer>
          <TodoListFiltering @update-filter="handleUpdateFilter" />
        </PanelContainer>
      </div>
      <div class="h-px min-h-96 flex-1">
        <PanelContainer>
          <ScrollbarContainer>
            <TodoList
              :todos="computedTodos"
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
          <TodoListSorting @update-sort="handleUpdateSort" />
        </PanelContainer>
      </div>
      <div class="flex-1 text-2xl font-bold text-[#f3f3f3]">
        <PanelContainer>
          <TodoListStatistics :all="todos.length" :done="todos.filter((t) => t.done).length" />
        </PanelContainer>
      </div>
    </div>
  </div>
</template>
