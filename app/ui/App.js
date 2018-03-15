import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../reducer/allReducer'
import LoginPage from './login/LoginPage'
import MainPage from './main/MainPage'
// import style from './App.css'


const store = createStore(rootReducer);


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
            <Provider store={store}>
                <BrowserRouter>
                    <AppLayout />
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;