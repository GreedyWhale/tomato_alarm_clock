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

      <p className={`${classPrefix}-logout`} onClick={logOut}>Log out</p>
    </aside>
  )
}

export default Aside;
