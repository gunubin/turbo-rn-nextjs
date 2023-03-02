import {format, maxLength, minLength, multipleKindChars} from '../rules';

describe('@app/domain/lib/validators', () => {
  it('format()', () => {
    expect(format(/ab/).validate('abcd')).toBeTruthy();
    expect(format(/ab/).validate('ba')).toBeFalsy();
  });

  it('multipleKindChars()', () => {
    expect(
      multipleKindChars({kinds: [/a/, /b/, /c/], min: 2}).validate('a')
    ).toBeFalsy();
    expect(
      multipleKindChars({kinds: [/a/, /b/, /c/], min: 2}).validate('ad')
    ).toBeFalsy();
    expect(
      multipleKindChars({kinds: [/a/, /b/, /c/], min: 2}).validate('ab')
    ).toBeTruthy();
    expect(
      multipleKindChars({kinds: [/a/, /b/, /c/], min: 3}).validate('abc')
    ).toBeTruthy();
  });

  describe('hiragana()', () => {
    it('minLength()', () => {
      expect(minLength(1).validate('a')).toBeTruthy();
      expect(minLength(1).validate('')).toBeFalsy();
    });
    it('maxLength()', () => {
      expect(maxLength(1).validate('a')).toBeTruthy();
      expect(maxLength(1).validate('aa')).toBeFalsy();
    });
  });
});
