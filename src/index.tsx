import 'es6-shim';
import 'url-search-params-polyfill';
import React from "react";
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { Global } from './models/Global';
import './assets/app.less';
import { LazyRouteLoader } from './components/LazyRouteLoader';

const App = () => (
    <Router history={Global.history}>
        <LazyRouteLoader routes={[
            { path: '/home', load: () => import('./views/HomeView/HomeView') },
            { path: '/other/:name', load: () => import('./views/OtherView/OtherView') },
            { path: '/', load: () => import('./views/HomeView/HomeView') },

        ]} />
    </Router>
);


ReactDOM.render(
    <App />,
    document.getElementById('main')
);