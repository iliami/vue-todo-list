<script setup lang="ts">
import IconDone from './icons/IconDone.vue';
import IconUndone from './icons/IconUndone.vue';
import IconRemove from './icons/IconRemove.vue';
import { type Todo, type Urgency } from '@/types/Todo';
import { formatDate } from '@/utils/DateUtils';

interface Props {
  todo: Todo;
}

const props = defineProps<Props>();

const urgencyColors: Record<Urgency, string> = {
  none: 'bg-transparent',
  easy: 'bg-[rgb(155,205,50)]',
  medium: 'bg-[rgb(205,155,50)]',
  hard: 'bg-[rgb(255,105,50)]',
};

const emit = defineEmits(['done-todo', 'undone-todo', 'remove-todo']);

function handleDone(): void {
  emit('done-todo', props.todo);
}

function handleUndone(): void {
  emit('undone-todo', props.todo);
}

function handleRemove(): void {
  emit('remove-todo', props.todo);
}
</script>

<template>
  <div
    class="h-40 rounded-2xl bg-black/15 p-2.5 transition duration-100 select-none hover:scale-105"
    :class="{ completed: props.todo.done }"
  >
    <p class="truncate text-2xl font-bold text-[#f3f3f3] select-text" v-text="props.todo.name"></p>
    <p class="text-4 my-2 text-[#d0d0d0] select-text" v-text="formatDate(props.todo.createdAt)"></p>
    <div class="h-1 w-full" :class="urgencyColors[props.todo.urgency]"></div>
    <div class="flex justify-between p-6">
      <IconDone
        @click="handleDone"
        v-if="!props.todo.done"
        class="h-8 w-8 text-white/60 hover:text-white/70 active:text-white"
      />
      <IconUndone
        @click="handleUndone"
        v-else
        class="h-8 w-8 text-white/60 hover:text-white/70 active:text-white"
      />
      <IconRemove
        @click="handleRemove"
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
