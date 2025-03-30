export type Urgency = 'none' | 'easy' | 'medium' | 'hard';
export const UrgencyOptions: ReadonlyArray<Urgency> = ['none', 'easy', 'medium', 'hard'];

export interface Todo {
  id: number;
  name: string;
  createdAt: Date;
  urgency: Urgency;
  done: boolean;
  children?: Array<Todo>;
}
