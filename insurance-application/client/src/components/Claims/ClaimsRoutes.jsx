import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CarClaimForm from './Car/New/CarClaimForm';
import CarHowItWorks from './Car/HowItWorks/CarHowItWorks';
import CarGarages from './Car/Garages/CarGarages';
import BikeRepairShops from './Bike/RepairShops/BikeRepairShops';
import BikeHowItWorks from './Bike/HowItWorks/BikeHowItWorks';
import SimpleBikeHowItWorks from './Bike/HowItWorks/SimpleBikeHowItWorks';
import BikeClaimTest from './Bike/New/BikeClaimTest';
// Import other claim components as they are created

const ClaimsRoutes = () => {
  return (
    <Switch>
      {/* Car Insurance Claims Routes */}
      <Route path="/claims/car/new" component={CarClaimForm} />
      <Route path="/claims/car/how-it-works" component={CarHowItWorks} />
      <Route path="/claims/car/garages" component={CarGarages} />

      {/* Bike Insurance Claims Routes */}
      <Route path="/claims/bike/repair-shops" component={BikeRepairShops} />
      <Route path="/claims/bike/how-it-works" component={BikeHowItWorks} />
      <Route path="/claims/bike/simple-how-it-works" component={SimpleBikeHowItWorks} />
      <Route path="/claims/bike/test" component={BikeClaimTest} />
      {/* 
      <Route path="/claims/bike/new" component={BikeClaimForm} />
      */}

      {/* Health Insurance Claims Routes */}
      {/* 
      <Route path="/claims/health/new" component={HealthClaimForm} />
      <Route path="/claims/health/track" component={HealthTrackPlan} />
      <Route path="/claims/health/how-it-works" component={HealthHowItWorks} />
      */}

      {/* Default route for Claims section */}
      <Route path="/claims" exact component={BikeClaimTest} />
    </Switch>
  );
};

export default ClaimsRoutes; 