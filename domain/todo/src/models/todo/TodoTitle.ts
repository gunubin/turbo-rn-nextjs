import {createValueObject} from 'utils/domain';
import {z} from 'utils/validation';

// eslint-disable-next-line no-redeclare
export const TodoTitle = createValueObject(
  z.string().min(1).max(100).brand('TodoTitle')
);

// eslint-disable-next-line no-redeclare
export type TodoTitle = z.infer<typeof TodoTitle.schema>;
