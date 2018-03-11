import React from 'react'
import {withRouter} from 'react-router-dom'

class LoginPage extends React.Component{

    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event){
        let data = {
            username: this.refs.username.value,
            passwrod: this.refs.passwrod.value
        }
        const option = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        };

        fetch('/api/login',option).then(res=>{
            return res.json();
        }).then(data=>{
            if(!data.isSuccess){
                alert(data.message);
            }else{
                // 路由到mainPage
                this.props.history.push("/main")
            }
        }).catch(function(e){
            alert(e);
        });
    }

    render(){
        return (
            <div className={require('./LoginPage.css').root}>
                登陆画面:{JSON.stringify(this.props.match)}<br/>
                <input type="text" name={'username'} ref={'username'} /><br/>
                <input type="passwrod" name={"passwrod"} ref={'passwrod'} /><br/>
                <button onClick={this.handleLogin} >登陆</button>
            </div>
        );
    }
}

export default withRouter(LoginPage);