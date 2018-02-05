import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import DevTools from '../DevTools';

import rootReducer from '../reducers/';

//同步方式
//let store = createStore(rootReducer);
//谷歌浏览器调试redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk),
    // DevTools.instrument()
));



function handleChange() {
}
store.subscribe(handleChange);

export default store;