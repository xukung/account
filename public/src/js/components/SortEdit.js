import React from 'react';
import store from '../store';
import {browserHistory} from 'react-router';
import * as TYPE from '../libs/constTYPE';
import * as events from '../libs/customEvents';
import Header from './Header';
import fetchJson from '../libs/fetchJson';
import * as func from '../libs/func';

export default class SortEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {},
        };
        this.editor = null;
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {

    }

    init() {
        this.getData();
    }


    async getData() {
        let data = {
            id: func.getQueryString('id'),
        };

        try {
            let msg = await fetchJson({
                type: 'GET',
                url: '/json/sort/detail',
                data: data,
            });

            this.setState({
                sort: msg.data,
            });

            //必须加一个延时
            setTimeout(()=> {
                $('#orderid').val(msg.data.orderid);
                $('#title2').val(msg.data.cname);
            }, 100);


        } catch (e) {
            // console.error(e); 
        }
    }

    async editSort() {
        let data = {
            id: this.state.sort.id,
            orderid: $('#orderid').val(),
            cname: $('#title2').val(),
        };
        try {
            let msg = await fetchJson({
                type: 'POST',
                url: '/json/sort/edit',
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

        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 col-md-push-1">
                            <div className="mt">
                                <input id="orderid" className="form-control" type="text"/>
                            </div>
                            <div className="mt">
                                <input id="title2" className="form-control" type="text" placeholder="标题"/>
                            </div>
                            <div className="mt">
                                <button className="btn btn-default" onClick={this.editSort.bind(this)}>修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}