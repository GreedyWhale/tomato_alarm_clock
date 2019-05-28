import React from 'react';
import noRecord from '../../assets/image/no_record.svg';
import './style.scss';

const DefaultPage: React.FC = () => {
  const classPrefix = 'default-page'
  return (
    <div className={`${classPrefix}_container`}>
      <img src={noRecord} alt="无记录" className={`${classPrefix}_norecord`} />
      <p className={`${classPrefix}_norecord-tips`}>暂无记录</p>
    </div>
  )
}

export default DefaultPage