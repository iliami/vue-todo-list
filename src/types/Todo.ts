export type Urgency = 'none' | 'easy' | 'medium' | 'hard';
export const UrgencyOptions: ReadonlyArray<Urgency> = ['none', 'easy', 'medium', 'hard'];

export interface Todo {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  history: Array<TodoHistory>;
  urgency: Urgency;
  done: boolean;
  children?: Array<Todo>;
}

export interface TodoHistory {
  name: string;
  description: string;
  urgency: Urgency;
  done: boolean;
  date: Date;
}
