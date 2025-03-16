import React from "react";
import { Route, Switch } from "react-router-dom";
import Routecardetail from "../components/Cars/Cardetail/Routecardetail";
import { AddtionalDetails } from "../components/AddtionalDetails/AddtionalDetails";
import Routecarnumber from "../components/Cars/Carnumber/Routecarnumber";
import Routeexpiry from "../components/Cars/Expirydate/Routeexpiry";
import Routepolicy from "../components/Cars/Lastpolicy/Routepolicy";

import Routepincode from "../components/Cars/Pincode/Routepincode";
import Routeuseofcar from "../components/Cars/Useofcar/Routeuseofcar";

import { DifferentPlanOptions } from "../components/PlanOptions/DiffPlanOptions";
import { CustomPolicyBuilder } from "../components/PlanOptions/CustomPolicyBuilder";
import Routeyear from "../components/Cars/Year/Routeyear";
import Routemonth from "../components/Cars/Month/Routemonth";
import Routecartype from "../components/Cars/Cartype/Routecartype";
import { AdditionalCovers } from "../components/PlanOptions/AdditionalCovers";
import { FinalDetails } from "../components/FinalDetails/FinalDetails";
import Home from "../components/homepage/Home";
import Paysuccessfull from "../components/Paysuccessfull/Paysuccessfull";
import { CardPayment } from "../components/payment/CardPayment";
function Routes() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/cars/useofcar" exact>
          <Routeuseofcar />
        </Route>

        <Route path="/cars/pincode" exact>
          <Routepincode />
        </Route>
        <Route path="/cars/carnumber" exact>
          <Routecarnumber />
        </Route>

        <Route path="/cars/year" exact>
          <Routeyear />
        </Route>

        <Route path="/cars/month" exact>
          <Routemonth />
        </Route>

        <Route path="/cars/cartype" exact>
          <Routecartype />
        </Route>

        <Route path="/cars/expiry" exact>
          <Routeexpiry />
        </Route>

        <Route path="/cars/policy" exact>
          <Routepolicy />
        </Route>

        <Route path="/cars/cardetail" exact>
          <Routecardetail />
        </Route>

        <Route path="/plans">
          <DifferentPlanOptions></DifferentPlanOptions>
        </Route>
        
        <Route path="/custom-policy">
          <CustomPolicyBuilder></CustomPolicyBuilder>
        </Route>
        
        <Route path="/additionalCovers">
          <AdditionalCovers></AdditionalCovers>
        </Route>
        <Route path="/addtional-details">
          <AddtionalDetails />
        </Route>

        <Route path="/final-details">
          <FinalDetails />
        </Route>
        <Route path="/cardPayment" exact>
          <CardPayment />
        </Route>
        <Route path="/successfull" exact>
          <Paysuccessfull />
        </Route>
        <Route>
          <h1>404:Page not found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default Routes;
