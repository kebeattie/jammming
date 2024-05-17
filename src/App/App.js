import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
//import Track from '../Track/Track';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


function App() {

  //Track state of user input in search bar
  const [userInput, setUserInput] = useState('');
  //Track state of search results so we can re render search result component on search test
  const [searchResultsState, setSearchResultsState] = useState([]);
  //Track state of the current tracklist
  const [trackList, setTracklist] = useState([]);
  //Track state of playlsit name
  const [playlistName, setPlaylistName] = useState('')
  //Track access token
  const [accessToken, setAccessToken] = useState('');
  //Track spotify results
  const [spotifyResults, setSpotifyResults] = useState({});


  //Use this to get API token, will update so it only calls after current token expires
  useEffect(() => {
    const clientId = 'eb8ca22582be4f4b902ced6061756e1a';
    const clientSecret = '957ed936baf148c580b4ae07f403ddbf';

    fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)

      },
      body: 'grant_type=client_credentials'

    }).then(result => result.json())
      .then(data => setAccessToken(data.access_token));;
  }, [])





  //Search request
  async function search() {
    const endpoint = `https://api.spotify.com/v1/search?q=${userInput}&type=track`;

    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json())
      .then(data => setSpotifyResults(data.tracks));
  };

  //Create playlist request
  // async function createPlaylist() {
  //   const endpoint = 'https://api.spotify.com/v1/users/kebeattie98/playlists';
  //   console.log(accessToken);
  //   fetch(endpoint, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + accessToken
  //     },
  //     json : {
  //       name: playlistName,
  //       description: "Added from Jammmin app",
  //       public: false
  //     }
  //   }).then(response => response.json())
  //     .then(data => console.log(data));


    
  // }

  let j = 0;
  const searchResults = []; //Array to store results from each search, will be set to searchResultsState
  const constructSearchResults = (spotifyResults) => {
    for (const key in spotifyResults.items) {
      if (j === 1) {
        break;
      }


      for (let i = 0; i < 10; i++) {

        //console.log(spotifyResults.items[i].name); //this gets us track name
        //console.log(spotifyResults.items[i].artists[0].name); //this gets us artist name
        //console.log(spotifyResults.items[i].album.name); //this gets us album name
        //console.log(spotifyResults.items[i].uri); //this gets us uri
        //console.log(spotifyResults.items[i]);


        searchResults.push({
          name: spotifyResults.items[i].name,
          album: spotifyResults.items[i].album.name,
          artist: spotifyResults.items[i].artists[0].name,
          uri: spotifyResults.items[i].uri
        })


      }
      j++
    }
    console.log(searchResults);
  }




  let searchForTracks = () => {
    if (userInput.length > 0) {
    search();
    constructSearchResults(spotifyResults);
    setSearchResultsState(searchResults);
    }
    
  };




  //Event handlers for updating states

  //Handler to track state change for user input
  const handleUserInputChange = (input) => {
    setUserInput(input);


  };
  //Handler to change state of tracklist on addition of track
  const addTrackHandler = (addTrack) => {
    //Check if the selected track is already in the tracklist
    if (!JSON.stringify(trackList).includes(JSON.stringify(addTrack))) {
      setTracklist([...trackList, addTrack]);
    }
    else {
      alert('This track is already in the current playlist.')
    }
  };
  //Handler to change state of tracklist on removal of track
  const removeTrackHandler = (removeTrack) => {
    const newList = trackList.filter((track) => JSON.stringify(track) !== JSON.stringify(removeTrack));
    console.log(newList);

    setTracklist(newList);
  };
  //Handler to change state of playlist name
  const handlePlaylistName = (input) => {
    setPlaylistName(input);
  };
  //Handler to export playlist to spotify (fake data for now)
  const onSaveHandler = () => {
    let uriArray = [];
    trackList.forEach((track) => {
      uriArray.push(track.uri);
    })
    const exportPlaylist = [playlistName, uriArray];
    console.log(exportPlaylist);
    // createPlaylist();

    setTracklist([]);
    setPlaylistName('');
  };




  return (
    <div className='App'>
      <header><h1>Jammming</h1></header>
      <SearchBar userInput={userInput} onChange={handleUserInputChange} searchForTracks={searchForTracks} tracks={searchResultsState} />
      <div className={styles.container}>
        <SearchResults key={searchResultsState} tracks={searchResultsState} trackList={trackList} addTrackHandler={addTrackHandler} />
        <Playlist tracks={trackList} removeTrackHandler={removeTrackHandler} handlePlaylistName={handlePlaylistName} onSaveHandler={onSaveHandler} />
      </div>

    </div>
  );
}

export default App;
