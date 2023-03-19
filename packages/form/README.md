# custom useForm hook for react-hook-form

react-hook-form-valueobject is a library for processing forms using ValueObjects with react-hook-form. Using ValueObjects can increase the type safety of form input values.

react-hook-form-valueobject can be used in both React and React Native, and with zod, it's easy to define schemas for ValueObjects and perform form validation.

The main features of this library are:

A wrapper function for react-hook-form that can be used in both React and React Native.
The ability to define schemas for ValueObjects using zod.
Provides fields, making it easy to separate presentational components and container components, making presentational component testing easier.
When using this library, you need to define the ValueObject and form schema as follows.


## Defining the ValueObject
ValueObjects can be defined as follows.

```ts
import {createValueObject} from 'utils/domain';
import {z} from 'utils/validation';

export const MyValueObject = createValueObject(
  z.string().min(1).max(100).brand('MyValueObject')
);

export type MyValueObject = z.infer<typeof MyValueObject.schema>;

```

## Defining the form schema
Form schemas can be defined as follows.

```ts
import {createSchema} from 'form';
import {MyValueObject} from 'path/to/value/object';

export type FormValues = {
  title: typeof MyValueObject;
};

export const myFormSchema = createSchema<FormValues>({
  title: {
    errorMessages: {
      too_big: 'Please enter 100 characters or less',
      too_small: '',
    },
    valueObject: MyValueObject,
  },
});
```

When defining the form schema, you need to define error messages and ValueObject definitions for each field.

## Usage
When using this library, you can use it as follows.

```tsx
import {useForm} from 'react-hook-form-valueobject';
import {myFormSchema} from 'path/to/form/schema';

export default function MyForm() {
  const {handleSubmit, fields, errors, isValid, reset} = useForm(
    myFormSchema
  );

  const onSubmit = (data: any) => {
    // Form submission processing
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...fields.title} />
      {errors.title && <span>{errors.title.message}</span>}
      <button disabled={!isValid}>Submit</button>
    </form>
  );
}
```
