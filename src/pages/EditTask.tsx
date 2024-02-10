import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useTaskData} from '../hooks';

import {getTask} from '../store';
import {FormTask, Layout} from '../components';
import {MISSING_TEXT} from '../constants';

const EditTask: React.FC = () => {
  const {t} = useTranslation();
  const {id = 'N/A'} = useParams(); // TODO: 404 page

  const {formData, errors, handleChange, handleSubmit, handleReset} = useTaskData(parseInt(id));

  return (
    <Layout>
      <FormTask
        title={getTask(parseInt(id))?.name ?? MISSING_TEXT}
        submitLabel={t('formTask.btn.editTask')}
        discardLabel={t('formTask.btn.discard')}
        values={formData}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit('update')}
        onReset={handleReset}
      />
    </Layout>
  );
};

export default EditTask;
