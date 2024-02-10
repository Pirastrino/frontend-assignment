import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ZodError} from 'zod';

import {taskData} from '../validations';
import {addTask, getTask, updateTask} from '../store';
import {Task, TaskFormData} from '../types';

const initialTaskData = {
  name: '',
  description: '',
};

const useTaskData = (id?: Task['id']) => {
  const navigate = useNavigate();
  const task = getTask(id);
  const [formData, setFormData] = useState<TaskFormData>({
    name: task?.name ?? '',
    description: task?.description ?? '',
  });
  const [errors, setErrors] = useState<TaskFormData>(initialTaskData);

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const {name, value} = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: (type: 'add' | 'update') => React.FormEventHandler<HTMLFormElement> =
    (type: 'add' | 'update') => (e) => {
      e.preventDefault();

      try {
        taskData.parse(formData);

        if (type === 'add') {
          addTask({
            id: new Date().getTime(),
            name: formData.name,
            description: formData.description ?? '',
            completed: false,
          });
        }

        if (id && type === 'update') {
          updateTask(id, {
            id,
            name: formData.name,
            description: formData.description ?? '',
            completed: getTask(id)?.completed ?? false,
          });
        }

        setFormData(initialTaskData);
        setErrors(initialTaskData);
        navigate('/overview');
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
