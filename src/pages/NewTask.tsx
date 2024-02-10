import {useTranslation} from 'react-i18next';
import {useTaskData} from '../hooks';

import {FormTask, Layout} from '../components';

const NewTask: React.FC = () => {
  const {t} = useTranslation();
  const {formData, errors, handleChange, handleSubmit, handleReset} = useTaskData();

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
