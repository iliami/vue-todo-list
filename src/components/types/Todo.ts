export type Urgency = 'none' | 'easy' | 'medium' | 'hard';

export interface Todo {
  id: number;
  name: string;
  createdAt: Date;
  urgency: Urgency;
  isDone: boolean;
}
