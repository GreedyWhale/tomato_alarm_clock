import React, { useState, KeyboardEvent } from 'react';
import { Icon } from 'antd';
import { Input } from 'antd';
import './style.scss';
import noRecord from '../../assets/image/no_record.svg';
import TaskList from '../TaskList/index';
import { UpdateTaskList } from '../../pages/Home/types/home.d';


interface IProps {
  postTode: (description: string) => void;
  taskList: any[];
  updateTaskList: UpdateTaskList;
}
const AddTask: React.FC<IProps> = ({postTode, taskList, updateTaskList}) => {
  const [description, setDescription] = useState('');

  const onKeyUp = (e: KeyboardEvent) => {
    e.persist()
    if (e.keyCode === 13 && description !== '') {
      postTode(description)
      setDescription('')
    }
  }

  const classPrefix = 'add-task';
  const suffix = <Icon
    type="enter"
    className={`${classPrefix}_input-icon`}
    onClick={() => {if (description) { postTode(description); setDescription('');}}}/>

  return (
    <div className={`${classPrefix}_container`}>
      <div className={`${classPrefix}_top`}>
        <div className={`${classPrefix}_header`}>
          <h4 className={`${classPrefix}_title`}>添加任务</h4>
          <Icon type="plus-square" />
        </div>
        <Input
          className={`${classPrefix}_input`}
          value={description}
          onChange={(e) => {setDescription(e.target.value)}}
          onKeyUp={onKeyUp}
          placeholder="添加新任务"
          suffix={suffix}/>
        <div className={`${classPrefix}_tasks`}>
          <h4 className={`${classPrefix}_title`}>任务列表</h4>
          <Icon type="unordered-list" />
        </div>
      </div>
      <div className={`${classPrefix}_task-list`}>
        {taskList.length ? (
          <TaskList taskList={taskList} updateTaskList={updateTaskList} />
        ) : (
          <img src={noRecord} alt="无记录" className={`${classPrefix}_norecord`} />
        )}
      </div>
    </div>
  )
}

export default AddTask

