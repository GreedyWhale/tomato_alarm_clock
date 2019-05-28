import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Tabs, Icon, Modal, DatePicker, Input, message } from 'antd';
import dayjs from 'dayjs'
import './style.scss';
import { IState } from '../../pages/Home/types/home';
import HistoryList from '../HistoryList/index';
import ajax from '../../methods/ajax/index';
import { updateTomato as reduxUpdateTomato, addTomato as reduxAddTomato } from '../../redux/actions/tomato';



const TabPane = Tabs.TabPane;
const TomatosHistory: React.FC<any> = ({tomatoList, updateTomato, addTomato}) => {
  const [finishedTomatos, setFinishedTomatos] = useState<any[]>([]);
  const [abortedTomatos, setAbortedTomatos] = useState<any[]>([]);
  const [finishedTotal, setFinishedTotal] = useState(0);
  const [abortedTotal, setAbortedTotal] = useState(0);
  const [currentKey, setCurrentKey] = useState('finishedTomatos');
  const [startValue, setStartValue] = useState<any>(null);
  const [endValue, setEndValue] = useState<any>(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [describe, setDescribe] = useState('');

  const modifyTomato = (id: number, params: any) => {
    ajax.put(`/tomatoes/${id}`, params)
      .then(res => {
        updateTomato(res.data.resource)
      })
  }

  const disabledStartDate = (startValue: any) => {
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = (endValue: any) => {
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const clearAddTomatoRecord = () => {
    setStartValue(null)
    setEndValue(null)
    setVisibleModal(false)
    setDescribe('')
  }
  const canSubmit = (): boolean => {
    if (!startValue) {
      message.error('请选择开始时间');
      return false;
    }
    if (!endValue) {
      message.error('请选择结束时间');
      return false;
    }
    if (!describe) {
      message.error('请填写关于补记番茄的描述');
      return false;
    }
    return true
  }
  const supplementaryTomatoRecord = () => {
    if (canSubmit()) {
      ajax.post('/tomatoes', {
        started_at: new Date(startValue.valueOf()),
        ended_at: new Date(endValue.valueOf()),
        duration: endValue.valueOf() - startValue.valueOf(),
        description: describe,
        manually_created: true
      })
        .then(res => {
          addTomato([res.data.resource])
          clearAddTomatoRecord()
        })
    }
  }
  useEffect(() => {
    let finished: object = {};
    let aborted: object = {};
    const formatTomatos = (list: any[]) => {
      let result: any = {};
      list.forEach((item: any) => {
        const key = dayjs(item.ended_at || item.created_at).format('YYYY/MM/DD')
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
      let abortedList: any[] = [];
      tomatoList.forEach((tomato: any) => {
        if (tomato.ended_at) {
          finishedList.push(tomato);
        }
        if (tomato.aborted) {
          abortedList.push(tomato);
        }
      })
      setFinishedTotal(finishedList.length)
      setAbortedTotal(abortedList.length)
      finished = formatTomatos(finishedList);
      aborted = formatTomatos(abortedList);
    }
    const sortTomatos = (data: any) => {
      let keys = Object.keys(data);
      keys.sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime())
      return keys.map((value: any) => data[value])
    }
    classified()
    setFinishedTomatos(sortTomatos(finished))
    setAbortedTomatos(sortTomatos(aborted))
  }, [tomatoList])

  const operations = (currentKey === 'finishedTomatos' ? (
    <Icon type="plus-square"
      style={{
        fontSize: 24,
        color: '#ffffff',
        cursor: 'pointer'
      }}
      onClick={() => {setVisibleModal(true)}}
    />
  ): <span></span>)
  const classPrefix = 'tomatos-history';
  return (
    <div className={`${classPrefix}_container`}>
      <Tabs type='card' onChange={(e) => {setCurrentKey(e)}} tabBarExtraContent={operations}>
        <TabPane tab="完成的番茄" key="finishedTomatos">
          <HistoryList list={finishedTomatos} updateMethod={modifyTomato} type="finishedTomato" />
        </TabPane>
        <TabPane tab="打断记录" key="abortedTomatos">
          <HistoryList list={abortedTomatos} updateMethod={modifyTomato} type="abortedTomata"/>
        </TabPane>
      </Tabs>
      {(finishedTotal || abortedTotal )&& (
        <p className={`${classPrefix}_total`}>
          总计：
          {currentKey === 'finishedTomatos' ? finishedTotal : abortedTotal}
          个番茄
        </p>
      )}
      <Modal
        visible={visibleModal} title="补记番茄"
        onCancel={clearAddTomatoRecord} onOk={supplementaryTomatoRecord}>
        <div className={`${classPrefix}_modal-item`}>
          <span>开始时间：</span>
          <DatePicker
            disabledDate={disabledStartDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={startValue}
            placeholder="开始时间"
            onChange={(value) => {setStartValue(value)}}
          />
        </div>
        <div className={`${classPrefix}_modal-item`}>
          <span>结束时间：</span>
          <DatePicker
            disabledDate={disabledEndDate}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={endValue}
            placeholder="结束时间"
            onChange={(value) => {setEndValue(value)}}
          />
        </div>
        <div className={`${classPrefix}_modal-item`}>
          <span>描述：</span>
          <Input value={describe} type='text' onChange={(e) => setDescribe(e.target.value)}/>
        </div>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state: IState) => ({
  tomatoList: state.tomatos
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTomato: (tomato: any) => dispatch(reduxUpdateTomato(tomato)),
  addTomato: (tomato: any) => dispatch(reduxAddTomato(tomato)),
})
export default connect(mapStateToProps, mapDispatchToProps)(TomatosHistory);