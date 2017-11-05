import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    const { tracks, onAdd, onRemove, isRemoval } = this.props;
    return (
      <div className="TrackList">
        {tracks.map(track => (
          <Track
            key={track.id}
            track={track}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemoval={isRemoval}
          />
        ))}
      </div>
    );
  }
}

export default TrackList;
