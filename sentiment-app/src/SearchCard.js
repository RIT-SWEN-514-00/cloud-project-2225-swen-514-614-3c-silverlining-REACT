import React, { Component } from 'react';
import ApprovalPieGraph from './ApprovalPieGraph';
import axios from 'axios';
import { Route, useNavigate, useLocation, Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;

class SearchCard extends Component{
    constructor(props){
        super(props);

        this.handlePinSearch = this.handlePinSearch.bind(this);
        this.handleNavigateToDashboard = this.handleNavigateToDashboard.bind(this);
    }

    async handlePinSearch(){
        console.log(this.props.search.keyword);
        console.log(this.props.search.subreddit);
        try {
          // errors out for now
          let response = await axios.post(BASE_URL + "/pinned", {params: {keyword: this.props.keyword, reddit: this.props.subreddit}}); //TODO subreddit param misspelled in IAC
          debugger;
          this.props.addPinnedSearchCallback(this.props.search);
        }
        catch (err) {
          console.log(err);
        }
      }

    handleNavigateToDashboard(){
        debugger;
        this.props.navigate("/searchDashboard", 
        {state: {
            search: this.props.search}});
    }
    
    render(){
        return(
            <div style={CardContainerStyle}>
                { this.props.addPinnedSearchCallback ? 
                <button onClick={() => {this.handlePinSearch(this.props.search)}}>Pin Search</button>
                : <div/>}
                <div style={KeyWordTextStyle}>{"\"" + this.props.search.keyword + "\""}</div>
                <div>{"r/" + this.props.search.subreddit}</div>
                <div style={GraphContainerStyle}>
                    <ApprovalPieGraph approval_rating={this.props.search.approval_rating}/>
                </div>
                <div>{"Approval Rating: " + this.props.search.approval_rating}</div>
                <button onClick={this.handleNavigateToDashboard}>Show More</button>
            </div>
        )
    }
}


function SearchCardWithNavigation(props) {
    let navigate = useNavigate();
    let location = useLocation();
    return <SearchCard {...props} navigate={navigate} location={location}/>
}

export default SearchCardWithNavigation;

const CardContainerStyle = {
    border: '2px solid black',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}

const GraphContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}

const KeyWordTextStyle = {
    fontSize: '20px'
}

const SubredditStyle = {
    display: 'block'
}