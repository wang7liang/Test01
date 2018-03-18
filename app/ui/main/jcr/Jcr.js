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
function mapDispatchToPropsItem(dispatch,nextProps){
    return {
        handlePathClick: function(e){
            e.preventDefault();
            commonLoadData(dispatch,nextProps.item.path);
        }
    };
}
let JcrItem = connect(function(){return {}},mapDispatchToPropsItem)(
    class JcrItem extends React.Component{
        constructor(props){
            super(props);

            this.handleDownload = this.handleDownload.bind(this);
            this.handleUpdate = this.handleUpdate.bind(this);
        }

        handleDownload(){

        }

        handleUpdate(){

        }

        render(){
            const {handlePathClick} = this.props;

            return (
                <tr>
                    <td>{this.props.item.id}</td>
                    <td>{this.props.item.type=='nt:folder' ? <a href='#' onClick={handlePathClick}>{this.props.item.name}</a> : this.props.item.name}</td>
                    <td>{this.props.item.path}</td>
                    <td>{this.props.item.type}</td>
                    <td>{this.props.item.type=='nt:file' ? <a href='#' onClick={this.handleDownload}>下载</a> : null}</td>
                    <td>{this.props.item.type=='nt:file' ? <a href='#' onClick={this.handleUpdate}>更新</a> : null}</td>
                    <td><Link to={'/main/jcr/'+this.props.item.id+'/edit'}>删除</Link></td>
                </tr>
            );
        }
    }
);








/**
 * 列表
 */
function loadedDataActionCreater(data) {
    return {
        type: 'loadedData',
        data: data
    }
}

function clearDataActionCreater(){
    return {
        type: 'clearData',
        data: []
    }
}

function commonLoadData(dispatch,path){
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

function mapDispatchToPropsList(dispatch){
    return {
        loadData:function(path){
            commonLoadData(dispatch,path);
        },
        clearData:function(){
            dispatch(clearDataActionCreater());
        }
    };
}
function mapStateToPropsList(state){
    return {
        data: state.jcrReducer.data
    };
}
let JcrList = connect(mapStateToPropsList,mapDispatchToPropsList)(
    class JcrList extends React.Component{

        constructor(props){
            super(props);
        }

        componentWillMount(){
            // alert('componentWillMount')
        }

        componentDidMount(){
            // alert('componentDidMount')
            this.props.loadData(this.props.path);
        }

        shouldComponentUpdate(nextProps,nextStates){
            // alert('shouldComponentUpdate');

            if(nextProps.data==this.props.data){
                return false;
            }
            return true;
        }

        componentWillUpdate(){
            // alert('componentWillUpdate')
        }

        componentDidUpdate(){
            // alert('componentDidUpdate')
        }

        componentWillUnmount(){
            // alert('componentWillUnmount')
            this.props.clearData();
        }

        componentWillReceiveProps(nextProps){
            // alert('componentWillReceiveProps:'+JSON.stringify(nextProps))
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
                            {this.props.data.map(function(item,i){
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









function changeSelectActionCreater(retData){
    return {
        type: 'changeSelect',
        retData: retData
    }
}

function mapDispatchToPropsAdd(dispatch){
    return {
        changeSelect:function(retData){
            dispatch(changeSelectActionCreater(retData));
        }
    };
}
function mapStateToPropsAdd(state){
    return {
        retData: state.jcrReducer.retData
    };
}
let JcrAdd = connect(mapStateToPropsAdd,mapDispatchToPropsAdd)(
    class JcrAdd extends React.Component{
        constructor(props){
            super(props);

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        componentDidMount(){
        }

        handleChange(event){
            let formData = new FormData();
            formData.append('file',this.refs.file.files[0])

            const option = {
                method: 'post',
                body: formData,
                credentials: 'include'
            };

            fetch('/api/main/jcr/file/upload',option).then(res=>{
                return res.json();
            }).then(data=>{
                data.filePath = '/test01';
                data.fileType = '1111';
                this.props.changeSelect(data);
            }).catch(function(e){
                alert(e);
            });
        }

        handleSubmit(event){
            const option = {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.props.retData),
                credentials: 'include'
            };

            fetch('/api/main/jcr/file/confirm', option).then(res=>{
                return res;
            }).then(data=>{
                this.props.history.push("/main/jcr")
            }).catch(function(e){
                alert(e);
            });
        }

        render(){
            return (
                <div>
                    文件: <input type="file" ref="file" onChange={this.handleChange} /><br/>
                    <button onClick={this.handleSubmit} >提交</button>
                </div>
            );
        }
    }
)

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







