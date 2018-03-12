import React from 'react'


class Home extends React.Component{
    render(){
        const { value, onIncreaseClick } = this.props;
        return (
            <div>
                <span>{value}</span>
                <button onClick={onIncreaseClick}>Increase</button>
            </div>
        );
    }
}


export default Home;