import {useParams} from 'react-router-dom';

const TaskForm = () => {
  const {id} = useParams();

  return <div>TaskForm: {id}</div>;
};

export default TaskForm;
