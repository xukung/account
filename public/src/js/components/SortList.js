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
            sortsin: [],
            sortsout: [],
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
            sortsin: [],
            sortsout: [],
        });

        this.getSorts();
    }

    refreshList() {
        this.getSorts();
    }

    async getSorts() {
        try {
            let msg = await fetchJson({
                type: 'GET',
                url: `/json/sortin/list`,
            });

            let msg2 = await fetchJson({
                type: 'GET',
                url: `/json/sortout/list`,
            });

            this.setState({
                sortsin: msg.data,
            });

            this.setState({
                sortsout: msg2.data,
            });

        } catch (e) {
            // console.error(e); 
        }
    }

    addNew() {
        browserHistory.push(`/sortin/add`);
    }

    removeNew() {
        browserHistory.push(`/sortout/add`);
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
        let sortsInArray = this.state.sortsin.map((value, index)=> {
            return (
                <tr key={index} data-id={value.id} data-title={value.cname} onDoubleClick={this.editSort.bind(this)}>
                    <td>{value.id}</td>
                    <td>{value.name}</td>
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
                        <div className="glyphicon glyphicon-plus-sign add-new" onClick={this.addNew.bind(this)}></div>
                        <div className="glyphicon glyphicon-minus-sign remove-new"
                             onClick={this.removeNew.bind(this)}></div>
                        <div>inlist</div>
                        <table className="data" width="100%">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>名称</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortsInArray}
                            </tbody>
                        </table>
                        <div>outlist</div>
                    </div>
                </div>
            </div>
        );
    }
}