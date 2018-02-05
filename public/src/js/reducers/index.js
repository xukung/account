import {combineReducers} from 'redux'

import rootDo from './rootDo';
import project from './project';

const rootReducer = combineReducers({
    rootDo, project,
});

export default rootReducer;
