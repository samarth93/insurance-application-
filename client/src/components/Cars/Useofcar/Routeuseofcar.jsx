import React from 'react';
import Common from '../Common/Common';
import Useofcar from './Useofcar';
import Dynamic from '../Dynamic/Dynamic';

function Routeuseofcar() {
  return (
    <div className="app">
      <div className="flex">
        <Common />
        <Useofcar />
        <Dynamic />
      </div>
    </div>
  );
}

export default Routeuseofcar;
