import React from 'react'

export default class MainDetail extends React.Component{

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
                        return <ListItem key={i} item={item} />
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

class ListItem extends React.Component{
    render(){
        return (
            <tr>
                <td>{this.props.item.id}</td>
                <td>{this.props.item.name}</td>
            </tr>
        );
    }
}