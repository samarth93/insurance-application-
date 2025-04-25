import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Dashboard from "../components/Dashboard/Dashboard";
import AuthService from "../services/auth.service";
import MainLayout from "../components/Layout/MainLayout";
import RouteBikePincode from "../components/Bikes/Pincode/Routepincode";
import RouteUseofbike from "../components/Bikes/Useofbike/Routeuseofbike";
import RouteBikeNumber from "../components/Bikes/BikeNumber/RouteBikeNumber";
import RouteBikeDetails from "../components/Bikes/BikeDetails/RouteBikeDetails";
import RouteBikeExpiry from "../components/Bikes/BikeExpiry/RouteBikeExpiry";
import RouteBikePlans from "../components/Bikes/Plans/RouteBikePlans";
import RouteBikeCustomPolicy from "../components/Bikes/CustomPolicy/RouteBikeCustomPolicy";
import RouteBikeAdditionalDetails from "../components/Bikes/AdditionalDetails/RouteBikeAdditionalDetails";
import RouteHealthPlans from "../components/Health/Plans/RouteHealthPlans";
import RouteHealthAdditionalDetails from "../components/Health/AdditionalDetails/RouteHealthAdditionalDetails";
import RouteHealthProfile from "../components/Health/Profile/RouteHealthProfile";
import RouteHealthMedicalInfo from "../components/Health/MedicalInfo/RouteHealthMedicalInfo";
import HealthCustomPlan from '../components/Health/CustomPlan/HealthCustomPlan';
import VehicleDetails from '../components/VehicleDetails/VehicleDetails';
import About from '../components/About/About';
import ClaimsRoutes from '../components/Claims/ClaimsRoutes';

// Protected Route component
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      AuthService.isLoggedIn() ? (
        <MainLayout>
          <Component {...props} />
        </MainLayout>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

// Public route with layout
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    )}
  />
);

function Routes() {
  return (
    <Switch>
      {/* Public Routes */}
      <PublicRoute path="/" exact component={Home} />
      <PublicRoute path="/about" exact component={About} />

      {/* Authentication Routes */}
      <PublicRoute path="/login" exact component={Login} />
      <PublicRoute path="/register" exact component={Register} />

      {/* Protected Dashboard Routes */}
      <ProtectedRoute path="/dashboard" exact component={Dashboard} />

      {/* Vehicle Details Route */}
      <PublicRoute path="/vehicle-details" exact component={VehicleDetails} />

      {/* Protected Car Routes */}
      <ProtectedRoute path="/cars/useofcar" exact component={Routeuseofcar} />
      <ProtectedRoute path="/cars/pincode" exact component={Routepincode} />
      <ProtectedRoute path="/cars/carnumber" exact component={Routecarnumber} />
      <ProtectedRoute path="/cars/year" exact component={Routeyear} />
      <ProtectedRoute path="/cars/month" exact component={Routemonth} />
      <ProtectedRoute path="/cars/cartype" exact component={Routecartype} />
      <ProtectedRoute path="/cars/expiry" exact component={Routeexpiry} />
      <ProtectedRoute path="/cars/policy" exact component={Routepolicy} />
      <ProtectedRoute path="/cars/cardetail" exact component={Routecardetail} />

      {/* Protected Plan Routes */}
      <ProtectedRoute path="/plans" exact component={DifferentPlanOptions} />
      <ProtectedRoute path="/custom-policy" exact component={CustomPolicyBuilder} />
      <ProtectedRoute path="/additionalCovers" exact component={AdditionalCovers} />
      <ProtectedRoute path="/addtional-details" exact component={AddtionalDetails} />
      <ProtectedRoute path="/final-details" exact component={FinalDetails} />
      <ProtectedRoute path="/cardPayment" exact component={CardPayment} />
      <ProtectedRoute path="/successfull" exact component={Paysuccessfull} />
      
      {/* Protected Bike Routes */}
      <ProtectedRoute path="/bikes/pincode" exact component={RouteBikePincode} />
      <ProtectedRoute path="/bikes/bikenumber" exact component={RouteBikeNumber} />
      <ProtectedRoute path="/bikes/useofbike" exact component={RouteUseofbike} />
      <ProtectedRoute path="/bikes/bikedetails" exact component={RouteBikeDetails} />
      <ProtectedRoute path="/bikes/bikeexpiry" exact component={RouteBikeExpiry} />
      <ProtectedRoute path="/bikes/plans" exact component={RouteBikePlans} />
      <ProtectedRoute path="/bikes/custom-policy" exact component={RouteBikeCustomPolicy} />
      <ProtectedRoute path="/bikes/additional-details" exact component={RouteBikeAdditionalDetails} />
      
      {/* Protected Health Routes */}
      <ProtectedRoute path="/health/profile" exact component={RouteHealthProfile} />
      <ProtectedRoute path="/health/medical-info" exact component={RouteHealthMedicalInfo} />
      <ProtectedRoute path="/health/plans" exact component={RouteHealthPlans} />
      <ProtectedRoute path="/health/additional-details" exact component={RouteHealthAdditionalDetails} />
      <ProtectedRoute path="/health/custom-plan" exact component={HealthCustomPlan} />
      
      {/* Protected Claims Routes */}
      <ProtectedRoute path="/claims" component={ClaimsRoutes} />
      
      {/* 404 Route */}
      <PublicRoute path="*" component={() => <h1>404: Page not found</h1>} />
    </Switch>
  );
}

export default Routes;
