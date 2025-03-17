<script setup lang="ts"></script>

<template>
  <form class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label for="todo-name" class="text-base font-medium text-gray-200">Название задачи</label>
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
</template>
