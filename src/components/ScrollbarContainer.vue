<template>
  <div
    class="scrollbar h-full overflow-y-auto p-5 [direction:rtl]"
    style="-webkit-overflow-scrolling: touch; -ms-overflow-style: none"
  >
    <slot></slot>
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
</style>
