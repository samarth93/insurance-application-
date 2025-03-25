import React from 'react';
import Common from '../Common/Common';
import Cardetail from './Cardetail';
import Dynamic from '../Dynamic/Dynamic';

function Routecardetail() {
  return (
    <div className="app">
      <div className="flex">
        <Common />
        <Cardetail />
        <Dynamic />
      </div>
    </div>
  );
}

export default Routecardetail;
