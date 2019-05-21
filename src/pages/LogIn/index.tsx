import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './style.scss';
import logo from '../../assets/image/logo.svg';
import { Input, Button, message } from 'antd';
import ajax from '../../methods/ajax/index';

const LogIn: React.FC<RouteComponentProps> = ({history}) => {

  const [isLogIn, setIsLogIn] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const onSubmit = () => {
    if (isLogIn && canLogIn()) {
      logIn()
    } else if (!isLogIn && canSignUp()) {
      signUp()
    }
  }

  const canLogIn = (): boolean => {
    if (!userName) {
      message.error('请输入用户名');
      return false;
    }
    if (!password) {
      message.error('请输入密码');
      return false;
    }
    return true;
  }

  const canSignUp = (): boolean => {
    if (!userName) {
      message.error('请输入用户名');
      return false;
    }
    if (!password) {
      message.error('请输入密码');
      return false;
    }
    if (password !== passwordConfirmation) {
      message.error('两次输入的密码不一致');
      return false;
    }
    return true;
  }

  const logIn = () => {
    ajax.post('/sign_in/user', {account: userName, password})
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        try {
          const {response: {data: {errors}}} = err;
          message.error(errors)
        } catch (error) {
          message.error(err.message);
        }
      })
  }

  const signUp = () => {
    ajax.post('/sign_up/user', {
      account: userName,
      password,
      password_confirmation: passwordConfirmation
    })
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        const {response: {data: {errors}}} = err;
        message.error(errors.account[0] ? '该用户已存在' : err.message);
      })
  }
  const classPrefix = 'log-in';

  return (
    <div className={`${classPrefix}_container`}>
      <div className={`${classPrefix}_content`}>
        <img src={logo} alt="logo" className={`${classPrefix}_logo`}/>
        <h3 className={`${classPrefix}_title`}>{isLogIn ? 'Log in' : 'Sign up'}</h3>

        <div className={`${classPrefix}_input-area`}>
          <h5 className={`${classPrefix}_input-label`}>Username</h5>
          <Input
            className={`${classPrefix}_input`}
            onChange={(e) => {setUserName(e.target.value)}} />
          <h5 className={`${classPrefix}_input-label`}>Password</h5>
          <Input.Password
            className={`${classPrefix}_input`} type='password'
            onChange={(e) => {setPassword(e.target.value)}} />
          {!isLogIn && (
            <React.Fragment>
              <h5 className={`${classPrefix}_input-label`}>Confirm Password</h5>
              <Input.Password
                className={`${classPrefix}_input`} type='password'
                onChange={(e) => {setPasswordConfirmation(e.target.value)}} />
            </React.Fragment>
          )}
        </div>

        <Button
          block ghost
          className={`${classPrefix}_button`} onClick={onSubmit}>
          {isLogIn ? 'Log in' : 'Sign up'}
        </Button>

        <p className={`${classPrefix}_tip`}>
          {
            isLogIn ? (
              <React.Fragment>
                新用户？ <span onClick={() => {setIsLogIn(false)}}>Sign up</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                老用户？ <span onClick={() => {setIsLogIn(true)}}>Log in</span>
              </React.Fragment> 
            )
          }
        </p>
      </div>
    </div>
  )
}

export default LogIn;