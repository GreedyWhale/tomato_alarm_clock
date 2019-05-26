import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Radio, Icon, Input } from 'antd';
import './style.scss';
import noRecord from '../../assets/image/no_record.svg';
import { IState } from '../../pages/Home/types/home.d';
import { updateTask as reduxUpdateTask } from '../../redux/actions/index';
import ajax from '../../methods/ajax/index';

interface IProps {
  taskList: any[];
  updateTask: (task: any[]) => any;
}
const TaskList: React.FC<IProps> = ({taskList, updateTask}) => {
  
  const [editStatus, setEditStatus] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState<number | null>(null)
  const [currentValue, setCurrentValue] = useState('')

  const [unfinishedTasks, setUnfinishedTasks] = useState<any[]>([]);

  useEffect(() => {
    if (taskList.length) {
      const unfinished: any[] = taskList.filter(task => !task.completed && !task.deleted);
      setUnfinishedTasks(unfinished)
    }
  }, [taskList])

  const updateEditStatus = (index: number) => {
    const newEditStatus: any[] = JSON.parse(JSON.stringify(editStatus))
    if (currentIndex !== null && currentIndex !== index) {
      newEditStatus[currentIndex] = false
    }
    newEditStatus[index] = !newEditStatus[index]
    setEditStatus(newEditStatus)
    setCurrentIndex(index)
  }

  interface IParams {
    deleted?: boolean;
    description?: string;
    completed?: boolean;
    completed_at?: Date;
  }
  const changeTask = (id: number, params: IParams = {}) => {
    ajax.put(`/todos/${id}`, params)
      .then(res => {
        updateTask(res.data.resource)
      })
    if (currentIndex !== null && editStatus[currentIndex]) {
      updateEditStatus(currentIndex)
    }
    setCurrentValue('')
  }
  const classPrefix = 'task-list';
  return (
    <div className={`${classPrefix}_task-list`}>
      {unfinishedTasks.length ? (
        <ul className={`${classPrefix}_container`}>
          {unfinishedTasks.map((task, index) => (
            <li className={`${classPrefix}_item`} key={task.id}>
              <Radio
                className={`${classPrefix}_item-content`}
                onChange={ () => changeTask(task.id, {completed: true, completed_at: new Date()})}
              >
                <Input
                  onChange={((e) => setCurrentValue(e.target.value))}
                  onPressEnter={() => changeTask(task.id, {description: currentValue})}
                  defaultValue={task.description} disabled={!editStatus[index]}
                  className={`${classPrefix}_item-content-input`}
                  data-edit={Boolean(editStatus[index])}
                  suffix={editStatus[index] ? (
                    <Icon type="enter" onClick={(e) => {
                      e.preventDefault(); changeTask(task.id, {description: currentValue});
                    }}/>
                  ) : <span />} />
              </Radio>
              <div className={`${classPrefix}_item-btns`}>
                <Icon type="edit" onClick={() => updateEditStatus(index)} />
                <Icon type="delete" onClick={() => changeTask(task.id, {deleted: true})}/>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <React.Fragment>
          <img src={noRecord} alt="无记录" className={`${classPrefix}_norecord`} />
          <p className={`${classPrefix}_norecord-tips`}>暂无任务</p>
        </React.Fragment>
      )}
    </div>
  )
}


const mapStateToProps = (state: IState) => ({ taskList: state.tasks })
const mapDispatchToProps = (dispatch: any) => ({
  updateTask: (task: any[]) => dispatch(reduxUpdateTask(task))
})


export default connect(mapStateToProps, mapDispatchToProps)(TaskList)

