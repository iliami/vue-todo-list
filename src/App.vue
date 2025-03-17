<script setup lang="ts">
import IconDone from './components/icons/IconDone.vue';
import IconRemove from './components/icons/IconRemove.vue';
import IconUndone from './components/icons/IconUndone.vue';

type Urgency = 'none' | 'easy' | 'medium' | 'hard';
interface Todo {
  id: number;
  name: string;
  createdAt: Date;
  urgency: Urgency;
  isDone: boolean;
}

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

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat('ru-RU', options);
  const parts = formatter.formatToParts(date);

  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? '';
  const day = parts.find((part) => part.type === 'day')?.value ?? '';
  const month = parts.find((part) => part.type === 'month')?.value ?? '';
  const year = parts.find((part) => part.type === 'year')?.value ?? '';

  return `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} ${month} ${year}`;
}
</script>

<template>
  <div class="flex h-dvh min-w-[1400px] bg-[#25283a] text-white">
    <div class="m-5 mr-2.5 flex h-[95%] flex-3 flex-col gap-5">
      <div
        class="flex justify-between gap-5 rounded-2xl bg-[#34384e] p-5 px-[50px] py-[25px] text-center text-3xl"
      >
        <div id="all" class="selected flex-1 cursor-pointer px-2 pb-2 opacity-90 hover:opacity-100">
          Все
        </div>
        <div id="done" class="flex-1 cursor-pointer px-2 pb-2 opacity-90 hover:opacity-100">
          Выполненные
        </div>
        <div id="undone" class="flex-1 cursor-pointer px-2 pb-2 opacity-90 hover:opacity-100">
          Невыполненные
        </div>
      </div>
      <div class="h-[1%] flex-grow-1 rounded-2xl bg-[#34384e] bg-gradient-to-r p-5">
        <div
          class="scrollbar h-full overflow-y-auto p-5 [direction:rtl]"
          style="-webkit-overflow-scrolling: touch; -ms-overflow-style: none"
        >
          <div
            class="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2.5 pr-5 [direction:ltr]"
          >
            <div
              v-for="item in todos"
              :key="item.id"
              class="h-[150px] rounded-2xl bg-black/15 p-[10px]"
              :class="item.isDone ? 'done' : ''"
            >
              <p class="text-2xl font-bold text-[#f3f3f3]">{{ item.name }}</p>
              <p class="text-[16px] text-[#d0d0d0]">{{ formatDate(item.createdAt) }}</p>
              <div
                class="h-1 w-full"
                :class="
                  item.urgency === 'easy'
                    ? 'bg-[rgb(155,205,50)]'
                    : item.urgency === 'medium'
                      ? 'bg-[rgb(205,155,50)]'
                      : item.urgency === 'hard'
                        ? 'bg-[rgb(255,105,50)]'
                        : 'bg-transparent'
                "
              ></div>
              <div class="mx-[20px] flex justify-between py-[10px]">
                <IconDone v-if="!item.isDone" class="text-white/60" />
                <IconUndone v-else class="text-white/60" />
                <IconRemove class="text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-5 ml-2.5 flex h-[95%] flex-1 flex-col gap-5">
      <div
        class="add-todo-form panel flex-2 rounded-2xl bg-[#34384e] bg-gradient-to-l p-5 text-2xl font-bold text-[#f3f3f3]"
      >
        <form class="flex flex-col gap-4">
          <div class="flex flex-col gap-1">
            <label for="todo-name" class="text-base font-medium text-gray-200"
              >Название задачи</label
            >
            <input
              type="text"
              name="todo-name"
              placeholder="Название задачи"
              class="rounded-lg border border-[#454a61] bg-[#454a61] px-4 py-2 text-base text-gray-400 placeholder:text-gray-400 focus:border-[#303241] focus:ring-2 focus:ring-[#303241] focus:outline-none"
            />
          </div>
          <div class="flex flex-col gap-1">
            <label for="urgency-type" class="text-base font-medium text-gray-200">Срочность</label>
            <select
              name="urgency-type"
              id="urgency-type"
              class="rounded-lg border border-[#454a61] bg-[#454a61] px-4 py-2 text-base text-gray-400 focus:border-[#303241] focus:ring-2 focus:ring-[#303241] focus:outline-none"
            >
              <option value="none" selected>Нет</option>
              <option value="easy">Маленькая</option>
              <option value="medium">Средняя</option>
              <option value="hard">Высокая</option>
            </select>
          </div>
          <button
            type="button"
            class="h-14 w-full rounded-lg bg-[#000]/15 px-6 py-2 text-center text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-300 focus:outline-none active:scale-95"
          >
            Добавить задачу
          </button>
        </form>
      </div>
      <div
        class="todo-statistics panel flex-1 rounded-2xl bg-[#34384e] p-5 text-2xl font-bold text-[#f3f3f3]"
      >
        <p>Всего: {{ todos.length }}</p>
        <p>Выполнено: {{ todos.filter((t) => t.isDone).length }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@layer utilities {
  .scrollbar::-webkit-scrollbar {
    width: 10px;
  }
  .scrollbar::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }
  .scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 10px;
    border: none;
  }
  .scrollbar::-webkit-scrollbar-button {
    color: transparent;
  }
}
@layer components {
  .selected {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 4px;
    border-bottom-color: var(--color-white);
  }

  .done {
    opacity: 50%;
  }
}
</style>
