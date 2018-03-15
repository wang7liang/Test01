import React from 'react'
import { connect } from 'react-redux'


class Home extends React.Component{
    render(){

        const {value, onAddClick, onSubClick} = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={onAddClick}>Add</button>
                <button onClick={onSubClick}>Sub</button>
            </div>
        );
    }
}

const addAction = {type: 'add', num: 1};
const subAction = {type: 'sub', num: 1};

function mapStateToProps(state){
    return {
        value: state.homeReducer.count
    };
}


function mapDispatchToProps(dispatch){
    return {
        onAddClick: function(){
            dispatch(addAction)
        },
        onSubClick: function(){
            dispatch(subAction)
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);