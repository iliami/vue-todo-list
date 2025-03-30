<script setup lang="ts">
import { type Todo, type Urgency, UrgencyOptions } from '@/types/Todo';
import { ref } from 'vue';

const emit = defineEmits<{
  (
    event: 'add-todo',
    todoName: Todo['name'],
    todoDescription: Todo['description'],
    todoUrgency: Todo['urgency'],
    todoHaveChildren: boolean,
  ): void;
}>();

const todoName = ref<string>('');
const todoDescription = ref<string>('');
const todoUrgency = ref<Urgency>('none');
const todoHaveChildren = ref<boolean>(false);

function handleSubmit(): void {
  emit(
    'add-todo',
    todoName.value,
    todoDescription.value,
    todoUrgency.value,
    todoHaveChildren.value,
  );

  todoName.value = '';
  todoUrgency.value = 'none';
  todoHaveChildren.value = false;
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
      <label for="todo-description" class="text-base font-medium text-gray-200">
        Описание задачи
      </label>
      <textarea
        rows="5"
        name="todo-description"
        placeholder="Описание задачи"
        class="rounded-lg border border-[#454a61] bg-[#454a61] px-4 py-2 text-base text-gray-400 placeholder:text-gray-400 focus:border-[#303241] focus:ring-2 focus:ring-[#303241] focus:outline-none"
        v-model="todoDescription"
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
    <div class="flex flex-row-reverse justify-end gap-1">
      <label for="todo-have-children" class="text-base font-medium text-gray-200"
        >Наличие подзадач</label
      >
      <input
        type="checkbox"
        name="todo-have-children"
        placeholder="Наличие подзадач"
        class="rounded-lg border border-[#454a61] bg-[#454a61] px-4 py-2 text-base text-gray-400 placeholder:text-gray-400 focus:border-[#303241] focus:ring-2 focus:ring-[#303241] focus:outline-none"
        v-model="todoHaveChildren"
      />
    </div>
    <button
      :disabled="todoName === ''"
      type="submit"
      class="h-14 w-full rounded-lg bg-[#000]/15 px-6 py-2 text-center text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-[#000]/25 hover:to-[#000]/45 focus:ring-2 focus:ring-[#303241] focus:outline-none active:scale-95 disabled:opacity-50"
    >
      Добавить задачу
    </button>
  </form>
</template>
