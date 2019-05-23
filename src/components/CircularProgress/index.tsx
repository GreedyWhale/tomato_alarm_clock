import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../pages/Home/types/home.d';
import playIcon from '../../assets/image/play.svg';
import pauseIcon from '../../assets/image/pause.svg';
import quitIcon from '../../assets/image/quit.svg';
import './style.scss';

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
  tomatoList: any[]
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
const CircularProgress: React.FC<IProps> = ({tomatoList}) => {
  const totalTime: number = 1500;
  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(totalTime);
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('00');
  const [isRunning, setIsRunning] = useState(false);
  const [currentTomato, setCurrentTomato] = useState<ITomato | null>(null);
  const circleRadius = 120;
  const circleLength = 2 * circleRadius * Math.PI;
  const stepSize = circleLength / totalTime;

  const addZero = (time: number): string => {
    return time >= 10 ? `${time}` : `0${time}`
  }
  const countdown = () => {
    const currentTime = time - 1;
    if(currentTime <= 0) {
      setIsRunning(false);
      setTime(totalTime);
      setMinutes('25');
      setSeconds('00');
      return;
    }
    setTime(currentTime);
    setMinutes(addZero(Math.floor(currentTime / 60)));
    setSeconds(addZero(Math.floor(currentTime % 60)));
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
      setTime((duration - timeNow + startedAt) / 1000)
      setIsRunning(true)
    }
  }
  useEffect(() => {
    const fliterUnfinished = () => {
      const unfinished: ITomato = tomatoList.filter(item => !item.ended_at && !item.aborted)[0];
      if (unfinished) {
        setCurrentTomato(unfinished)
        startCountdown(unfinished)
      }
    }
    fliterUnfinished()
  }, [tomatoList])

  const onPlay = () => {
    setIsRunning(true)
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
          <React.Fragment>
            <img src={pauseIcon} alt="icon"/>
            <img src={quitIcon} alt="icon"/>
          </React.Fragment>
        ): <img src={playIcon} alt="icon" onClick={onPlay} />}
      </div>
    </div>
  )
}

const mapStateToProps = (state: IState) => ({
  tomatoList: state.tomatos
})
export default connect(mapStateToProps)(CircularProgress);