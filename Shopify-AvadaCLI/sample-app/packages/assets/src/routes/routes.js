import React from 'react';
import {Route, Switch} from 'react-router-dom';
import NotFound from '@assets/loadables/NotFound';
import {routePrefix} from '@assets/config/app';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import Settings from '../pages/Settings';

// eslint-disable-next-line react/prop-types
const Routes = ({prefix = routePrefix}) => (
    <Switch>
        <Route path="/error" component={NotFound} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/settings" component={Settings} />
        <Route path={'/'} component={Home} />
    </Switch>
);

export default Routes;
