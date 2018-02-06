import React from 'react';
import store from '../store';
import * as TYPE from '../libs/constTYPE';
import * as events from '../libs/customEvents';
import fetchJson from '../libs/fetchJson';
import * as func from '../libs/func';

export default class ArticleDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
        };
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {

    }

    init() {
        this.getArticle();
    }

    async getArticle() {
        let data = {
            id: func.getQueryString("id"),
        };
        try {
            let msg = await fetchJson({
                type: 'GET',
                url: '/json/article/detail',
                data: data,
            });

            // console.log(msg.data);

            this.setState({
                article: msg.data,
            });

        } catch (e) {
            // console.error(e);
        }
    }


    render() {
        let a = this.state.article;
        // console.log('a:', a);

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 col-md-push-1">
                        <ol className="breadcrumb">
                        </ol>
                        <h1 className="text-center">{a.title}</h1>
                        <div className="text-center">{func.timestampToTime(a.datetime)}</div>
                        <div className="note-area" dangerouslySetInnerHTML={{__html: a.note}}></div>
                    </div>
                </div>
            </div>
        );
    }
}