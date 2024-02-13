import {useState} from 'react';
import {ZodError, ZodSchema} from 'zod';

import {getInitialErrors, parseZodIssues} from '../utils/formatters';

type Props<T> = {
  validationSchema: ZodSchema<any>;
  initialValues: T;
};

const useForm = <T extends object>({validationSchema, initialValues}: Props<T>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(getInitialErrors(initialValues));

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const {name, value} = e.currentTarget;
    setValues((prevData: T) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const reset = () => {
    setValues(initialValues);
    setErrors(initialValues);
  };

  const handleSubmit =
    (onSubmit: (data: T) => Promise<void> | void) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        validationSchema.parse(values);
        onSubmit(values);
        reset();
      } catch (e) {
        if (e instanceof ZodError) {
          setErrors(parseZodIssues(errors, e.errors));
        }
        // TODO: handle other errors with custom onError callback
      }
    };

  return {
    values,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    reset,
  };
};

export default useForm;
