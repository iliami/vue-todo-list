export type SortOrder = 'asc' | 'desc';

export type SortField = 'name' | 'createdAt' | 'urgency';
export const SortFieldOptions: ReadonlyArray<SortField> = ['name', 'createdAt', 'urgency'];
