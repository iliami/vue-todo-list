<script setup lang="ts">
import { type Todo, type Urgency, UrgencyOptions } from '@/types/Todo';
import { ref } from 'vue';

const emit = defineEmits(['add-todo']);

const todoName = ref<string>('');
const todoUrgency = ref<Urgency>('none');

function handleSubmit(): void {
  const newTodo: Todo = {
    id: Date.now(),
    name: todoName.value,
    urgency: todoUrgency.value,
    done: false,
    createdAt: new Date(),
  };

  emit('add-todo', newTodo);

  todoName.value = '';
  todoUrgency.value = 'none';
}

function getOptionLabel(option: Urgency): string {
  switch (option) {
    case 'none':
      return 'Нет';
    case 'easy':
      return 'Маленькая';
    case 'medium':
      return 'Средняя';
    case 'hard':
      return 'Высокая';
    default:
      return '';
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="todo-name" class="text-base font-medium text-gray-200">Название задачи</label>
      <input
        type="text"
        name="todo-name"
        placeholder="Название задачи"
        class="rounded-lg border border-[#454a61] bg-[#454a61] px-4 py-2 text-base text-gray-400 placeholder:text-gray-400 focus:border-[#303241] focus:ring-2 focus:ring-[#303241] focus:outline-none"
        v-model="todoName"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label for="urgency-type" class="text-base font-medium text-gray-200">Срочность</label>
      <select
        name="urgency-type"
        id="urgency-type"
        class="rounded-lg border border-[#454a61] bg-[#454a61] px-4 py-2 text-base text-gray-400 focus:border-[#303241] focus:ring-2 focus:ring-[#303241] focus:outline-none"
        v-model="todoUrgency"
      >
        <option
          v-for="option in UrgencyOptions"
          :key="option"
          :value="option"
          :selected="option === 'none'"
        >
          {{ getOptionLabel(option) }}
        </option>
      </select>
    </div>
    <button
      type="submit"
      class="h-14 w-full rounded-lg bg-[#000]/15 px-6 py-2 text-center text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-[#000]/25 hover:to-[#000]/45 focus:ring-2 focus:ring-[#303241] focus:outline-none active:scale-95"
    >
      Добавить задачу
    </button>
  </form>
</template>
