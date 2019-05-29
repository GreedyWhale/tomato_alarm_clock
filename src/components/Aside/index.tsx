import React from 'react';
import './style.scss';
import logo from '../../assets/image/logo.svg';

interface IProps {
  username: string;
  logOut: () => void;
  navList: any[];
  currentPage: string;
  upDateCurrentPage: (type: string) => void
}

const Aside: React.FC<IProps> = ({username, logOut, navList, currentPage, upDateCurrentPage}) => {
  const classPrefix = 'aside';

  return (
    <aside className={`${classPrefix}-aside`}>
      <div>
        <img src={logo} alt="logo" className={`${classPrefix}-logo`}/>
        <p className={`${classPrefix}-username`}>{username}</p>
      </div>
      
      <div className={`${classPrefix}-menu`}>
        {navList.length && (navList.map((nav: any) => (
          <div
            key={nav.key}
            className={`${classPrefix}-menu_item`}
            data-active={nav.key === currentPage}
            onClick={() => upDateCurrentPage(nav.key)}>
            {nav.title}
          </div>
        )))}
      </div>
      <p className={`${classPrefix}-logout`} onClick={logOut}>Log out</p>
    </aside>
  )
}

export default Aside;
