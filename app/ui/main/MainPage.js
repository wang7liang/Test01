import React from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import style from  './MainPage.css'
import Menu from './menu/Menu'
import Home from './home/Home'
import User from './user/User'
import Premission from './premission/Premission'
import Role from './role/Role'
import Jcr from './jcr/Jcr'

let MainContentLayout = withRouter(class MainContentLayout extends React.Component{
    render(){
        return (
            <div>
                <Route exact path={this.props.match.path} component={Home}></Route>
                <Route path={this.props.match.path+'/user'} component={User}></Route>
                <Route path={this.props.match.path+'/premission'} component={Premission}></Route>
                <Route path={this.props.match.path+'/role'} component={Role}></Route>
                <Route path={this.props.match.path+'/jcr'} component={Jcr}></Route>
            </div>
        );
    }
})


class MainPage extends React.Component{

    render(){

        return (
            <div>
                <header>
                    <Link to={"/main"}>管理系统</Link>
                </header>
                <Menu />
                <main>
                    <MainContentLayout />
                </main>

                <footer>
                    没有版权归属
                </footer>
            </div>
        );
    }
}

export default connect()(MainPage);