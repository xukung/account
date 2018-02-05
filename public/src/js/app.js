import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, IndexRoute, browserHistory} from 'react-router';

import store from './store/';
import Base from './components/Base';
import ErrorPage from './components/ErrorPage';
import Project from './components/Project';


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Base}>
                <IndexRoute component={Project}/>
                <Route path="/project" component={Project}/>
            </Route>
            <Route path="/*" component={ErrorPage}/>
        </Router>
    </Provider>,
    document.getElementById('APP')
);