import React, { Component } from 'react';
import './UserPlaylist.css';
import UserPlaylistItem from '../UserPlaylistItem/UserPlaylistItem';
import Spotify from '../../util/Spotify';

class UserPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    };
    this.loadUserPlaylists = this.loadUserPlaylists.bind(this);
    this.onRemovePlaylist = this.onRemovePlaylist.bind(this);
  }

  loadUserPlaylists() {
    Spotify.loadUserPlaylists().then(playlist => {
      console.log(playlist);
      this.setState({
        playlists: playlist
      });
    });
  }

  onRemovePlaylist(playlistId) {
    console.log(playlistId);
    Spotify.removeUserPlaylist(playlistId).then(() => {
      console.log('removeUserPlaylist');
      //get current playlist
      let newPlaylist = this.state.playlists;
      //filter the one out
      newPlaylist = newPlaylist.filter(
        originalPlaylist => originalPlaylist.id !== playlistId
      );
      //set the new list to state
      this.setState({ playlists: newPlaylist });
    });
  }

  render() {
    console.log(this.state.playlists);
    return (
      <div className="UserPlaylist">
        <h2>User playlists</h2>
        <a className="UserPlaylist-save" onClick={this.loadUserPlaylists}>
          Load playlists
        </a>
        <ul>
          {this.state.playlists.map(playlist => (
            <UserPlaylistItem
              key={playlist.id}
              playlistId={playlist.id}
              name={playlist.name}
              onRemovePlaylist={this.onRemovePlaylist}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default UserPlaylist;
