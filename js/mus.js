const clientId = '1541ebb605cb41fe95b59832b835d843';
const clientSecret = '17a3035d52fb42c5b49378bffaff8a2c';
const trackId = '0VjIjW4GlUZAMYd2vXMi3b';


const authUrl = 'https://accounts.spotify.com/api/token';

const authOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${window.btoa(`${clientId}:${clientSecret}`)}`
  },
  body: 'grant_type=client_credentials&scope=user-read-playback-state%20user-modify-playback-state%20streaming'
};

let accessToken = null;

fetch(authUrl, authOptions)
  .then(response => response.json())
  .then(data => {
    accessToken = data.access_token;
  })
  .catch(error => console.error(error));

const script = document.createElement('script');
script.src = 'https://sdk.scdn.co/spotify-player.js';
document.head.appendChild(script);


window.onSpotifyWebPlaybackSDKReady = () => {
  console.log('Spotify Web Playback SDK is ready');

  const player = new Spotify.Player({
    name: 'My cool web app',
    getOAuthToken: cb => { cb(accessToken); },
    volume: 0.5
  });

  player.addListener('ready', ({ device_id }) => {
    console.log('Player is ready');

    // Start playing the track
    const playOptions = {
      uris: [`spotify:track:${trackId}`]
    };

    player.play(playOptions)
      .then(() => {
        console.log('Track started playing');
      })
      .catch(error => {
        console.error('Failed to start playing track', error);
      });
  });

  player.connect()
    .then(() => {
      console.log('Player connected');
    })
    .catch(error => {
      console.error('Failed to connect player', error);
    });
};
