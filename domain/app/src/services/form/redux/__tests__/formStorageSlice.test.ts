import {actions, default as reducer} from '../formStorageSlice';

describe('FormStorageSlice', () => {
  describe('#store', () => {
    test('should append form object by form name.', () => {
      expect(
        reducer({test: {bar: 'val', foo: 'val'}} as any, {
          payload: {
            entity: {
              email: 'email',
              password: 'password',
              phoneNumber: 'phoneNumber',
            },
            name: 'signUp',
          },
          type: actions.stored.type,
        })
      ).toEqual({
        signUp: {
          email: 'email',
          password: 'password',
          phoneNumber: 'phoneNumber',
        },
        test: {bar: 'val', foo: 'val'},
      });
    });
  });

  describe('#reset', () => {
    test('should removed form object by form name.', () => {
      expect(
        reducer(
          {
            signUp: {
              entity: {
                email: 'email',
                password: 'password',
                phoneNumber: 'phoneNumber',
              },
              name: 'signUp',
            },
            test: {entity: {bar: 'val', foo: 'val'}, name: 'test'},
          } as any,
          {
            payload: {
              name: 'test',
            },
            type: actions.reset.type,
          }
        )
      ).toEqual({
        signUp: {
          entity: {
            email: 'email',
            password: 'password',
            phoneNumber: 'phoneNumber',
          },
          name: 'signUp',
        },
      });
    });
  });
});
