// memo: ユーザーの入力値を手続きごとに保存しておくものの単位。画面ごとのformとは違うことに注意。

export type FormStorageEntities = {
  foo?: {bar: string};
};

export type FormStorageName = keyof FormStorageEntities;

export type FormStorageEntity<TName extends FormStorageName = any> =
  FormStorageEntities[TName];

export interface IFormStorage {
  get<TName extends FormStorageName>(
    name: TName
  ): FormStorageEntity<TName> | undefined;

  store<TName extends FormStorageName>(
    name: TName,
    entity: Partial<FormStorageEntity<TName>>
  ): void;

  reset(name: FormStorageName): void;
}
