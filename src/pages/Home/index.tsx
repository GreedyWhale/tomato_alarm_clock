import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import './style.scss';
import Aside from '../../components/Aside/index';
import ajax from '../../methods/ajax/index';
import { TOMATO_ALARM_CLOCK_X_TOKEN } from '../../methods/constant/index';


const Home: React.FC<RouteComponentProps> = ({history}) => {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ajax.get('https://gp-server.hunger-valley.com/me');
        setUsername(result.data.account)
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    localStorage.removeItem(TOMATO_ALARM_CLOCK_X_TOKEN)
    history.replace('/login')
  }
  const classPrefix = 'home';
  return (
    <section className={`${classPrefix}-container`}>
      <Aside username={username} logOut={logOut} />
      <main className={`${classPrefix}-main`}>main</main>
    </section>
  )
}

export default Home;