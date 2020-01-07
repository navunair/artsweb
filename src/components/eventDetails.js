import React, { Component } from 'react'

class EventDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
             eid: this.props.data.eventid,
             item:[]
        }
    }

    componentDidMount(){
        fetch(`http://5e142950bce1d10014bae521.mockapi.io/events/${this.state.eid}`)
             .then(res => res.json())
             .then(json => {
                 this.setState({
                     item : json
                 })
             } )
    }

    render(){
        return(
        <div>
            <h1>{this.state.item.ename} </h1>
            <br/><br/>
            <h1>Description</h1>
            <p>{this.state.item.edesc}</p>
            <br/>
            <br/>
            <h1>Rules</h1>
            <p>{this.state.item.erules}</p>
        </div>)
    }
}

export default EventDetails