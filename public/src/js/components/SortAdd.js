import React from 'react';
import store from '../store';
import {browserHistory} from 'react-router';
import * as TYPE from '../libs/constTYPE';
import * as events from '../libs/customEvents';
import Header from './Header';
import fetchJson from '../libs/fetchJson';

export default class SortAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorts: [],
        };
        this.editor = null;
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {

    }

    init() {
    }


    async addNew() {
        let data = {
            cname: $('#title').val(),
        };
        try {
            let msg = await fetchJson({
                type: 'POST',
                url: '/json/sort/add',
                data: data,
            });

            if (msg.status === 'success') {
                browserHistory.push(`/sort/list`);
            }
        } catch (e) {
            // console.error(e);
        }
    }

    render() {
        let sorts = this.state.sorts || [];

        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 col-md-push-1">
                            <div className="mt">
                                <input id="title" className="form-control" type="text" placeholder="类别名称"/>
                            </div>
                            <div className="mt">
                                <button className="btn btn-default" onClick={this.addNew.bind(this)}>添加</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}