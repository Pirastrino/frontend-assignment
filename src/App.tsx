import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import {NewTask, Login, OverView, EditTask} from './pages';

const App = () => (
  <Router>
    <Routes>
      {/* implement auth */}
      <Route path="/" element={<Navigate to="/login" replace={true} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/overview" element={<OverView />} />
      <Route path="/new_task" element={<NewTask />} />
      <Route path="/task/:id" element={<EditTask />} />
    </Routes>
  </Router>
);

export default App;
