import React from 'react';
import Common from '../Common/Common';
import Carnumber from './Carnumber';
import Dynamic from '../Dynamic/Dynamic';

function RouteCarnumber() {
  return (
    <div className="app">
      <div className="flex">
        <Common />
        <Carnumber />
        <Dynamic />
      </div>
    </div>
  );
}

export default RouteCarnumber;
