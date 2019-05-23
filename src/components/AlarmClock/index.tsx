import React from 'react';
import './style.scss';
import CircularProgress from '../CircularProgress/index';


const AlarmClock: React.FC = () => {
  const classPrefix = 'alarm-clock';
  return (
    <div className={`${classPrefix}_container`}>
      <div className={`${classPrefix}_header`}>
        开始番茄
      </div>
      <div>
        <CircularProgress />
      </div>
    </div>
  )
}
export default AlarmClock;