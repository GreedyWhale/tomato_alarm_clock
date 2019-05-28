import React, { useState } from 'react';
import { Input } from 'antd';
import dayjs from 'dayjs'
import './style.scss';


const HistoryItem: React.FC<any> = ({item, updateMethod}) => {
  const [disabled, setDisabled] = useState(true);
  const [description, setDescription] = useState('');
  const getTime = (data: any): string => {
    const {started_at, ended_at, created_at, updated_at, completed_at, deleted} = data;
    if(started_at && ended_at) {
      return `${dayjs(started_at).format('HH:mm')} - ${dayjs(ended_at).format('HH:mm')}`
    }
    if(created_at && completed_at) {
      return `${dayjs(created_at).format('HH:mm')} - ${dayjs(completed_at).format('HH:mm')}`
    }
    if(deleted) {
      return `${dayjs(updated_at).format('HH:mm')}`
    }
    return `${dayjs(created_at).format('HH:mm')} - ${dayjs(updated_at).format('HH:mm')}`
  }
  const modifyItem = () => {
    if(disabled) {
      return setDisabled(false)
    }
    updateMethod(item.id, {description})
    setDisabled(true)
    setDescription('')
  }
  const classPrefix = 'history-item';
  return (
    <li key={item.id} className={`${classPrefix}_container`}>
      <div>
        {getTime(item)}
      </div>
      <div className={`${classPrefix}_desc`}>
        <Input
          value={description || item.description} disabled={disabled}
          onChange={(e) => setDescription(e.target.value)}
          />
        {item.manually_created && (<span className={`${classPrefix}_red-text`}>(补)</span>)}
      </div>
      <div className={`${classPrefix}_btn`} onClick={modifyItem}>
        {disabled ? '修改' : '提交'}
      </div>
      {!disabled && (
        <div className={`${classPrefix}_btn`} onClick={() => {setDisabled(true)}}>
          取消
        </div>
      )}
    </li>
  )
}

export default HistoryItem
