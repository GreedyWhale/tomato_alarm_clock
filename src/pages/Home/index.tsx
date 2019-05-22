import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import './style.scss';
import Aside from '../../components/Aside/index';
import AddTask from '../../components/AddTask/index';
import ajax from '../../methods/ajax/index';
import { TOMATO_ALARM_CLOCK_X_TOKEN } from '../../methods/constant/index';
import { IState } from './types/home.d';
import { initTaskList } from '../../redux/actions/index';


const Home: React.FC<RouteComponentProps | any> = ({history, initTasks}) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Promise.all([
          ajax.get('https://gp-server.hunger-valley.com/me'),
          ajax.get('https://gp-server.hunger-valley.com/todos')
        ])
        setUsername(result[0].data.account)
        initTasks(result[1].data.resources)
      } catch (error) {
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const logOut = () => {
    localStorage.removeItem(TOMATO_ALARM_CLOCK_X_TOKEN)
    history.replace('/login')
  }
  const classPrefix = 'home';
  const style: React.CSSProperties = {
    flex: 1
  };
  return (
    <section className={`${classPrefix}-container`}>
      <Aside username={username} logOut={logOut} />
      <main className={`${classPrefix}-main`}>
        <div className={`${classPrefix}-main_box`}></div>
        <div className={`${classPrefix}-main_box`}>
          <AddTask />
          <div style={style}></div>
        </div>
      </main>
    </section>
  )
}

const mapStateToProps = (state: IState) => ({ taskList: state.tasks })
const mapDispatchToProps = (dispatch: any) => ({
  initTasks: (taskList: any[]) => dispatch(initTaskList(taskList))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home);