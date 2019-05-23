import React from 'react';
import './style.scss';
import AddTask from '../AddTask/index';
import TaskList from '../TaskList/index';


const Tasks: React.FC = () => {
  const classPrefix = 'tasks';
  return (
    <div className={`${classPrefix}-container`}>
      <AddTask />
      <TaskList />
    </div>
  )
}
export default Tasks;