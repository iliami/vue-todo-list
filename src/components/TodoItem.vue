<script setup lang="ts">
import IconDone from './icons/IconDone.vue';
import IconUndone from './icons/IconUndone.vue';
import IconRemove from './icons/IconRemove.vue';
import IconEdit from './icons/IconEdit.vue';
import { type Todo, type Urgency } from '@/types/Todo';
import { formatDate } from '@/utils/DateUtils';

const props = defineProps<{
  todo: Todo;
}>();

const urgencyColors: Record<Urgency, string> = {
  none: 'bg-transparent',
  easy: 'bg-[rgb(155,205,50)]',
  medium: 'bg-[rgb(205,155,50)]',
  hard: 'bg-[rgb(255,105,50)]',
};

const emit = defineEmits<{
  (event: 'navigate-to', todo: Readonly<Todo>): void;
  (event: 'open-more', todo: Readonly<Todo>): void;
  (event: 'done-todo', todoId: Todo['id']): void;
  (event: 'undone-todo', todoId: Todo['id']): void;
  (event: 'edit-todo', todoId: Todo['id']): void;
  (event: 'remove-todo', todoId: Todo['id']): void;
}>();

function handleNavigateTo(): void {
  emit('navigate-to', props.todo);
}

function handleOpenMore(): void {
  emit('open-more', props.todo);
}

function handleDone(): void {
  emit('done-todo', props.todo.id);
}

function handleUndone(): void {
  emit('undone-todo', props.todo.id);
}

function handleEdit(): void {
  emit('edit-todo', props.todo.id);
}

function handleRemove(): void {
  emit('remove-todo', props.todo.id);
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
  <div
    class="h-40 rounded-2xl bg-black/15 p-2.5 transition duration-100 select-none hover:scale-105"
    :class="{ completed: props.todo.done }"
    @click.right.stop.prevent="handleNavigateTo"
    @keyup.enter.stop="handleNavigateTo"
    @click.left.stop="handleOpenMore"
    @keyup.space.prevent="handleOpenMore"
    tabindex="0"
  >
    <p
      aria-label="Название задачи"
      class="truncate text-2xl font-bold text-[#f3f3f3] select-text"
      v-text="todo.name"
    ></p>
    <p
      aria-label="Дата создания задачи"
      class="text-4 my-2 text-[#d0d0d0] select-text"
      v-text="formatDate(todo.createdAt)"
    ></p>
    <div
      :aria-label="'Срочность задачи ' + getOptionLabel(todo.urgency)"
      class="h-1 w-full"
      :class="urgencyColors[todo.urgency]"
    ></div>
    <div class="flex justify-between p-6">
      <button
        v-if="!todo.done"
        aria-label="Пометить задачу выполненной"
        :id="'todo-item_mark-todo-done_' + todo.id"
        :name="'todo-item_mark-todo-done_' + todo.id"
        @click.stop="handleDone"
        @keyup.enter.stop.once="handleDone"
        class="h-fit w-fit text-white/60 hover:text-white/70 active:text-white"
      >
        <IconDone class="h-8 w-8" />
      </button>
      <button
        v-else
        aria-label="Пометить задачу невыполненной"
        :id="'todo-item_mark-todo-undone_' + todo.id"
        :name="'todo-item_mark-todo-undone_' + todo.id"
        @click.stop="handleUndone"
        @keyup.enter.stop.once="handleUndone"
        class="h-fit w-fit text-white/60 hover:text-white/70 active:text-white"
      >
        <IconUndone class="h-8 w-8" />
      </button>
      <button
        aria-label="Изменить задачу"
        :id="'todo-item_edit-todo_' + todo.id"
        :name="'todo-item_edit-todo_' + todo.id"
        @click.stop="handleEdit"
        @keyup.enter.stop.once="handleEdit"
        class="h-fit w-fit text-white/60 hover:text-white/70 active:text-white"
      >
        <IconEdit class="h-8 w-8" />
      </button>
      <button
        aria-label="Удалить задачу"
        :id="'todo-item_remove-todo_' + todo.id"
        :name="'todo-item_remove-todo_' + todo.id"
        @click.stop="handleRemove"
        @keyup.enter.stop.once="handleRemove"
        class="h-fit w-fit text-white/60 hover:text-white/70 active:text-white"
      >
        <IconRemove class="h-8 w-8" />
      </button>
    </div>
  </div>
</template>

<style scoped>
@layer components {
  .completed {
    opacity: 50%;
  }
}
</style>
