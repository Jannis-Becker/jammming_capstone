import React, { Component } from 'react';
import './UserPlaylistItem.css';

class UserPlaylistItem extends Component {
  constructor(props) {
    super(props);

    this.onRemovePlaylist = this.onRemovePlaylist.bind(this);
  }

  onRemovePlaylist() {
    this.props.onRemovePlaylist(this.props.playlistId);
  }

  render() {
    console.log(this.props);
    return (
      <li>
        <div className="UserPlaylist-name">{this.props.name}</div>
        <a className="UserPlaylist-action" onClick={this.onRemovePlaylist}>
          -
        </a>
      </li>
    );
  }
}

export default UserPlaylistItem;
