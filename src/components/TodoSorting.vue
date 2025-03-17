<template>
  <div class="flex justify-between gap-5 p-5 px-[50px] py-[25px] text-center text-3xl">
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
</template>

<style scoped>
@layer components {
  .selected {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 4px;
    border-bottom-color: var(--color-white);
  }
}
</style>
