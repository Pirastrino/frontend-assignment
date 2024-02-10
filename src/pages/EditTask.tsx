import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useTaskData} from '../hooks';

import {FormTask, Layout} from '../components';

const EditTask: React.FC = () => {
  const {t} = useTranslation();
  const {id = 'N/A'} = useParams();

  const {formData, errors, handleChange, handleSubmit, handleReset} = useTaskData(parseInt(id));

  return (
    <Layout>
      <FormTask
        title={`Edit task: ${id}`} //  TODO: replace with the actual task title
        submitLabel={t('formTask.editTask')}
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

export default EditTask;
