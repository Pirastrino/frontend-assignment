import {useState} from 'react';
import {ZodError} from 'zod';

import {taskData, TaskData as FormData} from '../components/FormTask';

const initialTaskData = {
  name: '',
  description: '',
};

// TODO: get task data from the local storage
const getTask = (id?: number) => (id ? initialTaskData : initialTaskData);

const useTaskData = (id?: number) => {
  const initialTaskData = getTask(id);
  const [formData, setFormData] = useState<FormData>(initialTaskData);
  const [errors, setErrors] = useState<FormData>(initialTaskData);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const {name, value} = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    try {
      setErrors(initialTaskData);
      taskData.parse(formData);

      // TODO: save data to the local storage and redirect to the overview page
      console.log('Submited data:', formData);
    } catch (err) {
      if (err instanceof ZodError) {
        // TODO: extract to the getErrors util function
        setErrors({
          name: err.errors.find((e) => e.path[0] === 'name')?.message ?? '',
          description: err.errors.find((e) => e.path[0] === 'description')?.message ?? '',
        });
      }
    }
  };

  const handleReset = () => {
    setFormData(initialTaskData);
    setErrors(initialTaskData);
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleReset,
  };
};

export default useTaskData;
