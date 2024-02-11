import {useState} from 'react';
import {ZodError, ZodSchema} from 'zod';

type Props<T> = {
  validationSchema: ZodSchema<any>;
  initialValues: T;
};

const useForm = <T extends object>({validationSchema, initialValues}: Props<T>) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(
    // TODO: extract to getInitialErrors util function
    Object.keys(initialValues).reduce((acc, key) => ({...acc, [key]: ''}), initialValues)
  );

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
          setErrors(
            // TODO: extract to the getErrors util function
            Object.keys(errors).reduce(
              (acc, key) => ({
                ...acc,
                [key]: (e as ZodError).errors.find((err) => err.path[0] === key)?.message ?? '',
              }),
              initialValues
            )
          );
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
