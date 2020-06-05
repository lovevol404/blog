import React, {useEffect, useState} from 'react';
import {Avatar, Button, Input, Layout, List, message, Progress, Space} from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import testImage from "./images/test.png"
import "./App.css"
const { Header, Content } = Layout;
function App() {
    const [str, setStr] = useState("");
    const [articles, setArticles] = useState([]);
    const listData = [];
    for (let i = 0; i < 23; i++) {
        listData.push({
            href: 'https://lovevol.top/blog/',
            title: `样例${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
                '这是一个样例.',
            content:
                '床前明月光，疑是地上霜。举头望明月，低头思故乡.',
        });
    }
    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );
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
            setArticles(JSON.parse(text));
        });
    },[]);

    return (
        <Layout>
            <Header className='header' style={{height:300, textAlign:"center"}}>
                    <Progress
                        type="circle"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                        percent={1}
                        status="active"
                    />
                    <div>
                        <span className="headerText">建设中</span>
                         <Input onChange={(event => setStr(event.target.value))} placeholder="输入一串神秘代码"/><Button onClick={hanldeOk}>确定</Button>
                </div>

            </Header>
            <Content style={{height: '100%', margin: 30}}>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={listData}
                    footer={
                        <div>
                            <b>By 根号三百万</b>
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={testImage}
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    );
}

export default App;
