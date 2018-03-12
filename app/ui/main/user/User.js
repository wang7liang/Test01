import React from 'react'
import { Route, Link } from 'react-router-dom'



class UserNav extends React.Component{
    render(){
        return (
            <div>
                UserNav
            </div>
        );
    }
}

/**
 * 列表项
 */
class UserItem extends React.Component{
    render(){
        return (
            <tr>
                <td>{this.props.item.id}</td>
                <td><Link to={'/main/user/'+this.props.item.id}>{this.props.item.name}</Link></td>
                <td><Link to={'/main/user/'+this.props.item.id+'/edit'}>编辑</Link></td>
            </tr>
        );
    }
}

/**
 * 列表
 */
class UserList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data:[]
        }
    }

    componentDidMount(){
        const option = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
            credentials: 'include'
        };
        // const option = {
        //     method: 'GET'
        // };
        fetch('/api/main/user/list',option).then(res=>{
            return res.json();
        }).then(data=>{
            if(!data.isSuccess){
                alert('数据获取失败')
            }else{
                this.setState({
                    data : data.content
                });
            }
        }).catch(function(e){
            alert(e);
        });
    }

    render(){
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                    </tr>
                    { this.state.data.map(function(item,i){
                        return <UserItem key={i} item={item} />
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

/**
 * 详情
 */
class UserProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data:{}
        }
    }

    componentDidMount(){
        const option = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
            credentials: 'include'
        };
        // const option = {
        //     method: 'GET'
        // };
        fetch('/api/main/user/'+this.props.match.params.userId, option).then(res=>{
            return res.json();
        }).then(data=>{
            if(!data.isSuccess){
                alert('数据获取失败')
            }else{
                this.setState({
                    data : data.content
                });
            }
        }).catch(function(e){
            alert(e);
        });
    }

    render(){
        return (
            <div>
                id:{this.state.data.id} <br/>
                name:{this.state.data.name} <br/>
            </div>
        );
    }
}

/**
 * 新增
 */
class UserAdd extends React.Component{
    render(){
        return (
            <div>
                UserAdd
            </div>
        );
    }
}

/**
 * 编辑
 */
class UserEdit extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data:{}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const option = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}),
            credentials: 'include'
        };
        // const option = {
        //     method: 'GET'
        // };
        fetch('/api/main/user/'+this.props.match.params.userId, option).then(res=>{
            return res.json();
        }).then(data=>{
            if(!data.isSuccess){
                alert('数据获取失败')
            }else{
                this.setState({
                    data : data.content
                });
            }
        }).catch(function(e){
            alert(e);
        });
    }

    handleSubmit(event){
        let data = {
            id: this.refs.id.value,
            name: this.refs.name.value
        }

        this.props.history.push("/main/user")
    }

    render(){
        return (
            <div>
                id: <input type="text" name={'id'} ref={'id'} value={this.state.data.id} /><br/>
                name: <input type="text" name={'name'} ref={'name'} value={this.state.data.name} /><br/>
                <button onClick={this.handleSubmit} >提交</button>
            </div>
        );
    }
}


class User extends React.Component{
    render(){
        return (
            <div>
                <Route path={this.props.match.path} component={UserNav} ></Route>
                <Route path={this.props.match.path} exact component={UserList} ></Route>
                <Route path={this.props.match.path+'/:userId'} exact component={UserProfile} ></Route>
                <Route path={this.props.match.path+'/:userId/add'} component={UserAdd} ></Route>
                <Route path={this.props.match.path+'/:userId/edit'} component={UserEdit} ></Route>
            </div>
        );
    }
}



export default User;







