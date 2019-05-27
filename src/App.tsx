import React from 'react';
import './App.scss';
import AppRouter from './router';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const App: React.FC = () => {
  return (
    <LocaleProvider locale={zh_CN}>
      <div className="App">
        <AppRouter />
      </div>
    </LocaleProvider>
  );
}

export default App;
