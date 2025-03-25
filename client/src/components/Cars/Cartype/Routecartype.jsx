import React, { useState } from "react";
import Common from "../Common/Common";
import Cartype from "./Cartype";
import Dynamic from "../Dynamic/Dynamic";

function Routecartype() {
  return (
    <div className="app">
      <div className="flex">
        <Common />
        <Cartype />
        <Dynamic />
      </div>
    </div>
  );
}

export default Routecartype;
