import {fields, invalidData, schema, validData} from '../__fixtures__/data';
import {createFormResolver} from '../resolver';

const shouldUseNativeValidation = false;

describe('resolver', () => {
  const resolver = createFormResolver(schema );

  it('should return values from resolver when validation pass', async () => {
    expect(
      await resolver(validData, undefined, {fields, shouldUseNativeValidation})
    ).toEqual({
      errors: {},
      values: validData,
    });
  });

  it('should return errors from resolver when validation fails', async () => {
    expect(
      await resolver(invalidData, undefined, {
        fields,
        shouldUseNativeValidation,
      })
    ).toEqual({
      errors: {
        address: {
          message: 'required',
          type: 'required',
        },
        email: {
          message: 'emailFormat',
          type: 'emailFormat',
        },
        password: {
          message: 'multipleKindChars',
          type: 'multipleKindChars',
        },
        username: {
          message: 'required',
          type: 'required',
        },
      },
      values: {},
    });
  });

  describe('override messages', () => {
    const resolver = createFormResolver(schema, {
      email: {emailFormat: 'overrideEmailFormat', required: 'overrideRequired'},
      username: {minLength: 'overrideMinLength', required: 'overrideRequired'},
    });

    it('should return values from resolver when validation pass', async () => {
      expect(
        await resolver(validData, undefined, {fields, shouldUseNativeValidation})
      ).toEqual({
        errors: {},
        values: validData,
      });
    });

    it('should return errors from resolver when validation fails', async () => {
      expect(
        await resolver(invalidData, undefined, {
          fields,
          shouldUseNativeValidation,
        })
      ).toEqual({
        errors: {
          address: {
            message: 'required',
            type: 'required',
          },
          email: {
            message: 'overrideEmailFormat',
            type: 'emailFormat',
          },
          password: {
            message: 'multipleKindChars',
            type: 'multipleKindChars',
          },
          username: {
            message: 'overrideRequired',
            type: 'required',
          },
        },
        values: {},
      });
    });
  });

});
