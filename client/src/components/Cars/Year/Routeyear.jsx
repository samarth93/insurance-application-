import React from 'react';
import Common from '../Common/Common';
import Year from './Year';
import Dynamic from '../Dynamic/Dynamic';

function Routeyear() {
  return (
    <div className="app">
      <div className="flex">
        <Common />
        <Year />
        <Dynamic />
      </div>
    </div>
  );
}

export default Routeyear;
