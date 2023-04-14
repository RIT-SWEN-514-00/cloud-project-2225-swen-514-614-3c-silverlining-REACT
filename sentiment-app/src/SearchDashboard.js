import React, { Component } from 'react';
import SearchCard  from './SearchCard';
import axios from 'axios';
import ApprovalPieGraph from './ApprovalPieGraph';
import { Route, useNavigate, useLocation, Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;

class SearchDashboard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div style={DashboardContainerStyle}>
                <SearchCard search={this.props.location.state?.search}/>
                <div style={CommentContainerStyle}>
                    <p>Positive Comment: </p>
                    <p>{this.props.location.state?.search.comments.positive}</p>
                </div>
                <div style={CommentContainerStyle}>
                    <p>Negative Comment: </p>
                    <p>{this.props.location.state?.search.comments.negative}</p>
                </div>
            </div>
        )
    }
}

function SearchDashboardWithNavigation(props) {
    let navigate = useNavigate();
    let location = useLocation();
    return <SearchDashboard {...props} navigate={navigate} location={location}/>
}

export default SearchDashboardWithNavigation;

const DashboardContainerStyle = {
    display: 'flex'
}

const HeaderContainerStyle = {

}

const CommentContainerStyle = {
    border: '2px solid black',
    borderRadius: '10px',
}