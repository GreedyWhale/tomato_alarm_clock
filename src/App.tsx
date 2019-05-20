import React from 'react';
import './App.scss';
import AppRouter from './router';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
