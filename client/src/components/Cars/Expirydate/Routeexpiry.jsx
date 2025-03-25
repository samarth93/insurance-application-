import React from 'react';
import Common from '../Common/Common';
import Expiry from './Expiry';
import Dynamic from '../Dynamic/Dynamic';

function Routeexpiry() {
  return (
    <div className="app">
      <div className="flex">
        <Common />
        <Expiry />
        <Dynamic />
      </div>
    </div>
  );
}

export default Routeexpiry;
