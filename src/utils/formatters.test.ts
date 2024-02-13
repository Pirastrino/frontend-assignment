import {getInitialErrors, parseZodIssues} from './formatters';
import {ZodIssue} from 'zod';

describe('getInitialErrors', () => {
  it('should return an object with empty strings as values', () => {
    const initialValues = {
      name: 'John',
      age: 25,
      email: 'john@example.com',
    };

    const result = getInitialErrors(initialValues);

    expect(result).toEqual({
      name: '',
      age: '',
      email: '',
    });
  });

  it('should return an empty object if the input is an empty object', () => {
    const initialValues = {};

    const result = getInitialErrors(initialValues);

    expect(result).toEqual({});
  });
});

describe('parseZodError', () => {
  it('should return an object with error messages corresponding to the keys', () => {
    const errors = {
      name: '',
      age: '',
      email: '',
    };

    const zodError = [
      {
        message: 'Task name must be at least 3 characters.',
        path: ['name'],
      },
      {
        message: 'Email is required.',
        path: ['email'],
      },
    ] as unknown as ZodIssue[]; // the rest of the error object is not needed for this test

    const result = parseZodIssues(errors, zodError);

    expect(result).toEqual({
      name: 'Task name must be at least 3 characters.',
      age: '',
      email: 'Email is required.',
    });
  });
});
