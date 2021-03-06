import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import './style.scss';
import Aside from '../../components/Aside/index';
import Tasks from '../../components/Tasks/index';
import AlarmClock from '../../components/AlarmClock/index';
import Statistics from '../../components/Statistics/index';
import TomatosHistory from '../../components/TomatosHistory/index';
import TasksHistory from '../../components/TasksHistory/index';
import ajax from '../../methods/ajax/index';
import { TOMATO_ALARM_CLOCK_X_TOKEN } from '../../methods/constant/index';
import { initTaskList, initTomatoList } from '../../redux/actions/index';


const Home: React.FC<RouteComponentProps | any> = ({history, initTasks, initTomatos}) => {
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState('home');
  const navList = [
    {key: 'home', title: '主页'},
    {key: 'statistics', title: '统计'},
    {key: 'tomatosHistory', title: '番茄历史'},
    {key: 'tasksHistory', title: '任务历史'},
  ]
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
      initTasks([])
    }
  }, [initTomatos, initTasks]);
  const logOut = () => {
    localStorage.removeItem(TOMATO_ALARM_CLOCK_X_TOKEN)
    history.replace('/login')
  }
  const classPrefix = 'home';
  return (
    <section className={`${classPrefix}-container`}>
      <Aside
        username={username} navList={navList} logOut={logOut} currentPage={currentPage}
        upDateCurrentPage={setCurrentPage} />
      <main className={`${classPrefix}-main`} data-active={currentPage === 'home'}>
        <div className={`${classPrefix}-main_box`}><AlarmClock /></div>
        <div className={`${classPrefix}-main_box`}><Tasks /></div>
      </main>
      <main className={`${classPrefix}-main`} data-active={currentPage === 'statistics'}>
        <Statistics />
      </main>
      <main className={`${classPrefix}-main`} data-active={currentPage === 'tomatosHistory'}>
        <TomatosHistory />
      </main>
      <main className={`${classPrefix}-main`} data-active={currentPage === 'tasksHistory'}>
        <TasksHistory />
      </main>
    </section>
  )
}

const mapDispatchToProps = (dispatch: any) => ({
  initTasks: (taskList: any[]) => dispatch(initTaskList(taskList)),
  initTomatos: (tomatoList: any[]) => dispatch(initTomatoList(tomatoList))
})
export default connect(null, mapDispatchToProps)(Home);