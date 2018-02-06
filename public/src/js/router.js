import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, IndexRoute, browserHistory} from 'react-router';
import store from './store/';
import Base from './components/Base';
import ErrorPage from './components/ErrorPage';
import ArticleLayout from './components/ArticleLayout';
import ArticleDetail from './components/ArticleDetail';
import ArticleAdd from './components/ArticleAdd';
import ArticleEdit from './components/ArticleEdit';

import SortLayout from './components/SortLayout';
import SortInAdd from './components/SortInAdd';
import SortOutAdd from './components/SortOutAdd';
import SortInEdit from './components/SortInEdit';
import SortOutEdit from './components/SortOutEdit';


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Base}>
                <IndexRoute component={SortLayout}/>

                <Route path="/article/list" component={ArticleLayout}/>
                <Route path="/article/detail" component={ArticleDetail}/>
                <Route path="/article/add" component={ArticleAdd}/>
                <Route path="/article/edit" component={ArticleEdit}/>

                <Route path="/sort/list" component={SortLayout}/>

                <Route path="/sortin/add" component={SortInAdd}/>
                <Route path="/sortin/edit" component={SortInEdit}/>

                <Route path="/sortout/add" component={SortOutAdd}/>
                <Route path="/sortout/edit" component={SortOutEdit}/>

            </Route>
            <Route path="/*" component={ErrorPage}/>
        </Router>
    </Provider>,
    document.getElementById('APP')
);