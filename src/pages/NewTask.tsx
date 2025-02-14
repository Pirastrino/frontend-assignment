import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useStore} from '@nanostores/react';

import {FormTask, Layout} from '../components';
import {taskData} from '../validations';
import {useForm} from '../hooks';
import {$user, addTask} from '../stores';

const NewTask: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const user = useStore($user);
  const {values, errors, handleChange, handleSubmit, reset} = useForm({
    validationSchema: taskData,
    initialValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (formData: typeof values) => {
    const userId = user?.id;

    if (userId) {
      addTask({
        id: new Date().getTime(),
        userId,
        name: formData.name,
        description: formData.description ?? '',
        completed: false,
      });
    }
    navigate('/overview');
  };

  return (
    <Layout>
      <FormTask
        title={t('formTask.title')}
        submitLabel={t('formTask.btn.addTask')}
        discardLabel={t('formTask.btn.discard')}
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit(onSubmit)}
        onReset={reset}
      />
    </Layout>
  );
};

export default NewTask;
