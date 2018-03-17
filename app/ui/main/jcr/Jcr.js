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

function clickPathActionCreater(path) {
    return {
        type: 'clickPath',
        path: path
    }
}
function mapDispatchToPropsItem(dispatch,nextProps){
    return {
        handlePathClick: function(e){
            e.preventDefault();
            dispatch(clickPathActionCreater(nextProps.item.path));
        }
    };
}
let JcrItem = connect(function(){return {}},mapDispatchToPropsItem)(
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
function loadedSchemeActionCreater(scheme) {
    return {
        type: 'loadedScheme',
        scheme: scheme
    }
}
function loadedDataActionCreater(data) {
    return {
        type: 'loadedData',
        data: data
    }
}
function mapDispatchToPropsList(dispatch){
    return {
        changeLife: function(life,path){
            dispatch(changeLifeActionCreater(life,path));
        },

        loadScheme: function(){
            const option = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}),
                credentials: 'include'
            };

            fetch('/api/main/jcr/nodes/scheme',option).then(res=>{
                return res.json();
            }).then(data=>{
                if(!data.success){
                    alert('数据获取失败')
                }else{
                    dispatch(loadedSchemeActionCreater(data.content));
                }
            }).catch(function(e){
                alert(e);
            });
        },

        loadData:function(path){
            const option = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({path:path}),
                credentials: 'include'
            };

            fetch('/api/main/jcr/nodes',option).then(res=>{
                return res.json();
            }).then(data=>{
                if(!data.success){
                    alert('数据获取失败')
                }else{
                    dispatch(loadedDataActionCreater(data.content));
                }
            }).catch(function(e){
                alert(e);
            });
        }
    };
}
function mapStateToPropsList(state){
    return {
        life: state.jcrReducer.life,
        scheme: state.jcrReducer.scheme,
        data: state.jcrReducer.data,
        path: state.jcrReducer.path
    };
}
let JcrList = connect(mapStateToPropsList,mapDispatchToPropsList)(
    class JcrList extends React.Component{

        constructor(props){
            super(props);
        }

        componentWillMount(){
            this.props.loadScheme();
        }

        componentDidMount(){
            // alert('componentDidMount')
        }

        shouldComponentUpdate(nextProps,nextStates){
            // alert('shouldComponentUpdate');
            if(nextProps.location.key!=this.props.location.key){
                this.props.loadData("/");
                return false;
            }else{
                if(nextProps.life=='Init'){
                    return false;
                }else if(nextProps.life=='LoadingScheme'){
                    return false;
                }else if(nextProps.life=='LoadedScheme'){
                    // this.setState({life: 'LoadingData'});
                    this.props.loadData(this.props.path);
                    return false;
                }else if(nextProps.life=='LoadingData'){
                    return false;
                }else if(nextProps.life=='LoadedData'){
                    return true;
                }else{
                    return false;
                }
            }

            return false;
        }

        componentWillUpdate(){
            // alert('componentWillUpdate')
        }

        componentDidUpdate(){
            // alert('componentDidUpdate')
        }

        componentWillUnmount(){
            // alert('componentWillUnmount')
        }

        componentWillReceiveProps(nextProps){
            // alert('componentWillReceiveProps:'+JSON.stringify(nextProps))
        }

        render(){
            let renderContent = ''
            if(this.props.life=='LoadedData'){
                renderContent =
                    <div>
                        <table>
                            <tbody>
                            <tr>
                                {this.props.scheme.col.map(function(item,i){
                                    return  <td key={i}>{item.title}</td>
                                })}
                            </tr>
                            {this.props.data.map(function(item,i){
                                return <JcrItem key={i} item={item} />
                            })}
                            </tbody>
                        </table>
                    </div>
            }else{
            }

            return (renderContent);
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







