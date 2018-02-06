import React from 'react';
import {browserHistory} from 'react-router';
import store from '../store';
import * as TYPE from '../libs/constTYPE';
import * as events from '../libs/customEvents';
import fetchJson from '../libs/fetchJson';

export default class SortList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sorts: [],
        };
    }

    componentDidMount() {
        this.init();
        events.customEvent.on(events.REFRESH_SORTS_LIST, this.refreshList.bind(this));
    }

    componentWillUnmount() {

    }

    init() {
        this.setState({
            sorts: [],
        });

        this.getSorts();
    }

    refreshList() {
        this.getSorts();
    }

    async getSorts() {
        return;
        try {
            let msg = await fetchJson({
                type: 'GET',
                url: `/json/sort/list`,
            });

            this.setState({
                sorts: msg.data,
            });

        } catch (e) {
            // console.error(e); 
        }
    }

    addNew() {
        browserHistory.push(`/sort/add`);
    }

    editSort(e) {
        let tar = e.currentTarget;
        let id = parseInt($(tar).attr('data-id'), 10);

        browserHistory.push(`/sort/edit?id=${id}`);
    }

    delSort(e) {
        let tar = e.currentTarget;
        let $tr = $(tar).closest('tr');
        let id = $tr.attr('data-id');
        let title = $tr.attr('data-title');
        // console.info(id);

        let r = window.confirm(`确认删除" ${title} "吗?`);
        if (r === true) {
            this.del(parseInt(id, 10));
        }
    }

    async del(id) {
        let data = {
            id: id,
        };
        try {
            let msg = await fetchJson({
                type: 'GET',
                url: '/json/sort/del',
                data: data,
            });

            if (msg.status === 'success') {
                this.refreshList();
            }
        } catch (e) {
            // console.error(e);
        }
    }

    render() {
        let sortsArray = this.state.sorts.map((value, index)=> {
            return (
                <tr key={index} data-id={value.id} data-title={value.cname} onDoubleClick={this.editSort.bind(this)}>
                    <td>{value.id}</td>
                    <td>{value.orderid}</td>
                    <td>{value.cname}</td>
                    <td>
                        <button type="button" className="btn btn-xs btn-danger" onClick={this.delSort.bind(this)}>
                            删除
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="glyphicon glyphicon-plus add-new" onClick={this.addNew.bind(this)}></div>
                        <table className="data" width="100%">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>排序</th>
                                <th>标题</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortsArray}
                            </tbody>
                        </table>
                        <div id="pages" className="page"></div>
                    </div>
                </div>
            </div>
        );
    }
}