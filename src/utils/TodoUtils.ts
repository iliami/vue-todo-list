import type { Todo } from '@/types/Todo';

export function isHaveAnyChildren(
  todo: Todo,
): todo is Todo & { children: NonNullable<Todo['children']> } {
  return Array.isArray(todo.children) && todo.children.length > 0;
}
