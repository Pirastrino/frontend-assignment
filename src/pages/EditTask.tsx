import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import {FormTask, Layout} from '../components';
import {MISSING_TEXT} from '../constants';
import {taskData} from '../validations';
import {useForm} from '../hooks';
import {getTask, updateTask} from '../stores';

const EditTask: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {id = 'N/A'} = useParams(); // TODO: 404 page

  const task = getTask(parseInt(id));

  const {values, errors, handleChange, handleSubmit, reset} = useForm({
    validationSchema: taskData,
    initialValues: {
      name: task?.name ?? '',
      description: task?.description ?? '',
    },
  });

  const onSubmit = async (formData: typeof values) => {
    const id = task?.id;

    if (id) {
      updateTask(id, {
        id,
        name: formData.name,
        description: formData.description ?? '',
        completed: task?.completed ?? false,
      });
      navigate('/overview');
    }
  };

  return (
    <Layout>
      <FormTask
        title={task?.name ?? MISSING_TEXT}
        submitLabel={t('formTask.btn.editTask')}
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

export default EditTask;
