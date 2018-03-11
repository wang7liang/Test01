import React from 'react'
import MainHeaderStyle from './MainHeader.css'

export default class MainHeader extends React.Component{
    render(){
        return (
            <div className={MainHeaderStyle.root}>
                <font className={MainHeaderStyle.font}>管理系统</font>
            </div>
        );
    }
}