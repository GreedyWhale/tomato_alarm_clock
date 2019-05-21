import axios from 'axios';
import history from '../history/index';
import { TOMATO_ALARM_CLOCK_X_TOKEN } from '../constant/index';

const appId: string = 'XTrcPmPP6mK73ZgLHoXfnRef';
const appSecret: string = 'FNhsEEYYNvPK4xt5nLG9Qfv9';

const ajax = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com',
  timeout: 2000,
  headers: {
    't-app-id': appId,
    't-app-secret': appSecret
  }
});

ajax.interceptors.request.use(config => {
  const xToken = localStorage.getItem(TOMATO_ALARM_CLOCK_X_TOKEN)
  if(xToken){
      config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, error => Promise.reject(error));

ajax.interceptors.response.use(response => {
  if(response.headers['x-token']){
    localStorage.setItem(TOMATO_ALARM_CLOCK_X_TOKEN, response.headers['x-token'])
  }
  return response;
}, error => {
  if (error.response.status === 401) {
    history.replace('/login')
  }
  return Promise.reject(error)
});

export default ajax;
