import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '@assets/loadables/NotFound';
import {routePrefix} from '@assets/config/app';

// eslint-disable-next-line react/prop-types
const Routes = ({prefix = routePrefix}) => (
  <Switch>
    <Route path="*" component={NotFound} />
  </Switch>
);

export default Routes;
