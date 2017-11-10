import React, { Component } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends Component {
  render() {
    const { searchResults, onAdd } = this.props;
    return (
      <div className="SearchResults">
        <h2>Serch results</h2>
        <TrackList tracks={searchResults} onAdd={onAdd} />
      </div>
    );
  }
}

export default SearchResults;
