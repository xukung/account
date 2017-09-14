import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import MuiThemeProvider from '../materialUi/styles/MuiThemeProvider';

import * as actionsProject from '../actions/project';
import customTheme from './theme/customTheme';
import NavBar from './nav/NavBar';
import * as events from '../libs/customEvents';
import store from '../store';
import * as TYPE from '../libs/constTYPE'

class Demo extends React.Component {
    constructor(props) {
        super(props);
    }

    handleEvent(){
        console.info('event emitted');
    }

    componentWillMount() {
        this.props.changeRoute('/demo');

        events.customEvent.on(events.OPEN_DRAWER_GROUPS_INFO, this.handleEvent);

        store.dispatch({
            type: TYPE.SET_DATA_BROWSE,
            val: 'ABCDEF'
        });
    }

    render() {

        events.customEvent.emit(events.OPEN_DRAWER_GROUPS_INFO);

        let browseData = store.getState().browse.dataBrowse || [];

        return (
            <MuiThemeProvider muiTheme={customTheme}>
                <div>
                    <NavBar></NavBar>
                    <div className="tright">{browseData}</div>
                </div>
            </MuiThemeProvider>
        );
    }
}


// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的
function mapStateToProps(state) {
    return state;
}

//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionsProject, dispatch)
}

export default(connect(mapStateToProps, mapDispatchToProps))(Demo);