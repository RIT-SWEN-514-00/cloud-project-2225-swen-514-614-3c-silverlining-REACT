import React, { Component } from "react";
import SearchCard from "./SearchCard";
import axios from "axios";
import ApprovalPieGraph from "./ApprovalPieGraph";
import { Route, useNavigate, useLocation, Link } from "react-router-dom";
import LineGraph from "./LineGraph";

const BASE_URL = process.env.REACT_APP_API_URL;

class SearchDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: props.location.state?.search.keyword,
      subreddit: props.location.state?.search.subreddit,
      results: [],
    };
  }

  async componentDidMount() {
    // GET results from the endpoint
    try {
      let response = await axios.get(BASE_URL + "/results", {
        params: {
          keyword: this.state.keyword,
          subreddit: this.state.subreddit,
        },
      });
      let results = JSON.parse(response.data.body);
      console.log(results);
      this.setState({ results: results });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <div className="row m-3 mx-4 mt-4 px-5 py-4">
          <div className="col-lg-3">
            <SearchCard search={this.props.location.state?.search} />
          </div>

          <div className="col">
            <p>Positive Comments: </p>
            {this.state.results.map((data, index) => (
              <p>{data.comments.positive.substring(0,100)}</p>
            ))}
          </div>
          <div className="col">
            <p>Negative Comment: </p>
            <p>{this.props.location.state?.search.comments.negative}</p>
          </div>
        </div>
        <div  className="row m-3 mx-4 mt-4 px-5 py-4">
            <LineGraph data={this.state.results}/>
        </div>
      </div>
    );
  }
}

function SearchDashboardWithNavigation(props) {
  let navigate = useNavigate();
  let location = useLocation();
  return <SearchDashboard {...props} navigate={navigate} location={location} />;
}

export default SearchDashboardWithNavigation;
