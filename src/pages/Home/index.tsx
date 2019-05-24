import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import './style.scss';
import Aside from '../../components/Aside/index';
import Tasks from '../../components/Tasks/index';
import AlarmClock from '../../components/AlarmClock/index';
import ajax from '../../methods/ajax/index';
import { TOMATO_ALARM_CLOCK_X_TOKEN } from '../../methods/constant/index';
import { initTaskList, initTomatoList } from '../../redux/actions/index';
import { setTomatoStatus as reduxSetTomatoStatus } from '../../redux/actions/tomatoStatus';


const Home: React.FC<RouteComponentProps | any> = ({history, initTasks, initTomatos, setTomatoStatus}) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Promise.all([
          ajax.get('https://gp-server.hunger-valley.com/me'),
          ajax.get('https://gp-server.hunger-valley.com/todos'),
          ajax.get('https://gp-server.hunger-valley.com/tomatoes'),
        ])
        setUsername(result[0].data.account);
        initTasks(result[1].data.resources);
        initTomatos(result[2].data.resources)
      } catch (error) {
      }
    };
    fetchData();
    return () => {
      initTomatos([])
      setTomatoStatus('')
      initTasks([])
    }
  }, [initTomatos, setTomatoStatus, initTasks]);
  const logOut = () => {
    localStorage.removeItem(TOMATO_ALARM_CLOCK_X_TOKEN)
    history.replace('/login')
  }
  const classPrefix = 'home';
  return (
    <section className={`${classPrefix}-container`}>
      <Aside username={username} logOut={logOut} />
      <main className={`${classPrefix}-main`}>
        <div className={`${classPrefix}-main_box`}>
          <AlarmClock />
        </div>
        <div className={`${classPrefix}-main_box`}>
          <Tasks />
        </div>
      </main>
    </section>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  initTasks: (taskList: any[]) => dispatch(initTaskList(taskList)),
  initTomatos: (tomatoList: any[]) => dispatch(initTomatoList(tomatoList)),
  setTomatoStatus: (status: string) => dispatch(reduxSetTomatoStatus(status)),
})
export default connect(null, mapDispatchToProps)(Home);