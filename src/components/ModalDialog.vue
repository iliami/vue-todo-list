<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { useModalStore } from '@/stores/modalStore';

const modalStore = useModalStore();
const dialogRef = ref<HTMLDialogElement | null>(null);
const closeButtonRef = ref<HTMLButtonElement | null>(null);

const emit = defineEmits<{
  (event: 'close'): void;
}>();

watch(
  () => modalStore.isOpen,
  async (newVal) => {
    try {
      if (newVal) {
        await nextTick();
        dialogRef.value?.show();
        dialogRef.value?.focus();
      } else {
        dialogRef.value?.close();
      }
    } catch (error) {
      console.error(error);
    }
  },
  { immediate: true },
);

const handleClose = () => {
  modalStore.closeModal();
  emit('close');
};
</script>

<template>
  <Transition name="fade">
    <div v-if="modalStore.isOpen" class="fixed inset-0 z-10000 overflow-auto backdrop-blur-xs">
      <div
        class="flex min-h-screen items-center justify-center"
        @click.self="handleClose"
        @keyup.esc="handleClose"
      >
        <Transition name="scale">
          <dialog
            ref="dialogRef"
            tabindex="-1"
            v-if="modalStore.isOpen"
            class="relative m-4 w-full max-w-lg rounded-2xl border border-gray-800 bg-[#34384e] p-5 shadow-xl"
          >
            <button
              ref="closeButtonRef"
              class="absolute top-2 right-2 text-2xl text-gray-300 hover:text-gray-500"
              @click.stop.once="handleClose"
            >
              ×
            </button>
            <div class="p-6">
              <slot />
            </div>
          </dialog>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
@reference "../assets/main.css";

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.scale-enter-active,
.scale-leave-active {
  @apply transition-transform duration-300;
}

.scale-enter-from,
.scale-leave-to {
  @apply scale-95 opacity-0;
}

dialog {
  @apply m-0 border-none p-0;
}
</style>
