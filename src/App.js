import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Input, Layout, List, message, Progress, Select, Space, Tag} from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import testImage from "./images/test.png"
import "./App.css"
import {stringToColor} from "./utils/util";
import {Link} from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;
const { Meta } = Card;

function App() {
    const [str, setStr] = useState("");
    const [articles, setArticles] = useState([]);
    const [labels, setLabels] = useState([]);
    const [articlesContent, setArticlesContent] = useState([]);

    const hanldeOk = () => {
        message.info("你输入的啥？")
    };
    const getArtifactRequest = new Request(require('./article/article'), {
        method: 'GET',
    });

    useEffect(()=>{
        fetch(getArtifactRequest).then((response) => {
            return response.text()
        }).then(text=>{
            const as = JSON.parse(text);
            setArticles(as);
            const ls = new Set();
            as.forEach(a=>{
                a.labels.forEach(l=>ls.add(l))
            });
            setLabels(Array.from(ls));
        });
    },[]);

    useEffect(()=>{
        articles.forEach(article => {
            fetch(new Request(require(`./article/${article.name}`), {
                method: 'GET',
            })).then((response) => {
                return response.text()
            }).then(text => {
                var as = [];
                as.push(articlesContent);
                as.push(text);
                setArticlesContent(as);
            });
        });
    },[articles]);
    return (
        <Layout>
            <Header className='header' style={{height:80, textAlign:"center"}}>
                <Select
                    mode="multiple"
                    placeholder="选择标签以过滤"
                    className='shadow'
                    style={{ width: 500,margin: 20 }}
                >
                    {labels.map(l => <Select.Option value={l}><Tag color={stringToColor(l)}>{l}</Tag> </Select.Option>)}
                </Select>
                <Button shape="circle" icon={<SearchOutlined />} onClick={hanldeOk}/>
            </Header>
            <Content style={{height: 1000, padding: 20, display:"flex"}} className='content'>
                {articles.map(article=>
                    <Link to={`/detail/${article.name}`}>
                        <Card
                            hoverable
                            style={{ width: 240, margin: 10 }}
                            cover={<img alt="example" src={require(`./images/${article.imageName}`)} />}
                        >
                            <Meta title={article.chName} description={article.desc} style={{marginBottom:5}}/>
                            <span>{article.labels.map(label=><Tag color={stringToColor(label)}>{label}</Tag>)}</span>
                        </Card>
                    </Link>

                )}
            </Content>
        </Layout>
    );
}

export default App;
