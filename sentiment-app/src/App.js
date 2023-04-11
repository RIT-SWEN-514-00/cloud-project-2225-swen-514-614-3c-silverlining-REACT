import React, { Component } from 'react';
import SearchCard  from './SearchCard';
import './App.css'

const testSearches = [];

class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      search: true,
      pinnedSearches: testSearches,
      searchText: '',
      subredditText: '',
      pinSearch: false,
      subdredditSearch: false
    };

    this.handlePinSearch = this.handlePinSearch.bind(this);
    this.handleSearchTypeSelect = this.handleSearchTypeSelect.bind(this);
  }

  async componentDidMount(){
    // GET pinned searches from database and set state
  }

  async handleSearch(){
    // GET? search
    //this.setState({search: });
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
            <input type='text' value={this.state.searchText}/>
            <button>Search</button>
            <label>
              <input type='checkbox' checked={this.pinSearch} onChange={this.handlePinSearch}/>
              Pin Search
            </label>
          </div>
          <div>
            {this.state.subdredditSearch ? 
              <input type='text' value={this.state.subredditText}/>
              : <div></div>}
          </div>
        </div>
        <div className='SearchDisplayContainer'>
        {this.state.search ? 
              <SearchCard/>
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
