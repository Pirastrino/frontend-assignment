import {useParams} from 'react-router-dom';
import {Layout} from '../components';

const TaskForm = () => {
  const {id} = useParams();

  return <Layout>TaskForm: {id}</Layout>;
};

export default TaskForm;
