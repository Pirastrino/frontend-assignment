import {ZodIssue} from 'zod';

export const getInitialErrors = <T extends object>(initialValues: T): T =>
  Object.keys(initialValues).reduce((acc, key) => ({...acc, [key]: ''}), initialValues);

export const parseZodIssues = <T extends object>(errors: T, e: ZodIssue[]): T =>
  Object.keys(errors).reduce(
    (acc, key) => ({
      ...acc,
      [key]: e.find((err) => err.path[0] === key)?.message ?? '',
    }),
    errors
  );
