export type TodoId = string & {readonly brand: unique symbol};

export const TodoId = {
  create: (val: string) => val as TodoId,
};
