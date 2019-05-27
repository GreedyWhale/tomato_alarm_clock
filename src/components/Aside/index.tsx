import React from 'react';
import './style.scss';
import logo from '../../assets/image/logo.svg';

interface IProps {
  username: string;
  logOut: () => void;
}

const Aside: React.FC<IProps> = ({username, logOut}) => {
  const classPrefix = 'aside';

  return (
    <aside className={`${classPrefix}-aside`}>
      <div>
        <img src={logo} alt="logo" className={`${classPrefix}-logo`}/>
        <p className={`${classPrefix}-username`}>{username}</p>
      </div>
      
      <div className={`${classPrefix}-menu`}>
        <div className={`${classPrefix}-menu_item`}>
          主页
        </div>

        <div className={`${classPrefix}-menu_item`}>
          统计
        </div>
      </div>
      <p className={`${classPrefix}-logout`} onClick={logOut}>Log out</p>
    </aside>
  )
}

export default Aside;
