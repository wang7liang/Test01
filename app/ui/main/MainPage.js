import React from 'react'
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import MainHeader from './header/MainHeader'
import MainNavigation from './navigation/MainNavigation'
import MainList from './list/MainList'
import MainDetail from './detail/MainDetail'
import style from  './MainPage.css'


const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class MainPage extends React.Component{

    render(){

        return (
            <div>
                <header className={style.header}>
                    <Link to={"/main"}>管理系统</Link>
                </header>

                <main className={style.main}>
                    <div className={style.main}>
                        <Menu mode="inline" theme="dark" style={{width: '240px'}}>
                            <SubMenu key="user" title={<span><Icon type="user"/><span>用户管理</span></span>}>
                                <MenuItem key="user-list"><Link to="/main/user/list">用户列表</Link></MenuItem>
                                <MenuItem key="user-add"><Link to="/user/add">添加用户</Link></MenuItem>
                            </SubMenu>
                            <SubMenu key="book" title={<span><Icon type="book"/><span>图书管理</span></span>}>
                            <MenuItem key="book-list">
                                <Link to="/book/list">图书列表</Link>
                            </MenuItem>
                            <MenuItem key="book-add">
                                <Link to="/book/add">添加图书</Link>
                            </MenuItem>
                        </SubMenu>
                        </Menu>
                    </div>
                    <div className={style.content}>
                        <Route path={'/main/user/list'} component={MainDetail}></Route>
                    </div>
                </main>

                <footer>
                    没有版权归属
                </footer>
            </div>
        );
    }
}

export default withRouter(MainPage);