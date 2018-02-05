import * as TYPE from '../libs/constTYPE';
import objectAssign from '../libs/objectAssign';

objectAssign();

const initState = {
    curRoute: '/project',
};

function rootDo(state = initState, action) {
    switch (action.type) {
        case TYPE.CHANGE_ROUTE:
            return Object.assign({}, state, {
                curRoute: action.val
            });
            break;

        default:
            return state;
    }
}

export default rootDo;