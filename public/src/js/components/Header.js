import React from 'react';
import store from '../store';
import {browserHistory} from 'react-router';
import * as TYPE from '../libs/constTYPE';
import * as events from '../libs/customEvents';
import fetchJson from '../libs/fetchJson';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorts: [],
        };
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {

    }

    init() {
        this.getSorts();

        //回车提交表单
        $('#searchInput').keydown((event)=> {
            // console.info(event.keyCode);
            switch (event.keyCode) {
                case 13:
                    this.search();
                    break;
                default:
                    ;
            }
        });
    }

    async getSorts() {
        try {
            let msg = await fetchJson({
                type: 'GET',
                url: '/json/sort/list',
            });

            this.setState({
                sorts: msg.data,
            });

        } catch (e) {
            // console.error(e); 
        }
    }

    changeSort(e) {
        browserHistory.push(`/article/list`);

        let tar = e.currentTarget;
        let id = parseInt(tar.dataset.id, 10);
        // console.log(id);

        store.dispatch({
            type: TYPE.SET_CURRENT_SORT,
            val: id,
        });

        events.customEvent.emit(events.REFRESH_ARTICLE_LIST);

    }

    search() {
        browserHistory.push(`/article/list`);

        let keywords = $('#searchInput').val();
        store.dispatch({
            type: TYPE.SET_KEYWORDS,
            val: keywords,
        });

        events.customEvent.emit(events.REFRESH_ARTICLE_LIST);
    }

    render() {
        // console.log('render header');
        let currentSort = parseInt(store.getState().project.currentSort, 10);


        let sortsArray = this.state.sorts.map((value, index)=> {
            // console.log('store.getState().project.currentSort:', store.getState().project.currentSort);
            // console.log('value.id:', value.id);
            return (
                <li className={currentSort === value.id ? 'active' : ''}
                    key={index}
                    data-id={value.id} onClick={this.changeSort.bind(this)}>
                    <a className="btn" href="javascript:void(0)">{value.cname}</a>
                </li>
            )
        });


        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Home</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                {sortsArray}
                            </ul>
                            <div className="navbar-form navbar-right" role="search">
                                <div className="form-group">
                                    <input type="text" name="keywords" id="searchInput" className="form-control"
                                           placeholder="Search"/>
                                </div>
                                <button type="button" className="btn btn-default" onClick={this.search.bind(this)}>搜索
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}