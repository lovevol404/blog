import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Col, Input, Layout, List, message, Progress, Row, Select, Space, Tag} from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import testImage from "./images/test.png"
import "./App.css"
import {stringToColor} from "./utils/util";
import {Link} from "react-router-dom";
import { FilterOutlined } from '@ant-design/icons';


const { Header, Content } = Layout;
const { Meta } = Card;

function App() {
    const [str, setStr] = useState("");
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [labels, setLabels] = useState([]);
    const [articlesContent, setArticlesContent] = useState([]);

    const hanldeOk = () => {
        message.info("你输入的啥？")
    };
    const getArtifactRequest = new Request(require('./article/article'), {
        method: 'GET',
    });

    const changeLabel = (value) => {
        const newArticles = [];
        if (value === null || value.length === 0) {
            newArticles.push(...articles);
            setFilteredArticles(newArticles);
            return;
        }
        if (articles === null || articles.length === 0){
            setFilteredArticles(newArticles);
            return;
        }
        const labelSet = new Set(value);
        for(var i = 0;i < articles.length;i ++){
            var ar = articles[i];
            for(var j = 0;j < ar.labels.length; j ++){
                if (labelSet.has(ar.labels[j])){
                    newArticles.push(ar);
                    break;
                }
            }
        }
        setFilteredArticles(newArticles);
    };

    useEffect(()=>{
        fetch(getArtifactRequest).then((response) => {
            return response.text()
        }).then(text=>{
            const as = JSON.parse(text);
            setArticles(as);
            setFilteredArticles(as);
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
                    onChange={changeLabel}
                >
                    {labels.map(l => <Select.Option value={l}><Tag color={stringToColor(l)}>{l}</Tag> </Select.Option>)}
                </Select>
                {/*<Button shape="circle" icon={<FilterOutlined  />} onClick={hanldeOk}/>*/}
            </Header>
            <Content style={{height: '100%', minHeight: 1000, padding: 20}} className='content'>
                    { filteredArticles && filteredArticles.map(article=>
                        <Link to={`/detail/${article.name}`}>
                            <Card
                                hoverable
                                style={{ width: 240, margin: 10 ,float:"left"}}
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
