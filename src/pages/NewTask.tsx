import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ZodError} from 'zod';

import {FormTask, Layout} from '../components';
import {taskData, TaskData as FormData} from '../components/FormTask';

const initialTaskData = {
  name: '',
  description: '',
};

const NewTask: React.FC = () => {
  const {t} = useTranslation();
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

  return (
    <Layout>
      <FormTask
        title={t('formTask.title')}
        submitLabel={t('formTask.addTask')}
        discardLabel={t('formTask.discard')}
        values={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onReset={handleReset}
      />
    </Layout>
  );
};

export default NewTask;
