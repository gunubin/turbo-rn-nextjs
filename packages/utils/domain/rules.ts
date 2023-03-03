import {RuleCreator} from './types';

/**
 * フォーマット
 * @param regexp - チェックしたい正規表現
 */
export const format: RuleCreator<'format'> = (regexp: RegExp) => ({
  name: 'format',
  validate: (val: string) => regexp.test(val),
});

/**
 * 最大長
 *
 * @param length - 最大の長さ
 */
export const maxLength: RuleCreator<'maxLength'> = (length: number) => ({
  name: 'maxLength',
  validate: (val: string) => val.length <= length,
});

/**
 * 最小長
 *
 * @param length - 最小の長さ
 */
export const minLength: RuleCreator<'minLength'> = (length: number) => ({
  name: 'minLength',
  validate: (val: string) => val.length >= length,
});

/**
 * 指定数以上の種類の文字列に制限
 *
 * @param kinds - 許容する文字列パターンのリスト
 * @param min - 最低現必要な種類の数
 */
export const multipleKindChars: RuleCreator<'multipleKindChars'> = (params: {
  kinds: RegExp[];
  min: number;
}) => ({
  name: 'multipleKindChars',
  validate: (val: string) => {
    return (
      params.kinds.map((k) => k.test(val)).filter((t) => t).length >= params.min
    );
  },
});
