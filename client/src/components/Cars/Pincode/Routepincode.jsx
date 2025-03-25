import React from 'react';
import Common from '../Common/Common';
import Pincode from './Pincode';
import Dynamic from '../Dynamic/Dynamic';

function Routepincode() {
  return (
    <div className="app">
      <div className="flex">
        <Common />
        <Pincode />
        <Dynamic />
      </div>
    </div>
  );
}

export default Routepincode;
