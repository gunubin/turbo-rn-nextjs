import {Todo} from '@domain/todo/models/todo/Todo';
import {TodoId} from '@domain/todo/models/todo/TodoId';

export interface ITodoListService {
  add(params: {item: Todo}): void;
  update(params: {item: Todo}): void;
  remove(params: {id: TodoId}): void;
}
