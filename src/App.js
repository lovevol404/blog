import React from 'react';
import {Layout, Progress} from "antd";
import "./App.css"
const { Header, Footer, Sider, Content } = Layout;
function App() {
  return (
      <div>
        <Layout>
          <Sider>
              <Progress
                  type="circle"
                  strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                  }}
                  percent={90}
              />
          </Sider>
          <Layout>
            <Header>等待</Header>
            <Content>
                <Progress
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={80}
               />
            </Content>
            <Footer>等待</Footer>
          </Layout>
        </Layout>

      </div>
  );
}

export default App;
