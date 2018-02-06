import React from 'react';
import store from '../store';
import {browserHistory} from 'react-router';
import * as TYPE from '../libs/constTYPE';
import * as events from '../libs/customEvents';
import Header from './Header';
import fetchJson from '../libs/fetchJson';

export default class ArticleEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorts: [],
            article: {},
        };
        this.editor = null;
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {

    }

    init() {
        this.getSorts();
        this.getData();
        this.initEditor();
    }

    initEditor() {
        this.editor = KindEditor.create('#note2',{
            height: '480px',
            items: [
                'clearhtml', 'quickformat', 'source', 'code', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', '|',
                'formatblock', 'fontname', 'fontsize', '|',
                'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
                'unlink', 'link',
            ],
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

    async getData() {
        let data = {
            id: store.getState().project.currentArticle,
        };

        try {
            let msg = await fetchJson({
                type: 'GET',
                url: '/json/article/detail',
                data: data,
            });

            this.setState({
                article: msg.data,
            });

            //必须加一个延时
            setTimeout(()=> {
                $('#sorts2').val(msg.data.sort);
                $('#title2').val(msg.data.title);
                // $('#note2').val(msg.data.note);
                this.editor.html(msg.data.note);
            }, 100);


        } catch (e) {
            // console.error(e); 
        }
    }

    async editArticle() {
        let data = {
            id: this.state.article.id,
            sort: $('#sorts2').val(),
            title: $('#title2').val(),
            note: this.editor.html(),
        };
        try {
            let msg = await fetchJson({
                type: 'POST',
                url: '/json/article/edit',
                data: data,
            });

            if (msg.status === 'success') {
                browserHistory.push(`/article/list`);
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
                            <div>
                                <select name="" id="sorts2">
                                    {
                                        sorts.map((value, index)=> {
                                            return <option key={index} value={value.id}>{value.cname}</option>;
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mt">
                                <input id="title2" className="form-control" type="text" placeholder="标题"
                                       defaultValue={this.state.article.title}/>
                            </div>
                            <div className="mt">
                                <textarea id="note2" className="form-control note" placeholder="内容" cols="30"
                                          rows="10" defaultValue={this.state.article.note}></textarea>
                            </div>
                            <div className="mt">
                                <button className="btn btn-default" onClick={this.editArticle.bind(this)}>修改</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}