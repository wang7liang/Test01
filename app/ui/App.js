import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore} from 'redux'
import LoginPage from './login/LoginPage'
import MainPage from './main/MainPage'
// import style from './App.css'

/**
 * 整个应用的布局
 */
class AppLayout extends React.Component{
    render(){
        return (
            <div>
                <Route exact path={"/"} component={LoginPage}></Route>
                <Route exact path={"/index.html"} component={LoginPage}></Route>
                <Route path={"/main"} component={MainPage}></Route>
            </div>
    );
    }
}

/**
 * App组件
 */
class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <AppLayout />
            </BrowserRouter>
        );
    }
}

export default App;