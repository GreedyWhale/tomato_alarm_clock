import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import './style.scss';
import Aside from '../../components/Aside/index';
import AddTask from '../../components/AddTask/index';
import ajax from '../../methods/ajax/index';
import { TOMATO_ALARM_CLOCK_X_TOKEN } from '../../methods/constant/index';
import { UpdateTaskList } from './types/home.d';


const Home: React.FC<RouteComponentProps> = ({history}) => {
  const [taskId, setTaskId] = useState<null | number>(null);
  const [username, setUsername] = useState('');
  const [taskList, setTaskList] = useState<any[]>([]);
  const [finishedTaskList, setFinishedTaskList] = useState<any[]>([]);
  const [deletedTaskList, setDeletedTaskList] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await ajax.get('https://gp-server.hunger-valley.com/me')
        setUsername(userInfo.data.account)
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskList = await ajax.get('https://gp-server.hunger-valley.com/todos')
        taskClassification(taskList.data.resources)
      } catch (error) {
      }
    };
    fetchData();
  }, [taskId]);

  const logOut = () => {
    localStorage.removeItem(TOMATO_ALARM_CLOCK_X_TOKEN)
    history.replace('/login')
  }
  const postTode = (description: string) => {
    ajax.post('https://gp-server.hunger-valley.com/todos', {description})
      .then(res => {
        const newTaskList: any[] = [res.data.resource].concat(taskList)
        setTaskList(newTaskList)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const taskClassification = (taskList: any) => {
    const unfinished: any[] = [];
    const finished: any[] = [];
    const deleted: any[] = [];
    if (taskList.length) {
      taskList.forEach((task: any) => {
        if (task.completed) {
          finished.push(task)
        } else if (task.deleted) {
          deleted.push(task)
        } else {
          unfinished.push(task)
        }
      })
      setTaskList(unfinished)
      setFinishedTaskList(finished)
      setDeletedTaskList(deleted)
    }
  }

  const updateTaskList: UpdateTaskList = (id: number, params: any) => {
    ajax.put(`/todos/${id}`, params)
      .then(res => {
        setTaskId(res.data.resource.id)
      })
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
          <AddTask postTode={postTode} taskList={taskList} updateTaskList={updateTaskList} />
          <div style={style}></div>
        </div>
      </main>
    </section>
  )
}

export default Home;