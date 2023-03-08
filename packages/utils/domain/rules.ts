import {RuleCreator} from './types';

/**
 * フォーマット
 * @param regexp - チェックしたい正規表現
 */
export const format: RuleCreator<'format', RegExp> = (regexp) => ({
  name: 'format',
  validate: (val: string) => regexp.test(val),
});

/**
 * 最大長
 *
 * @param length - 最大の長さ
 */
export const maxLength: RuleCreator<'maxLength', number> = (length) => ({
  name: 'maxLength',
  validate: (val: string) => val?.length <= length,
});

/**
 * 最小長
 *
 * @param length - 最小の長さ
 */
export const minLength: RuleCreator<'minLength', number> = (length) => ({
  name: 'minLength',
  validate: (val: string) => val.length >= length,
});

/**
 * 指定数以上の種類の文字列に制限
 *
 * @param params
 * @param kinds - 許容する文字列パターンのリスト
 * @param min - 最低現必要な種類の数
 * @param params.kinds
 * @param params.min
 */
export const multipleKindChars: RuleCreator<'multipleKindChars', {kinds: RegExp[], min: number}> = (params) => ({
  name: 'multipleKindChars',
  validate: (val: string) => {
    return (
      params.kinds.map((k) => k.test(val)).filter((t) => t).length >= params.min
    );
  },
});

export const emailFormat: RuleCreator<'emailFormat'> = () => ({
  name: 'emailFormat',
  validate: (val: string) => {
    // eslint-disable-next-line no-control-regex
    return /^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(
      val
    );
  },
});
