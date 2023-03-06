import {TodoId} from '@domain/todo/models/todo/TodoId';
import {TodoTitle} from '@domain/todo/models/todo/TodoTitle';

export type TodoStatus = 'pending' | 'done' | 'trash';

export type Todo = {
  status: TodoStatus;
  createdAt: string;
  id: TodoId;
  title: TodoTitle;
  description?: string;
} & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const Todo = {
  create: ({
    id,
    description,
    title,
  }: {
    id?: TodoId;
    title: TodoTitle;
    description?: string;
  }): Todo => {
    return {
      createdAt: new Date().toString(),
      description,
      id: id || Date.now().toString(),
      status: 'pending',
      title,
    } as Todo;
  },
};
