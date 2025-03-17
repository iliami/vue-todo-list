<script setup lang="ts">
import PanelContainer from './components/PanelContainer.vue';
import ScrollbarContainer from './components/ScrollbarContainer.vue';
import TodoAddForm from './components/TodoAddForm.vue';
import TodoList from './components/TodoList.vue';
import TodoSorting from './components/TodoSorting.vue';
import TodoStatistics from './components/TodoStatistics.vue';
import type { Todo, Urgency } from './components/types/Todo';

const urgencies: Urgency[] = ['none', 'easy', 'medium', 'hard'];
const todos = Array.from(
  { length: 100 },
  (_, i): Todo => ({
    id: i,
    name: 'Название задачи',
    createdAt: new Date(),
    urgency: urgencies[Math.round(Math.random() * 100) % urgencies.length],
    isDone: false,
  }),
);
todos[1].isDone = true;
todos[6].isDone = true;
todos[8].isDone = true;
</script>

<template>
  <div class="flex h-dvh min-w-[1400px] bg-[#25283a] text-white">
    <div class="m-5 mr-2.5 flex h-[95%] flex-3 flex-col gap-5">
      <div>
        <PanelContainer>
          <TodoSorting />
        </PanelContainer>
      </div>
      <div class="h-[1%] flex-1">
        <PanelContainer>
          <ScrollbarContainer>
            <TodoList :todos="todos" />
          </ScrollbarContainer>
        </PanelContainer>
      </div>
    </div>
    <div class="m-5 ml-2.5 flex h-[95%] flex-1 flex-col gap-5">
      <div class="flex-2 text-2xl font-bold text-[#f3f3f3]">
        <PanelContainer>
          <TodoAddForm />
        </PanelContainer>
      </div>
      <div class="flex-1 text-2xl font-bold text-[#f3f3f3]">
        <PanelContainer>
          <TodoStatistics :all="todos.length" :done="todos.filter((t) => t.isDone).length" />
        </PanelContainer>
      </div>
    </div>
  </div>
</template>
