import React, { useState } from 'react';
import Common from '../Common/Common';
import Policy from './Policy';
import Dynamic from '../Dynamic/Dynamic';
import Ncbpopup from '../Ncbpopup/Ncbpopup';

function Routepolicy() {
  const [popupp, setpopupp] = useState(false);
  
  return (
    <div className="app">
      <div className="flex">
        <Common />
        <Policy setpopupp={setpopupp} />
        <Dynamic />
      </div>
      <Ncbpopup popupp={popupp} setpopupp={setpopupp} />
    </div>
  );
}

export default Routepolicy;
