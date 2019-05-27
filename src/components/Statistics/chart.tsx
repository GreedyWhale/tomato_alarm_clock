import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import './style.scss';

const StatisticsChart: React.FC<any> = ({classPrefix, dataList, currentDate}) => {
  const [average, setAverage] = useState('0');
  const [growth, setGrowth] = useState('0');

  const [chartData, setChartData] = useState<any>([]);

  useEffect(() => {
    const getOneMonthDays = () => {
      return new Date(dayjs(currentDate).get('year'), dayjs(currentDate).get('month') + 1, 0).getDate()
    }
    const getDatalist = (date: string): any => {
      let result: any[] = [];
      result = dataList.filter((item: any) => {
        if (item.ended_at) {
          return dayjs(item.ended_at).format('YYYY-MM') === date
        }
        if (item.completed_at) {
          return dayjs(item.completed_at).format('YYYY-MM') === date
        }
        return false;
      })
      return result;
    }
    const list = getDatalist(currentDate);

    const previousList = getDatalist(dayjs(currentDate).subtract(1, 'month').format('YYYY-MM'));
    const currentMonthDays = getOneMonthDays();
    const setAverageAndGrowth = () => {
      const newAverage = (list.length / currentMonthDays).toFixed(1);
      if (previousList.length) {
        const newGrowth = ((list.length - previousList.length) / previousList.length).toFixed(1);
        setGrowth(newGrowth)
      } else if (!previousList.length && list.length) {
        setGrowth('1.0')
      } else if (!previousList.length && !list.length) {
        setGrowth('0')
      }
      setAverage(newAverage)
    }

    const formatChartData = () => {
      const chartObj: any = {};
      let newChartData: any[] = [];
      list.forEach((value: any) => {
        const key = dayjs(value.ended_at || value.completed_at).format('MM-DD');
        if(chartObj[key]) {
          chartObj[key].nums += 1
        } else {
          chartObj[key] = {};
          chartObj[key].date = key;
          chartObj[key].nums = 1;
        }
      })
      newChartData = Array.from({length: currentMonthDays}, (v, i) => {
        const key = dayjs(`${currentDate}-${i + 1}`).format('MM-DD');
        if (chartObj[key]) {
          return chartObj[key]
        }
        return {nums: 0, date: key}
      })
      setChartData(newChartData)
    }
    setAverageAndGrowth()
    formatChartData()
  }, [dataList, currentDate])

  const formatGrowth = (growth: string): any => {
    if (parseFloat(growth) > 0) {
      return {
        dataset: 'increment',
        text: `+${growth}`
      }
    }
    if (parseFloat(growth) < 0) {
      return {
        dataset: 'decrement',
        text: growth
      }
    }
    return {
      dataset: '',
      text: growth
    }
  }
  const cols = {
    nums: {
      alias: '数量' 
    },
    date: {
      alias: '日期' 
    }
  };
  return (
    <div className={`${classPrefix}-chart`}>
      <div className={`${classPrefix}-chart_header`}>
        <div className={`${classPrefix}-chart_header-item`}>
          <span>{dataList.length}</span>
          总数
        </div>
        <div className={`${classPrefix}-chart_header-item`}>
          <span>{average}</span>
          日平均数
        </div>
        <div className={`${classPrefix}-chart_header-item`}>
          <span data-type={formatGrowth(growth).dataset}>{formatGrowth(growth).text}</span>
          月增长量
        </div>
      </div>
      <div className={`${classPrefix}-chart_body`}>
        <Chart height={500} data={chartData} scale={cols} forceFit padding='auto'>
          <Axis name="date" label={{textStyle: {fill: '#fff'}}} />
          <Axis name="nums" label={{textStyle: {fill: '#fff'}}} />
          <Tooltip crosshairs={{ type: "y" }} />
          <Geom
            type="line"
            position="date*nums"
            style={{ stroke: "#49effd", lineWidth: 2}}
          />
          <Geom
            type="point"
            position="date*nums"
            size={4}
            shape={"circle"}
            style={{ stroke: "#fff", lineWidth: 1}}
          />
        </Chart>
      </div>
    </div>
  )
}

export default StatisticsChart