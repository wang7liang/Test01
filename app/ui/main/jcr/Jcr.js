import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { connect } from 'react-redux'



class JcrNav extends React.Component{
    render(){
        return (
            <div>
                <Link to={'/main/jcr/add'}>新增</Link>
            </div>
        );
    }
}

/**
 * 列表项
 */

// function clickPathActionCreater(path) {
//     return {
//         type: 'changePath',
//         path: path
//     }
// }
//
// function mapDispatchToProps(dispatch,nextProps){
//     return {
//         handlePathClick: function(){
//             dispatch(clickPathActionCreater(nextProps.item.path));
//         }
//     };
// }


function fetchPosts(dispatch,path){
    return function(){
        const option = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({path:path}),
            credentials: 'include'
        };
        fetch('/api/main/jcr/nodes',option)
            .then(res=>res.json)
            // .then(json=>dispatch({type: 'receive_data',data: json}));
            .then(function(json){
                dispatch({type: 'receive_data',data: json})
            }).catch(function(e){
                alert(e);
        })
    }
}

function mapDispatchToProps(dispatch,nextProps){
    return {
        handlePathClick: function(){
            dispatch(fetchPosts(dispatch,nextProps.item.path));
        }
    };
}

let JcrItem = connect(function(){return {}},mapDispatchToProps)(
    class JcrItem extends React.Component{
        constructor(props){
            super(props);
        }

        render(){
            const {handlePathClick} = this.props;

            return (
                <tr>
                    <td>{this.props.item.id}</td>
                    <td>{this.props.item.type=='nt:folder' ? <a href='#' onClick={handlePathClick}>{this.props.item.name}</a> : this.props.item.name}</td>
                    <td>{this.props.item.path}</td>
                    <td>{this.props.item.type}</td>
                    <td><Link to={'/main/jcr/'+this.props.item.id+'/edit'}>编辑</Link></td>
                </tr>
            );
        }
    }
);







/**
 * 列表
 */

function mapStateToProps(state){
    return {
        path: state.jcrReducer.path,
        data: state.jcrReducer.data
    };
}
let JcrList = connect(mapStateToProps)(
    class JcrList extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                path: '/',
                data: []
            }

        }

        componentWillReceiveProps(){
            // const option = {
            //     method: 'post',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({path:this.props.path}),
            //     credentials: 'include'
            // };
            // // const option = {
            // //     method: 'GET'
            // // };
            // fetch('/api/main/jcr/nodes',option).then(res=>{
            //     return res.json();
            // }).then(data=>{
            //     if(!data.success){
            //         alert('数据获取失败')
            //     }else{
            //         this.setState({
            //             data : data.content
            //         });
            //     }
            // }).catch(function(e){
            //     alert(e);
            // });
        }

        componentDidMount(){
            const option = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({path:this.props.path}),
                credentials: 'include'
            };
            // const option = {
            //     method: 'GET'
            // };
            fetch('/api/main/jcr/nodes',option).then(res=>{
                return res.json();
            }).then(data=>{
                if(!data.success){
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
                            <td>path</td>
                            <td>type</td>
                        </tr>
                        { this.state.data.map(function(item,i){
                            return <JcrItem key={i} item={item} />
                        })}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
);


/**
 * 详情
 */
class JcrProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data:{}
        }

        this.handleBack = this.handleBack.bind(this);
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
        fetch('/api/main/jcr/files/file/'+this.props.match.params.fileId, option).then(res=>{
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

    handleBack(event){
        this.props.history.push("/main/jcr")
    }

    render(){
        return (
            <div>
                id:{this.state.data.id} <br/>
                name:{this.state.data.name} <br/>
                <button onClick={this.handleBack} >返回列表</button>
            </div>
        );
    }
}

/**
 * 新增
 */
class JcrAdd extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            data:{}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
    }

    handleSubmit(event){
        let data = {
            id: this.refs.id.value,
            name: this.refs.name.value
        }

        this.props.history.push("/main/jcr")
    }

    render(){
        return (
            <div>
                id: <input type="text" name={'id'} ref={'id'}  /><br/>
                name: <input type="text" name={'name'} ref={'name'} /><br/>
                <button onClick={this.handleSubmit} >提交</button>
            </div>
        );
    }
}

/**
 * 编辑
 */
class JcrEdit extends React.Component{
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
        fetch('/api/main/jcr/files/file/'+this.props.match.params.fileId, option).then(res=>{
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

        this.props.history.push("/main/jcr")
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


class Jcr extends React.Component{
    render(){
        return (
            <div>
                <Route path={this.props.match.path} component={JcrNav} ></Route>
                <Switch>
                    <Route path={this.props.match.path} exact component={JcrList} ></Route>
                    <Route path={this.props.match.path+'/add'} exact component={JcrAdd} ></Route>
                    <Route path={this.props.match.path+'/:fileId'} exact component={JcrProfile} ></Route>
                    <Route path={this.props.match.path+'/:fileId/edit'} component={JcrEdit} ></Route>
                </Switch>
            </div>
        );
    }
}



export default connect()(Jcr);







