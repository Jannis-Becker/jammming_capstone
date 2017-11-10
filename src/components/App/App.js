import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import UserPlaylist from '../UserPlaylist/UserPlaylist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    //get current playlist
    let newPlaylistTracks = this.state.playlistTracks;
    //checking if the selected one is exsisting in list
    if (
      newPlaylistTracks.every(originalTrack => originalTrack.id !== track.id)
    ) {
      newPlaylistTracks.push(track);
    }
    //set the new list to state
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  removeTrack(track) {
    //get current playlist
    let newPlaylistTracks = this.state.playlistTracks;
    //filter the one out
    newPlaylistTracks = newPlaylistTracks.filter(
      originalTrack => originalTrack.id !== track.id
    );
    //set the new list to state
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackUris);

    // then(() => {
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
    // });
  }

  search(term) {
    return Spotify.search(term).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              onSearch={this.search}
            />
            <Playlist
              playlistName={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
            <UserPlaylist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
