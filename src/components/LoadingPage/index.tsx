import React from 'react';
import { Icon } from 'antd';
import './style.scss';


const LoadingPage: React.FC = () => {
  const classPrefix = 'loading'
  return (
    <div className={`${classPrefix}-container`}>
      <Icon type="loading" style={{
        color: '#fff',
        fontSize: '50px'
      }}/>
    </div>
  )
}

export default LoadingPage;