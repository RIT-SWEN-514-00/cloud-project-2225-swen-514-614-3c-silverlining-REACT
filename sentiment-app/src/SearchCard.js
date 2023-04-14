import React, { Component } from 'react';
import ApprovalPieGraph from './ApprovalPieGraph';
//import {useNavigate, useLocation} from "react-router-dom";


export default class SearchCard extends Component{
    render(){
        return(
            <div style={CardContainerStyle}>
                <button>Pin Search</button>
                <div>{"\"" + this.props.keyword + "\""}</div>
                <div>{"r/" + this.props.subreddit}</div>
                <div>
                    <ApprovalPieGraph approvalRating={this.props.approvalRating}/>
                </div>
                <div>{"Approval Rating: " + this.props.approvalRating}</div>
                <button>Show More</button>
            </div>
        )
    }
}


// function SearchCardWithNavigation(props) {
//     let navigate = useNavigate();
//     let location = useLocation();
//     return <SearchCard {...props} navigate={navigate} location={location}/>
// }

//export default SearchCardWithNavigation

const CardContainerStyle = {
    border: '2px solid black',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    margin: '30px'
}

const KeyWordStyle = {
    display: 'block'
}

const SubredditStyle = {
    display: 'block'
}