import React, { Component } from 'react';
import SearchCard from './SearchCard';
import './App.css'
import axios from 'axios';
import ApprovalPieGraph from './ApprovalPieGraph';

const BASE_URL = process.env.REACT_APP_API_URL;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pinnedSearches: [],
      keyword: '',
      subreddit: 'all',
      pinSearch: false,
      subdredditSearch: false,
      currentSearch: undefined,
      loading: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchTypeSelect = this.handleSearchTypeSelect.bind(this);
    this.handleKeywordInput = this.handleKeywordInput.bind(this);
    this.handleSubredditInput = this.handleSubredditInput.bind(this);
    this.addPinnedSearchCallback = this.addPinnedSearchCallback.bind(this);
  }

  async componentDidMount() {
    // GET pinned searches from database and set state
    try{
      let response = await axios.get(BASE_URL + "/pinned");
      console.log(response);
      let pins = JSON.parse(response.data.body);
      this.setState({pinnedSearches: pins});
    }
    catch(err){
      console.log(err);
    }
  }

  async handleSearch() {
    console.log(this.state.keyword);
    console.log(this.state.subreddit);
    try {
      this.setState({ loading: true });
      let response = await axios.get(BASE_URL + "/v1", { params: { keyword: this.state.keyword, subreddit: this.state.subreddit } }); //TODO change v1 to base URL instead of only get search
      //debugger;
      let search = JSON.parse(response.data.body);
      this.setState({ currentSearch: search, loading: false });
      console.log(JSON.stringify(search));
    }
    catch (err) {
      console.log(err);
    }
  }

  async getPinnedSearches() {

  }

  handleKeywordInput(event) {
    this.setState({ keyword: event.target.value });
  }

  handleSubredditInput(event) {
    this.setState({ subreddit: event.target.value });
  }

  handleSearchTypeSelect(event) {
    if (event.target.value === 'subreddit') {
      this.setState({ subdredditSearch: true });
    }
    else {
      this.setState({ subdredditSearch: false, subreddit: 'all' });
    }
  }

  addPinnedSearchCallback(search) {
    let updatedPins = this.state.pinnedSearches;
    updatedPins.push(search);
    this.setState({ pinnedSearches: updatedPins });
    debugger;
  }

  render() {
    return (
      <div className='AppContainer'>
        <div className='TitleContainer'>
          <h1 className='Title'>Reddit Sentiment Analyzer</h1>
          <h2 className='Subtitle'>Search a topic below to see what everyone thinks!</h2>
        </div>
        <div className='InputContainer'>
          <div style={{ display: 'inline-block' }}>
            <select onChange={this.handleSearchTypeSelect}>
              <option value='top'>Top Posts</option>
              <option value='subreddit'>By Subreddit</option>
            </select>
            <input type='text' value={this.state.searchText} onChange={this.handleKeywordInput} />
            <button onClick={this.handleSearch}>Search</button>
          </div>
          <div>
            {this.state.subdredditSearch ?
              <input type='text' value={this.state.subreddit} onChange={this.handleSubredditInput} />
              : <div></div>}
          </div>
        </div>
        <div className='SearchDisplayContainer' style={searchDisplayContainerStyle}>
          {this.state.loading ?
            <div>Loading...</div>
            : <div></div>}
          {this.state.currentSearch ?
            <SearchCard search={this.state.currentSearch} addPinnedSearchCallback={this.addPinnedSearchCallback} />
            : <div></div>}
        </div>
        <div className='PinnedSearchHeaderContainer'>
          <h3 className='PinnedSearchHeader'>Pinned Searches</h3>
        </div>
        <div className='SearchCardContainer'>
          {this.state.pinnedSearches.map((search, index) => (
            <SearchCard key={index} search={search} />
          ))}
        </div>
      </div>


    )
  }
}

export default App;

const searchDisplayContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center'
}
