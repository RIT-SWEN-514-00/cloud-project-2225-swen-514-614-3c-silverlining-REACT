import React, { Component } from 'react';
import SearchCard  from './SearchCard';
import './App.css'
import axios from 'axios';

const BASE_URL = process.env.API_URL;
const testSearches = [];

class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      pinnedSearches: testSearches,
      keyword: '',
      subreddit: '',
      pinSearch: false,
      subdredditSearch: false,
      currentSearch: undefined
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handlePinSearch = this.handlePinSearch.bind(this);
    this.handleSearchTypeSelect = this.handleSearchTypeSelect.bind(this);
    this.handleKeywordInput = this.handleKeywordInput.bind(this);
    this.handleSubredditInput = this.handleSubredditInput.bind(this);
  }

  async componentDidMount(){
    // GET pinned searches from database and set state

  }

  async handleSearch(){
    // GET to check if search already exists?
    // If so GET search
    // If not GET 7 searches and plot the 7 data points
    console.log(this.state.keyword);
    console.log(this.state.subreddit);
    try {
      let response = await axios.get(BASE_URL, {keyword: this.state.keyword, subreddit: this.state.subreddit});
      let search = response.data;
      console.log(JSON.stringify(search));
    }
    catch (err) {
      console.log(err);
    }
  }

  handleKeywordInput(event){
    this.setState({keyword: event.target.value});
  }

  handleSubredditInput(event){
    this.setState({subdreddit: event.target.value});
  }

  handleSearchTypeSelect(event){
    if(event.target.value === 'subreddit'){
      this.setState({subdredditSearch: true});
    }
    else{
      this.setState({subdredditSearch: false});
    }
  }

  handlePinSearch(event){
    this.setState({pinSearch: event.target.checked});
    console.log(event.target.checked);
  }

  render(){
    return(
      <div className='AppContainer'>
        <div className='TitleContainer'>
          <h1 className='Title'>Reddit Sentiment Analyzer</h1>
          <h2 className='Subtitle'>Search a topic below to see what everyone thinks!</h2>
        </div>
        <div className='InputContainer'>
          <div style={{display: 'inline-block'}}>
            <select onChange={this.handleSearchTypeSelect}>
              <option value='top'>Top Posts</option>
              <option value='subreddit'>By Subreddit</option>
            </select>
            <input type='text' value={this.state.searchText} onChange={this.handleKeywordInput}/>
            <button onClick={this.handleSearch}>Search</button>
            <label>
              <input type='checkbox' checked={this.pinSearch} onChange={this.handlePinSearch}/>
              Pin Search
            </label>
          </div>
          <div>
            {this.state.subdredditSearch ? 
              <input type='text' value={this.state.subreddit} onChange={this.handleSubredditInput}/>
              : <div></div>}
          </div>
        </div>
        <div className='SearchDisplayContainer'>
        {this.state.currentSearch ? 
              <SearchCard search={this.state.currentSearch}/>
              : <div></div>}
        </div>
        <div className='PinnedSearchHeaderContainer'>
              <h3 className='PinnedSearchHeader'>Pinned Searches</h3>
        </div>
        <div className='SearchCardContainer'>
          {this.state.pinnedSearches.map((search, index) => {
            return <SearchCard key={index}/>
          })}
        </div>
      </div>


    )
  }
}

export default App;
