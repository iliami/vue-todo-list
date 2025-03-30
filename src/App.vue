<script setup lang="ts">
import PanelContainer from '@/components/PanelContainer.vue';
import ScrollbarContainer from '@/components/ScrollbarContainer.vue';
import ModalDialog from '@/components/ModalDialog.vue';
import TodoAddForm from '@/components/TodoAddForm.vue';
import TodoEditForm from '@/components/TodoEditForm.vue';
import TodoList from '@/components/TodoList.vue';
import TodoListFiltering from '@/components/TodoListFiltering.vue';
import TodoListSorting from '@/components/TodoListSorting.vue';
import TodoListSearch from '@/components/TodoListSearch.vue';
import TodoListStatistics from '@/components/TodoListStatistics.vue';
import IconGoBack from '@/components/icons/IconGoBack.vue';
import type { Todo, Urgency } from '@/types/Todo';
import type { Filter } from '@/types/Filter';
import type { SortOrder, SortField } from '@/types/SortSettings';
import { isHaveAnyChildren } from '@/utils/TodoUtils';
import { findTodoById, deleteTodoById, countTodos } from '@/utils/TodoListUtils';
import { ref, computed } from 'vue';

const isModalOpen = ref(false);

const editedTodoId = ref<Todo['id']>();

const currentFilter = ref<Filter>('all');
const currentSortOrder = ref<SortOrder>('asc');
const currentSortField = ref<SortField>('createdAt');
const currentSearchQuery = ref('');

const history = ref<Array<Todo>>([]);

const generatedTodos: Array<Todo> = [
  {
    id: 1,
    name: 'Организовать конференцию',
    createdAt: new Date('2023-10-01'),
    urgency: 'hard',
    done: false,
    children: [
      {
        id: 2,
        name: 'Подготовка программы',
        createdAt: new Date('2023-10-02'),
        urgency: 'medium',
        done: false,
        children: [
          {
            id: 3,
            name: 'Составить расписание выступлений',
            createdAt: new Date('2023-10-03'),
            urgency: 'easy',
            done: false,
          },
          {
            id: 4,
            name: 'Пригласить спикеров',
            createdAt: new Date('2023-10-03'),
            urgency: 'hard',
            done: true,
          },
          {
            id: 5,
            name: 'Подготовить материалы для участников',
            createdAt: new Date('2023-10-04'),
            urgency: 'medium',
            done: false,
          },
        ],
      },
      {
        id: 6,
        name: 'Логистика',
        createdAt: new Date('2023-10-05'),
        urgency: 'hard',
        done: false,
        children: [
          {
            id: 7,
            name: 'Забронировать помещение',
            createdAt: new Date('2023-10-06'),
            urgency: 'hard',
            done: true,
          },
          {
            id: 8,
            name: 'Организовать транспорт для гостей',
            createdAt: new Date('2023-10-07'),
            urgency: 'medium',
            done: false,
          },
          {
            id: 9,
            name: 'Установить оборудование',
            createdAt: new Date('2023-10-08'),
            urgency: 'hard',
            done: false,
            children: [
              {
                id: 10,
                name: 'Установить проекторы',
                createdAt: new Date('2023-10-09'),
                urgency: 'medium',
                done: false,
              },
              {
                id: 11,
                name: 'Настроить звуковое оборудование',
                createdAt: new Date('2023-10-09'),
                urgency: 'medium',
                done: false,
              },
            ],
          },
        ],
      },
      {
        id: 12,
        name: 'Маркетинг',
        createdAt: new Date('2023-10-10'),
        urgency: 'hard',
        done: false,
        children: [
          {
            id: 13,
            name: 'Разработать рекламную кампанию',
            createdAt: new Date('2023-10-11'),
            urgency: 'medium',
            done: false,
          },
          {
            id: 14,
            name: 'Запустить рекламу в соцсетях',
            createdAt: new Date('2023-10-12'),
            urgency: 'easy',
            done: false,
          },
        ],
      },
    ],
  },
  {
    id: 15,
    name: 'Подготовка отчета по проекту',
    createdAt: new Date('2023-10-13'),
    urgency: 'medium',
    done: false,
    children: [
      {
        id: 16,
        name: 'Собрать данные по проекту',
        createdAt: new Date('2023-10-14'),
        urgency: 'easy',
        done: false,
      },
      {
        id: 17,
        name: 'Проанализировать результаты',
        createdAt: new Date('2023-10-15'),
        urgency: 'medium',
        done: false,
      },
      {
        id: 18,
        name: 'Написать текст отчета',
        createdAt: new Date('2023-10-16'),
        urgency: 'hard',
        done: false,
        children: [
          {
            id: 19,
            name: 'Написать введение',
            createdAt: new Date('2023-10-17'),
            urgency: 'medium',
            done: false,
          },
          {
            id: 20,
            name: 'Описать основные этапы',
            createdAt: new Date('2023-10-17'),
            urgency: 'medium',
            done: false,
          },
          {
            id: 21,
            name: 'Добавить выводы',
            createdAt: new Date('2023-10-18'),
            urgency: 'easy',
            done: false,
          },
        ],
      },
    ],
  },
];
const todos = ref<Array<Todo>>(generatedTodos);
// const todos = ref<Array<Todo>>([]);

