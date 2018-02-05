import * as TYPE from '../libs/constTYPE';
import objectAssign from '../libs/objectAssign';
objectAssign();

const initState = {
    recentBrowse: [],   //最近浏览
};

export default function header(state = initState, action) {
    switch (action.type) {
        case TYPE.SET_RECENT_BROWSE:
            return Object.assign({}, state, {recentBrowse: action.val});
            break;

        default:
            return state
    }
}