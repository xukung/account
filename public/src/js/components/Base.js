import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../actions/index';


class Base extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                {
                    this.props.children
                }
            </div>
        );
    }
}


// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的
function mapStateToProps(state) {
    return state;
}

//将action的所有方法绑定到props上
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}

export default(connect(mapStateToProps, mapDispatchToProps))(Base);