import React, { useState, useEffect, useRef } from 'react';
import { Modal, Input } from 'antd';
import { connect } from 'react-redux';
import { IState } from '../../pages/Home/types/home.d';
import playIcon from '../../assets/image/play.svg';
import quitIcon from '../../assets/image/quit.svg';
import './style.scss';
import { addTomato as reduxAddTomato, updateTomato as reduxUpdateTomato } from '../../redux/actions/tomato';
import ajax from '../../methods/ajax/index';

const useInterval = (callback: any, delay: number | null) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
     const tick = () => {
      (savedCallback as any).current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
interface IProps {
  tomatoList: any[];
  addTomato: (tomato: any) => void;
  updateTomato: (tomato: any) => void;
}
interface ITomato {
  aborted: null | boolean;
  created_at: string;
  description: string;
  duration: number;
  ended_at: string;
  extra: any;
  id: number;
  manually_created: boolean;
  started_at: string;
  updated_at: string;
  user_id: number;
}

const CircularProgress: React.FC<IProps> = ({
  tomatoList,
  addTomato,
  updateTomato
}) => {
  const totalTime: number = 1500;
  const circleRadius = 120;
  const circleLength = 2 * circleRadius * Math.PI;
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(totalTime);
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');
  const [isRunning, setIsRunning] = useState(false);
  const [currentTomato, setCurrentTomato] = useState<ITomato | null>(null);
  const [visibleGiveUpModal, setVisibleGiveUpModal] = useState(false);
  const [visibleFinishedModal, setVisibleFinishedModal] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [giveUpReason, setGiveUpReason] = useState('');
  const [stepSize, setStepSize] = useState(circleLength / totalTime);
  const addZero = (time: number): string => {
    return time >= 10 ? `${time}` : `0${time}`
  }
  const resetCountdown = () => {
    setCurrentTomato(null);
    setIsRunning(false);
    setTime(totalTime);
    setMinutes('25')
    setSeconds('00')
    setProgress(0)
    setVisibleGiveUpModal(false)
    setVisibleFinishedModal(false)
    setGiveUpReason('')
    setTaskDescription('')
  }
  const countdown = () => {
    if(time <= 0) {
      setVisibleFinishedModal(true)
      setIsRunning(false);
      return;
    }
    setMinutes(addZero(Math.floor(time / 60)));
    setSeconds(addZero(Math.floor(time % 60)));
    setTime(time - 1);
    setProgress(progress + stepSize)
  }
  useInterval(() => {
    countdown()
  }, isRunning ? 1000 : null);

  const startCountdown = (tomato: ITomato) => {
    const startedAt = Date.parse(tomato.started_at)
		const duration = tomato.duration
    const timeNow = new Date().getTime()
    if (timeNow - startedAt < duration) {
      const time = (duration - timeNow + startedAt) / 1000;
      setTime(time)
      setStepSize(circleLength/time)
      setIsRunning(true)
    } else {
      setVisibleFinishedModal(true)
    }
  }

  const postTomato = (params: any) => {
    ajax.post('/tomatoes', params)
      .then(res => {
        addTomato([res.data.resource])
      })
  }
  useEffect(() => {
    const fliterUnfinished = () => {
      const unfinished: ITomato = tomatoList.filter(item => !item.ended_at && !item.aborted)[0];
      if (unfinished) {
        setCurrentTomato(unfinished)
        startCountdown(unfinished)
      } else {
        resetCountdown()
      }
    }
    fliterUnfinished();
    // eslint-disable-next-line
  }, [tomatoList])

  const onPlay = () => {
    postTomato({duration: totalTime * 1000})
  }
  const submitTomato = (parmas: any) => {
    if (currentTomato) {
      ajax.put(`/tomatoes/${currentTomato.id}`, parmas)
        .then(res => {
          updateTomato(res.data.resource)
          resetCountdown()
        })
    }
  }
  const classPrefix = 'circular-progress';
  return (
    <div className={`${classPrefix}_container`}>
      <div className={`${classPrefix}_progress`}>
        <svg
          version="1.1"
          baseProfile="full"
          width="244"
          height="244"
          xmlns="http://www.w3.org/2000/svg">
          <circle cx="122" cy="122" r={`${circleRadius}`} fill="none" stroke="#f7f7f7" strokeWidth="2" strokeLinecap="round"/>
          <circle className={`${classPrefix}_circle`} cx="122" cy="122" r={`${circleRadius}`} fill="none" stroke="#ff4949" strokeWidth="2" strokeDasharray={`${progress},1000`}/>
        </svg>
        <div className={`${classPrefix}_countdown`}>
          {minutes} : {seconds}
        </div>
      </div>
      <div className={`${classPrefix}_control-btns`}>
        {isRunning ? (
          <img src={quitIcon} alt="icon" onClick={() => setVisibleGiveUpModal(true)}/>
        ) : (
          <img src={playIcon} alt="icon" onClick={onPlay} />
        )}
      </div>
      <Modal
        title="你被什么事情打断了？"
        okText="放弃番茄"
        cancelText="继续番茄"
        visible={visibleGiveUpModal}
        onOk={() => submitTomato({
          description: giveUpReason,
          aborted: true
        })}
        onCancel={() => setVisibleGiveUpModal(false)}>
          <Input placeholder="请输入放弃番茄的原因" onChange={(e) => setGiveUpReason(e.target.value)}/>
      </Modal>

      <Modal
        title="你刚刚完成了什么"
        okText="提交"
        cancelText="放弃"
        visible={visibleFinishedModal}
        onOk={() => submitTomato({
          description: taskDescription || giveUpReason,
          ended_at: new Date()
        })}
        onCancel={() => submitTomato({
          description: giveUpReason,
          aborted: true
        })}>
          <Input
            placeholder="请输入完成的工作或放弃的原因" onChange={
              (e) => {setGiveUpReason(e.target.value); setTaskDescription(e.target.value);}
            }/>
      </Modal>
    </div>
  )
}

const mapStateToProps = (state: IState) => ({
  tomatoList: state.tomatos
})

const mapDispatchToProps = (dispatch: any) => ({
  addTomato: (tomato: any) => dispatch(reduxAddTomato(tomato)),
  updateTomato: (tomato: any) => dispatch(reduxUpdateTomato(tomato))
})
export default connect(mapStateToProps, mapDispatchToProps)(CircularProgress);