const computedTodos = computed(() => {
  const todosToFilterAndSort: Array<Todo> =
    history.value.length === 0
      ? [...todos.value]
      : [...history.value[history.value.length - 1].children!];

  const searchQuery = currentSearchQuery.value.trim();
  const filteredTodos = todosToFilterAndSort
    .filter((t) => searchQuery === '' || t.name.includes(searchQuery))
    .filter((t) =>
      currentFilter.value === 'all'
        ? true
        : currentFilter.value === 'done'
          ? t.done
          : currentFilter.value === 'not-done'
            ? !t.done
            : false,
    );
  const filteredAndSortedTodos = filteredTodos.sort((a, b) => {
    const field = currentSortField.value;
    const order = currentSortOrder.value;

    if (field === 'createdAt') {
      return order === 'asc'
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime();
    } else if (field === 'name') {
      return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (field === 'urgency') {
      const urgencyOrder: Record<Urgency, number> = {
        none: 0,
        easy: 1,
        medium: 2,
        hard: 3,
      };
      return order === 'asc'
        ? urgencyOrder[a.urgency] - urgencyOrder[b.urgency]
        : urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    }

    return 0;
  });
  return filteredAndSortedTodos;
});

function handleAdd(
  todoName: Todo['name'],
  todoUrgency: Todo['urgency'],
  todoHaveChildren: boolean,
): void {
  const newTodo: Todo = {
    id: Date.now(),
    name: todoName,
    urgency: todoUrgency,
    done: false,
    createdAt: new Date(),
    children: todoHaveChildren ? [] : undefined,
  };

  if (history.value.length === 0) {
    todos.value.push(newTodo);
  } else {
    const parentTask = history.value[history.value.length - 1];
    if (parentTask.children && Array.isArray(parentTask.children)) {
      parentTask.children.push(newTodo);
    }
  }
}

function handleRemove(todoId: Todo['id']): void {
  deleteTodoById(todos.value, todoId);
}

function handleEdit(todoId: Todo['id']): void {
  editedTodoId.value = todoId;
  isModalOpen.value = true;
}

function handleSave(
  todoId: Todo['id'],
  todoName: Todo['name'],
  todoUrgency: Todo['urgency'],
  todoDone: Todo['done'],
  todoHaveChildren: boolean,
) {
  const todo = findTodoById(todos.value, todoId);
  if (todo) {
    todo.name = todoName;
    todo.urgency = todoUrgency;
    todo.done = todoDone;
    if (!isHaveAnyChildren(todo)) {
      todo.children = todoHaveChildren ? [] : undefined;
    }
  }
  isModalOpen.value = false;
}

function handleNavigateTo(todo: Todo): void {
  if (todo.children && Array.isArray(todo.children)) {
    history.value = [...history.value, todo];
  }
}

function handleGoBack(): void {
  if (history.value.length > 0) {
    history.value = history.value.slice(0, -1);
  }
}

function handleUpdateFilter(filter: Filter): void {
  currentFilter.value = filter;
}

function handleUpdateSort(order: SortOrder, field: SortField) {
  currentSortOrder.value = order;
  currentSortField.value = field;
}

function handleUpdateSearchQuery(searchQuery: string): void {
  currentSearchQuery.value = searchQuery;
}

function handleDone(todoId: Todo['id']): void {
  const todo = findTodoById(todos.value, todoId);
  if (todo) {
    todo.done = true;
  }
}

function handleUndone(todoId: Todo['id']): void {
  const todo = findTodoById(todos.value, todoId);
  if (todo) {
    todo.done = false;
  }
}
</script>

<template>
  <div class="h-dvh max-h-[800px] w-dvw max-w-[1600px]">
    <div
      class="flex h-full w-full bg-[#25283a] pb-10 text-white not-xl:flex-col-reverse not-xl:overflow-y-auto"
    >
      <div class="m-5 flex flex-10 flex-col gap-5 xl:mr-2.5 xl:h-full">
        <div class="flex gap-5">
          <PanelContainer v-if="history.length !== 0" class="flex flex-1">
            <IconGoBack
              @click="handleGoBack"
              class="m-auto h-12 w-12 rounded-lg bg-[#000]/15 p-1 text-center text-2xl font-bold text-[#f3f3f3] transition-all duration-300 hover:scale-105 hover:from-[#000]/25 hover:to-[#000]/45 focus:ring-2 focus:ring-[#303241] focus:outline-none active:scale-95"
            />
          </PanelContainer>
          <PanelContainer>
            <TodoListFiltering @update-filter="handleUpdateFilter" />
          </PanelContainer>
        </div>
        <div class="h-px min-h-96 flex-1">
          <PanelContainer>
            <ScrollbarContainer>
              <TodoList
                :todos="computedTodos"
                @done-todo="handleDone"
                @undone-todo="handleUndone"
                @edit-todo="handleEdit"
                @remove-todo="handleRemove"
                @navigate-to="handleNavigateTo"
              />
            </ScrollbarContainer>
          </PanelContainer>
        </div>
      </div>
      <div class="m-5 flex flex-3 flex-col justify-items-start gap-5 xl:ml-2.5 xl:h-full">
        <div class="h-fit text-2xl font-bold text-[#f3f3f3]">
          <PanelContainer>
            <TodoListSearch @update-search="handleUpdateSearchQuery" />
          </PanelContainer>
        </div>
        <div class="h-fit text-2xl font-bold text-[#f3f3f3]">
          <PanelContainer>
            <TodoListSorting @update-sort="handleUpdateSort" />
          </PanelContainer>
        </div>
        <div class="h-fit text-2xl font-bold text-[#f3f3f3]">
          <PanelContainer>
            <TodoAddForm @add-todo="handleAdd" />
          </PanelContainer>
        </div>
        <div class="flex-auto text-2xl font-bold text-[#f3f3f3]">
          <PanelContainer>
            <TodoListStatistics
              :all="countTodos(todos, (_) => true)"
              :done="countTodos(todos, (t) => t.done)"
            />
          </PanelContainer>
        </div>
      </div>
    </div>
    <ModalDialog
      class="text-2xl font-bold text-[#f3f3f3]"
      :is-open="isModalOpen"
      @close="isModalOpen = false"
    >
      <TodoEditForm :todo="findTodoById(todos, editedTodoId!)!" @save-todo="handleSave" />
    </ModalDialog>
  </div>
</template>
