let accessToken = '';
const clientId = 'd8c09b6a8c774af2844a5e9b88ac6e44';
const redirectUri = 'http://localhost:3000/';

let Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expirationMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expirationMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expirationMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  search(searchTerm) {
    const accessToken = this.getAccessToken();
    return fetch(
      'https://api.spotify.com/v1/search?type=track&q=+' + searchTerm,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
      .then(
        response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request Failed');
        },
        networkError => {
          console.log(networkError.message);
        }
      )
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },

  savePlaylist(playlistName, tracks) {
    if (!playlistName || !tracks.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };
    let user;

    return fetch('https://api.spotify.com/v1/me', { headers: headers })
      .then(response => response.json())
      .then(jsonResponse => {
        user = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${user}/playlists`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: playlistName })
        })
          .then(response => response.json())
          .then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(
              `https://api.spotify.com/v1/users/${user}/playlists/${playlistId}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({ uris: tracks })
              }
            );
          });
      });
  }
};

export default Spotify;
