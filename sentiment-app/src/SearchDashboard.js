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
            <div>hi</div>
        )
    }
}

function SearchDashboardWithNavigation(props) {
    let navigate = useNavigate();
    let location = useLocation();
    return <SearchDashboard {...props} navigate={navigate} location={location}/>
}

export default SearchDashboardWithNavigation;