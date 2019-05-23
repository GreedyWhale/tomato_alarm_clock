import React, { useState, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import { Input } from 'antd';
import './style.scss';
import { addTask } from '../../redux/actions/index';
import ajax from '../../methods/ajax/index';
interface IProps {
  addTask: (task: any[]) => any;
}
const AddTask: React.FC<IProps> = ({addTask}) => {
  const [description, setDescription] = useState('');

  const postTode = (description: string) => {
    ajax.post('https://gp-server.hunger-valley.com/todos', {description})
      .then(res => {
        addTask(res.data.resource)
      })
      .catch(error => {
        console.log(error)
      })
  }
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
    <div>
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
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  addTask: (task: any[]) => dispatch(addTask(task))
})

export default connect(null, mapDispatchToProps)(AddTask)

