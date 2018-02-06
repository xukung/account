import React from 'react';
import {browserHistory} from 'react-router';
import store from '../store';
import * as TYPE from '../libs/constTYPE';
import * as events from '../libs/customEvents';
import fetchJson from '../libs/fetchJson';

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            total: 0,
            page: 1,
            size: 10,
        };
    }

    componentDidMount() {
        this.init();
        events.customEvent.on(events.REFRESH_ARTICLE_LIST, this.refreshList.bind(this));
    }

    componentWillUnmount() {

    }

    init() {
        this.setState({
            articles: [],
            total: 0,
            page: 1,
            size: 10,
        });

        this.getTotal();
    }

    refreshList() {
        this.getTotal();
    }

    async getTotal() {
        try {
            let msg = await fetchJson({
                type: 'GET',
                url: '/json/article/total',
                data: {
                    sort: store.getState().project.currentSort,
                    keywords: store.getState().project.keywords,
                },
            });

            this.setState({
                total: msg.data,
            });

            this.setPages();
        } catch (e) {
            // console.error(e); 
        }
    }

    async getArticles() {
        try {
            let msg = await fetchJson({
                type: 'GET',
                url: `/json/article/list`,
                data: {
                    page: this.state.page,
                    size: this.state.size,
                    sort: store.getState().project.currentSort,
                    keywords: store.getState().project.keywords,
                }
            });

            this.setState({
                articles: msg.data,
            });

        } catch (e) {
            // console.error(e); 
        }
    }

    setPages() {

        let totalPage = Math.ceil(this.state.total / this.state.size);
        // console.log('totalPage:', totalPage);

        $('#pages').twbsPagination('destroy');

        if (totalPage > 0) {
            $('#pages').twbsPagination({
                totalPages: totalPage,
                visiblePages: totalPage > 5 ? 5 : totalPage,
                onPageClick: (event, page)=> {
                    // console.log(page);
                    this.setState({
                        page: page,
                    });

                    this.getArticles();
                }
            });
        } else {
            this.getArticles();
        }

    }

    addNew() {
        browserHistory.push(`/article/add`);
    }

    editArticle(e) {
        let tar = e.currentTarget;
        let id = parseInt($(tar).attr('data-id'), 10);

        store.dispatch({
            type: TYPE.SET_CURRENT_ARTICLE,
            val: id,
        });

        browserHistory.push(`/article/edit`);
    }

    delArticle(e) {
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
                url: '/json/article/del',
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
        let articleArray = this.state.articles.map((value, index)=> {
            return (
                <tr key={index} data-id={value.id} data-title={value.title} onDoubleClick={this.editArticle.bind(this)}>
                    <td>{value.sort_name}</td>
                    <td><a href={`/article/detail?id=${value.id}`} target="_blank">{value.title}</a></td>
                    <td>{value.datetime}</td>
                    <td>
                        <button type="button" className="btn btn-xs btn-danger" onClick={this.delArticle.bind(this)}>
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
                                <th>分类</th>
                                <th>标题</th>
                                <th>日期</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {articleArray}
                            </tbody>
                        </table>
                        <div id="pages" className="page"></div>
                    </div>
                </div>
            </div>
        );
    }
}