import {Field, InternalFieldName} from 'react-hook-form';

import {Email, Password, Username} from './model';

import {createSchema} from '../resolver';
import {ValueObjectFieldValuesBySchema} from '../types';

export type FormValues = {
  address: string;
  animal: string;
  email: typeof Email;
  username: typeof Username;
  password: typeof Password;
};

export const schema = createSchema<FormValues>({
  address: {
    required: {message: 'required'},
  },
  animal: {
    required: false,
  },
  email: {
    required: {message: 'required'},
    ruleMessages: {
      emailFormat: 'emailFormat',
    },
    valueObject: Email,
  },
  password: {
    required: true,
    ruleMessages: {
      multipleKindChars: 'multipleKindChars',
    },
    valueObject: Password,
  },
  username: {
    required: {message: 'required'},
    ruleMessages: {
      minLength: 'minLength',
    },
    valueObject: Username,
  },
});

export const validData: ValueObjectFieldValuesBySchema<typeof schema> = {
  address: 'aiueokakikukeko',
  animal: '',
  email: Email.create('user@example.com'),
  password: Password.create('asddfg123!'),
  username: Username.create('asdfasdf'),
};

export const invalidData = {
  address: '',
  animal: 'dog',
  email: Email.create('aaa'),
  password: Password.create('1234'),
  username: Username.create(''),
};

export const fields: Record<InternalFieldName, Field['_f']> = {
  address: {
    name: 'address',
    ref: { name: 'address' },
  },
  animal: {
    name: 'animal',
    ref: { name: 'animal' },
  },
  email: {
    name: 'email',
    ref: { name: 'email' },
  },
  password: {
    name: 'password',
    ref: {name: 'password'}
  },
  username: {
    name: 'username',
    ref: { name: 'username' },
  },
};
