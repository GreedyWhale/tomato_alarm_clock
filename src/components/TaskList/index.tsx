import React, { useState } from 'react';
import { Radio, Icon, Input } from 'antd';
import './style.scss';
import { UpdateTaskList } from '../../pages/Home/types/home.d';

interface IProps {
  taskList: any[];
  updateTaskList: UpdateTaskList
}
const TaskList: React.FC<IProps> = ({taskList, updateTaskList}) => {
  
  const [editStatus, setEditStatus] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [currentValue, setCurrentValue] = useState('')

  const updateEditStatus = (index: number) => {
    const newEditStatus: any[] = JSON.parse(JSON.stringify(editStatus))
    if (currentIndex !== null && currentIndex !== index) {
      newEditStatus[currentIndex] = false
    }
    newEditStatus[index] = !newEditStatus[index]
    setEditStatus(newEditStatus)
    setCurrentIndex(index)
  }

  const changeTaskDescription = (id: number, type: string = '') => {
    if (type === 'delete') {
      updateTaskList(id, {deleted: true})
    } else if (currentValue) {
      updateTaskList(id, {description: currentValue})
    }
    if (currentIndex !== null) {
      updateEditStatus(currentIndex)
    }
    setCurrentValue('')
  }
  const classPrefix = 'task-list';
  return (
    <ul className={`${classPrefix}_container`}>
      {taskList.map((task, index) => (
        <li className={`${classPrefix}_item`} key={task.id}>
          <Radio className={`${classPrefix}_item-content`} onChange={
            () => updateTaskList(task.id, {completed: true, completed_at: new Date()})
          }>
            <Input
              onChange={((e) => setCurrentValue(e.target.value))}
              onPressEnter={() => changeTaskDescription(task.id)}
              defaultValue={task.description} disabled={!editStatus[index]}
              className={`${classPrefix}_item-content-input`}
              data-edit={Boolean(editStatus[index])}
              suffix={editStatus[index] ? (
                <Icon type="enter" onClick={(e) => {
                  e.preventDefault(); changeTaskDescription(task.id);
                }}/>
              ) : <span />} />
          </Radio>
          <div className={`${classPrefix}_item-btns`}>
            <Icon type="play-circle" />
            <Icon type="edit" onClick={() => updateEditStatus(index)} />
            <Icon type="delete" onClick={() => changeTaskDescription(task.id, 'delete')}/>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TaskList

