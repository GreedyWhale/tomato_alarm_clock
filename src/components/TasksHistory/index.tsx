import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Tabs } from 'antd';
import dayjs from 'dayjs';
import { IState } from '../../pages/Home/types/home';
import HistoryList from '../HistoryList/index';
import { updateTask as reduxUpdateTask } from '../../redux/actions/task';
import './style.scss';
import ajax from '../../methods/ajax';

const TabPane = Tabs.TabPane;
const TaskHistory: React.FC<any> = ({ taskList, updateTask }) => {
  const [finishedTasks, setFinishedTasks] = useState<any[]>([]);
  const [deletedTasks, setDeletedTasks] = useState<any[]>([]);
  const [finishedTotal, setFinishedTotal] = useState(0);
  const [deletedTotal, setDeletedTotal] = useState(0);
  const [currentKey, setCurrentKey] = useState('finishedTasks');

  useEffect(() => {
    let finished: object = {};
    let deleted: object = {};
    const formatTomatos = (list: any[]) => {
      let result: any = {};
      list.forEach((item: any) => {
        const key = dayjs(item.completed_at || item.updated_at).format('YYYY/MM/DD')
        if (result[key]) {
          result[key].subList.push(item)
        } else {
          result[key] = {
            date: key,
            dateStr: dayjs(key).format('YYYY年MM月DD日'),
            subList: [item]
          }
        }
      })
      return result
    }
    const classified = () => {
      let finishedList: any[] = [];
      let deletedList: any[] = [];
      taskList.forEach((task: any) => {
        if (task.completed) {
          finishedList.push(task);
        }
        if (task.deleted) {
          deletedList.push(task);
        }
      })
      setFinishedTotal(finishedList.length)
      setDeletedTotal(deletedList.length)
      finished = formatTomatos(finishedList);
      deleted = formatTomatos(deletedList);
    }
    const sortTomatos = (data: any) => {
      let keys = Object.keys(data);
      keys.sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime())
      return keys.map((value: any) => data[value])
    }
    classified()
    setFinishedTasks(sortTomatos(finished))
    setDeletedTasks(sortTomatos(deleted))
    console.log(sortTomatos(finished), sortTomatos(deleted))
  }, [taskList])

  const modifyTask = (id: number, params: any) => {
    ajax.put(`/todos/${id}`, params)
      .then(res => {
        updateTask(res.data.resource)
      })
  }
  const classPrefix = 'tasks-history';
  return (
    <div className={`${classPrefix}_container`}>
      <Tabs type='card' onChange={(e) => {setCurrentKey(e)}}>
        <TabPane tab="已完成的任务" key="finishedTasks">
          <HistoryList list={finishedTasks} updateMethod={modifyTask} type="finishedTasks" />
        </TabPane>
        <TabPane tab="已删除的任务" key="deletedTasks">
          <HistoryList list={deletedTasks} updateMethod={modifyTask} type=""/>
        </TabPane>
      </Tabs>
      {(finishedTotal || deletedTotal )&& (
        <p className={`${classPrefix}_total`}>
          总计：
          {currentKey === 'finishedTasks' ? finishedTotal : deletedTotal}
          个任务
        </p>
      )}
    </div>
  )
}

const mapStateToProps = (state: IState) => ({
  taskList: state.tasks
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTask: (task: any) => dispatch(reduxUpdateTask(task)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TaskHistory)
