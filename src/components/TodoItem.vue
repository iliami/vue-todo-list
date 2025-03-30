<script setup lang="ts">
import IconDone from './icons/IconDone.vue';
import IconUndone from './icons/IconUndone.vue';
import IconRemove from './icons/IconRemove.vue';
import { type Todo, type Urgency } from '@/types/Todo';
import { formatDate } from '@/utils/DateUtils';
import IconEdit from './icons/IconEdit.vue';

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
</script>

<template>
  <div
    class="h-40 rounded-2xl bg-black/15 p-2.5 transition duration-100 select-none hover:scale-105"
    :class="{ completed: props.todo.done }"
    @click.right.stop="handleNavigateTo"
    @click.left.stop="handleOpenMore"
  >
    <p class="truncate text-2xl font-bold text-[#f3f3f3] select-text" v-text="props.todo.name"></p>
    <p class="text-4 my-2 text-[#d0d0d0] select-text" v-text="formatDate(props.todo.createdAt)"></p>
    <div class="h-1 w-full" :class="urgencyColors[props.todo.urgency]"></div>
    <div class="flex justify-between p-6">
      <IconDone
        @click.stop="handleDone"
        v-if="!props.todo.done"
        class="h-8 w-8 text-white/60 hover:text-white/70 active:text-white"
      />
      <IconUndone
        @click.stop="handleUndone"
        v-else
        class="h-8 w-8 text-white/60 hover:text-white/70 active:text-white"
      />
      <IconEdit
        @click.stop="handleEdit"
        class="h-8 w-8 text-white/50 hover:text-white/60 active:text-white/80"
      />
      <IconRemove
        @click.stop="handleRemove"
        class="h-8 w-8 text-white/50 hover:text-white/60 active:text-white/80"
      />
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
