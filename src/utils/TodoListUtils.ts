import type { Todo } from '@/types/Todo';
import { isHaveAnyChildren } from './TodoUtils';

export function findTodoById(todos: ReadonlyArray<Todo>, todoId: Todo['id']): Todo | undefined {
  for (const todo of todos) {
    if (todo.id === todoId) {
      return todo;
    }
    if (isHaveAnyChildren(todo)) {
      const result = findTodoById(todo.children, todoId);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
}

export function deleteTodoById(todos: Array<Todo>, todoId: number): boolean {
  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i];
    if (todo.id === todoId) {
      todos.splice(i, 1);
      return true;
    }
    if (todo.children && todo.children.length > 0) {
      const isDeleted = deleteTodoById(todo.children, todoId);
      if (isDeleted) {
        return true;
      }
    }
  }
  return false;
}

export function countTodos(todos: ReadonlyArray<Todo>, predicate: (todo: Todo) => boolean): number {
  let result = 0;
  for (const todo of todos) {
    if (predicate(todo)) {
      result += 1;
    }
    if (isHaveAnyChildren(todo)) {
      result += countTodos(todo.children, predicate);
    }
  }
  return result;
}
