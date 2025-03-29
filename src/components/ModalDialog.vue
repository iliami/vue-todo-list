<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (event: 'close'): void;
}>();

const dialogRef = ref<HTMLDialogElement | null>(null);

function handleOverlayClick() {
  emit('close');
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      dialogRef.value?.showModal();
    } else {
      dialogRef.value?.close();
    }
  },
);

onMounted(() => {
  if (props.isOpen) {
    dialogRef.value?.showModal();
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-auto backdrop-blur-xs">
      <div class="flex min-h-screen items-center justify-center" @click.self="handleOverlayClick">
        <Transition name="scale">
          <dialog
            ref="dialogRef"
            :open="isOpen"
            v-show="isOpen"
            class="relative m-4 w-full max-w-lg rounded-2xl border border-gray-800 bg-[#34384e] p-5 shadow-xl"
          >
            <button
              class="absolute top-2 right-2 text-2xl text-gray-300 hover:text-gray-500"
              @click="emit('close')"
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
</style>
