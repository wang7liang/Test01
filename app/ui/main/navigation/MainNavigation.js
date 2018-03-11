import React from 'react'
import {Link} from 'react-router-dom'

export default class MainNavigation extends React.Component{
    render(){
        return (
            <div>
                <Link to={'/'}>用户</Link>
                <Link to={'/'}>角色</Link>
                <Link to={'/'}>权限</Link>
                <Link to={'/'}>组织机构</Link>
            </div>
        );
    }
}