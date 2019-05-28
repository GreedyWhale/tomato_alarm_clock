import React, { useEffect, useState } from 'react';
import './style.scss';
import HistoryItem from '../HistoryItem/index';
import DefaultPage from '../DefaultPage/index';

interface IProps {
  list: any[];
  updateMethod: (id: number, params: any) => void;
  type: string;
}
const HistoryList: React.FC<IProps> = ({list, updateMethod, type}) => {
  const [config, setConfig] = useState<any>({})

  const getWeek = (dateStr: string): string => {
    const cnWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const index = new Date(dateStr).getDay()
    return cnWeek[index]
  }
  const formatTime = (list: any[]): string => {
    let ms = 0;
    let hours = 0;
    let minutes = 0;
    list.forEach((tomato: any) => {
      const { duration } = tomato;
      ms += duration || 0
    })
    minutes = (ms / (1000*60));
    hours = minutes / 60;
    return `${Math.floor(hours)} 小时 ${Math.floor(minutes % 60)} 分钟`
  }

  useEffect(() => {
    if (type === 'finishedTomato') {
      setConfig({
        visibleTotal: true,
        unit: '番茄',
        visibleTotalTime: true
      })
    } else if (type === 'finishedTasks') {
      setConfig({
        visibleTotal: true,
        unit: '任务',
        visibleTotalTime: false
      })
    }
  }, [type])
  const classPrefix = 'history';
  
  return (
    <div className={`${classPrefix}-container`}>
      {list.length && list.map((item: any) => (
        <div key={item.date} className={`${classPrefix}-content`}>
          <div>
            <div className={`${classPrefix}-date`}>
              <p className={`${classPrefix}-text`}>{item.dateStr}</p>
              <p className={`${classPrefix}-text`}>{getWeek(item.date)}</p>
            </div>
            {config.visibleTotal && (<p className={`${classPrefix}-text`}>
              共完成了<span className={`${classPrefix}-strong_text`}>{item.subList.length}</span>个{config.unit}
            </p>)}
            {config.visibleTotalTime && <p className={`${classPrefix}-text`}>总计&nbsp;{formatTime(item.subList)}</p>}
          </div>
          <ul className={`${classPrefix}-list`}>
            {item.subList.length && item.subList.map((subItem: any) => (
              <HistoryItem item={subItem} key={subItem.id} updateMethod={updateMethod} />
            ))}
          </ul>
        </div>
      ))}
      {!list.length && <DefaultPage />}
    </div>
  )
}

export default HistoryList