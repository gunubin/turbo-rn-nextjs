export type ModalId = string & {
  readonly brand: unique symbol;
};
// eslint-disable-next-line no-redeclare
export const ModalId = {
  create: (val: string): ModalId => val as ModalId,
};
