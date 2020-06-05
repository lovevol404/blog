import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Detail from "./detail";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {ConfigProvider} from "antd";
function Index() {
    return (
        <div className="App">
            <Router>
                <ConfigProvider locale={"antdCNLocale"}>
                    <Switch>
                        <Route
                            path="/"
                            render={() => (
                                <Switch>
                                    <Route exact path="/blog" component={App}/>
                                    <Route exact path="/detail/:name" component={Detail}/>
                                </Switch>
                            )}
                        />
                    </Switch>
                </ConfigProvider>
            </Router>
        </div>
    );
}

ReactDOM.render(
    Index(), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
