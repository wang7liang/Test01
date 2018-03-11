import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginPage from './login/LoginPage'
import MainPage from './main/MainPage'
import AppStyle from './App.css'

export default class App extends React.Component{
    render(){
        return (
            <Router>
                <div className={AppStyle.root}>
                    <Route exact path={"/"} component={LoginPage}></Route>
                    <Route exact path={"/index.html"} component={LoginPage}></Route>
                    <Route path={"/main"} component={MainPage}></Route>
                </div>
            </Router>
        );
    }
}