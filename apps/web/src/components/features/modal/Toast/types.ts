export type Type = 'Success' | 'Error';
export type Props = {
  children: string;
  type: Type;
  onRequestClose: () => void;
};
