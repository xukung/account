import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, hashHistory, IndexRoute, browserHistory} from 'react-router';
import store from './store/';
import Base from './components/Base';
import ErrorPage from './components/ErrorPage';
import ArticleLayout from './components/ArticleLayout';
import SortLayout from './components/SortLayout';
import ArticleDetail from './components/ArticleDetail';
import ArticleAdd from './components/ArticleAdd';
import SortAdd from './components/SortAdd';
import ArticleEdit from './components/ArticleEdit';
import SortEdit from './components/SortEdit';


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
                <Route path="/sort/add" component={SortAdd}/>
                <Route path="/sort/edit" component={SortEdit}/>
            </Route>
            <Route path="/*" component={ErrorPage}/>
        </Router>
    </Provider>,
    document.getElementById('APP')
);