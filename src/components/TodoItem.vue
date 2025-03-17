<script setup lang="ts">
import { type Todo } from './types/Todo';
import { formatDate } from '@/utils/DateUtils';

interface Props {
  todo: Todo;
}

const props = defineProps<Props>();
</script>
<template>
  <div class="h-[150px] rounded-2xl bg-black/15 p-[10px]" :class="props.todo.isDone ? 'done' : ''">
    <p class="text-2xl font-bold text-[#f3f3f3]">{{ props.todo.name }}</p>
    <p class="text-[16px] text-[#d0d0d0]">{{ formatDate(props.todo.createdAt) }}</p>
    <div
      class="h-1 w-full"
      :class="
        props.todo.urgency === 'easy'
          ? 'bg-[rgb(155,205,50)]'
          : props.todo.urgency === 'medium'
            ? 'bg-[rgb(205,155,50)]'
            : props.todo.urgency === 'hard'
              ? 'bg-[rgb(255,105,50)]'
              : 'bg-transparent'
      "
    ></div>
    <div class="mx-[20px] flex justify-between py-[10px]">
      <IconDone v-if="!props.todo.isDone" class="text-white/60" />
      <IconUndone v-else class="text-white/60" />
      <IconRemove class="text-white/50" />
    </div>
  </div>
</template>

<style scoped>
@layer components {
  .done {
    opacity: 50%;
  }
}
</style>
