import React from 'react';
import ReactMarkdown from "react-markdown";
import {Button, Layout, Select, Tag} from "antd";
import {stringToColor} from "./utils/util";
import {Link} from "react-router-dom";
import HomeOutlined from "@ant-design/icons/lib/icons/HomeOutlined";
const { Header, Content } = Layout;

export default class Detail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            articleName:this.props.match.params.name,
            articleContent: null,
        }
    }
    componentDidMount() {
        const articleName = this.state.articleName
        fetch(new Request(require(`./article/${articleName}`), {
            method: 'GET',
        })).then((response) => {
            return response.text()
        }).then(text => {
            this.setState({
                articleContent:text
            })
        });
    }

    render() {
        return (
            <Layout>
                <Header className='header' style={{height:60, textAlign:"center"}}>
                    <Link to='/blog'><HomeOutlined style={{color:"#ffffff"}}/></Link>
                </Header>
                <Content style={{height: 1000, padding: 20, textAlign: "left"}} className='content'>
                    <ReactMarkdown source={this.state.articleContent}/>
                </Content>
            </Layout>
        )
    }
 }