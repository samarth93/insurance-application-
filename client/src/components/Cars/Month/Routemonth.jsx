import React from 'react';
import Common from '../Common/Common';
import Month from './Month';
import Dynamic from '../Dynamic/Dynamic';

function Routemonth() {
  return (
    <div className="app">
      <div className="flex">
        <Common />
        <Month />
        <Dynamic />
      </div>
    </div>
  );
}

export default Routemonth;
