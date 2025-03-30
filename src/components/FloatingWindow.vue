<script setup lang="ts">
import { ref, onUnmounted, watch, inject, onMounted } from 'vue';

interface Props {
  modelValue?: boolean;
  initialX?: number;
  initialY?: number;
  windowStyle?: WindowStyle;
  closeButtonStyle?: CloseButtonStyle;
}

interface WindowRegistryItem {
  id: number;
  updateZIndex: (zIndex: number) => void;
}

const windowRegistry = inject('windowRegistry', ref<WindowRegistryItem[]>([]));
const instanceId = Math.random();
const zIndexValue = ref(1000);

interface WindowStyle {
  base?: string;
  size?: string;
  padding?: string;
  border?: string;
}

interface CloseButtonStyle {
  base?: string;
  hover?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: true,
  initialX: 0,
  initialY: 0,
  windowStyle: (): WindowStyle => ({
    base: '',
    size: '',
    padding: '',
    border: '',
  }),
  closeButtonStyle: (): CloseButtonStyle => ({
    base: '',
    hover: '',
  }),
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'open'): void;
  (e: 'close'): void;
}>();

const isOpen = ref(props.modelValue);
const x = ref(0);
const y = ref(0);
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);

watch(
  () => props.modelValue,
  (newValue) => {
    isOpen.value = newValue;
    if (newValue) {
      setPosition();
      emit('open');
    } else {
      emit('close');
    }
  },
);

const setPosition = () => {
  setPositionCenter();
  if (props.initialX !== undefined) {
    x.value = props.initialX;
  }
  if (props.initialY !== undefined) {
    y.value = props.initialY;
  }
};

const setPositionCenter = () => {
  x.value = window.innerWidth / 2 - 150;
  y.value = window.innerHeight / 2 - 100;
};

const onDragStart = (e: MouseEvent) => {
  isDragging.value = true;
  dragStartX.value = e.clientX - x.value;
  dragStartY.value = e.clientY - y.value;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', onDragEnd);
  bringToFront();
};

const onDrag = (e: MouseEvent) => {
  if (isDragging.value) {
    x.value = e.clientX - dragStartX.value;
    y.value = e.clientY - dragStartY.value;
  }
};

const onDragEnd = () => {
  isDragging.value = false;
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', onDragEnd);
};

const handleClose = () => {
  isOpen.value = false;
  emit('update:modelValue', false);
  emit('close');
};

onMounted(() => {
  setPosition();
  const registryItem = {
    id: instanceId,
    updateZIndex: (zIndex: number) => {
      zIndexValue.value = zIndex;
    },
  };

  windowRegistry.value.push(registryItem);
  updateZIndexes();
});

onUnmounted(() => {
  windowRegistry.value = windowRegistry.value.filter((item) => item.id !== instanceId);
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', onDragEnd);
});

const bringToFront = () => {
  windowRegistry.value = windowRegistry.value
    .filter((item) => item.id !== instanceId)
    .concat([
      {
        id: instanceId,
        updateZIndex: (zIndex: number) => (zIndexValue.value = zIndex),
      },
    ]);

  updateZIndexes();
};

const updateZIndexes = () => {
  windowRegistry.value.forEach((item, index) => {
    item.updateZIndex(1000 + index);
  });
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed rounded-lg"
      :class="[windowStyle.base, windowStyle.size, windowStyle.padding, windowStyle.border]"
      :style="{ left: `${x}px`, top: `${y}px`, zIndex: zIndexValue }"
      @mousedown="onDragStart"
    >
      <Transition name="scale">
        <div
          v-if="isOpen"
          class="relative m-4 w-full max-w-lg rounded-2xl border border-gray-800 bg-[#34384e] p-5 shadow-xl"
        >
          <button
            class="absolute top-2 right-2 text-2xl text-gray-300 hover:text-gray-500"
            :class="[closeButtonStyle.base, closeButtonStyle.hover]"
            @click.stop="handleClose"
          >
            ×
          </button>

          <div class="p-4 pt-0">
            <slot />
          </div>
        </div>
      </Transition>
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
