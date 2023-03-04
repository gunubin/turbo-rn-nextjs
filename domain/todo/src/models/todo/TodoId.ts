export type TodoId = string & {readonly brand: unique symbol};

// eslint-disable-next-line no-redeclare
export const TodoId = {
  create: (val: string) => val as TodoId,
};
