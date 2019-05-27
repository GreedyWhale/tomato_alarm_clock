import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Tabs, DatePicker } from 'antd';
import './style.scss';
import StatisticsChart from './chart';
import { IState } from '../../pages/Home/types/home.d';
import moment from 'moment';
import dayjs from 'dayjs'

const { MonthPicker } = DatePicker;
const TabPane = Tabs.TabPane;


const Statistics: React.FC<any> = ({tomatoList, taskList}) => {
  
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM'));



  const operations = <MonthPicker
    format="YYYY-MM" value={moment(currentDate)}
    onChange={(e, dateString) => {setCurrentDate(dateString || dayjs().format('YYYY-MM'))}}/>
  const classPrefix = 'statistics';
  return (
    <div className={`${classPrefix}-container`}>
      <Tabs tabBarExtraContent={operations} type='card'>
        <TabPane tab="番茄统计" key="1">
          <StatisticsChart
            classPrefix={classPrefix} dataList={tomatoList}
            currentDate={currentDate} />
        </TabPane>
        <TabPane tab="任务统计" key="2">
        <StatisticsChart
          classPrefix={classPrefix} dataList={taskList}
          currentDate={currentDate} />
        </TabPane>
      </Tabs>
    </div>
  )
}

const mapStateToProps = (state: IState) => ({
  tomatoList: state.tomatos,
  taskList: state.tasks
})
export default connect(mapStateToProps)(Statistics)