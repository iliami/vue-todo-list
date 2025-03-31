import { defineStore } from 'pinia';
import { ref, nextTick } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const activeTrigger = ref<HTMLElement | null>(null);

  const openModal = (trigger: HTMLElement) => {
    activeTrigger.value = trigger;
    isOpen.value = true;
  };

  const closeModal = () => {
    nextTick(() => {
      setTimeout(() => {
        isOpen.value = false;
        activeTrigger.value?.focus();
        activeTrigger.value = null;
      }, 100);
    });
  };

  return { isOpen, activeTrigger, openModal, closeModal };
});
