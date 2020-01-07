import React, { Component } from 'react'
import EventDetails from './eventDetails'





function searchingFor(term){
    return function(x){
        return x.edesc.toLowerCase().includes(term.toLowerCase()) || !term
    }
}
class EventSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
           items: [],
           term: '',
           eventid: ''

        }
        this.searchHandler = this.searchHandler.bind(this)
        this.gotoevent = this.gotoevent.bind(this)
    }
    componentDidMount(){
        fetch('http://5e142950bce1d10014bae521.mockapi.io/events')
             .then(res => res.json())
             .then(json => {
                 this.setState({
                     items : json
                 })
             } )

    }
    gotoevent(event){
        this.setState({
            eventid : event.target.value,
            term:''
        })
        console.log(event.target.value)
    }
    searchHandler(event){
        this.setState({
             term: event.target.value,
             eventid: ''
        })
        console.log(this.state.term)
    }
    render(){
        var {items} = this.state;
        if(this.state.term && !this.state.eventid){
           return(
            <div>
            <form>
                <input type ="text" onChange = {this.searchHandler} placeholder="Search Event"/>
            </form>
            <ul>
             
            {items.filter(searchingFor(this.state.term)).map(item =>
                    <li key = {item.id} value = {item.id} style= {{cursor:'pointer'}} onClick = {this.gotoevent}>
                        {item.edesc} <br/><br/>
                    </li>
                )
            }
            </ul>
            </div>
           )
        }
        else if(!this.state.term && !this.state.eventid)
         {return( 
            <div>
            <form>
                <input type ="text" onChange = {this.searchHandler} placeholder="Search Event"/>
            </form> 
            </div>
         )}

        else if (!this.state.term && this.state.eventid){
            return(<div>
                <form>
                    <input type ="text" onChange = {this.searchHandler} placeholder="Search Event"/>
                </form> 
                <EventDetails data = {this.state}/>
                </div>
            )
        }

    }
}
export default EventSearch