import styles from './App.module.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import getAccessToken from '../API_requests';


function App() {

  //Track state of user input in search bar
  const [userInput, setUserInput] = useState('');
  //Track state of search results so we can re render search result component on search test
  const [searchResultsState, setSearchResultsState] = useState([]);
  //Track state of the current tracklist
  const [trackList, setTracklist] = useState([]);
  //Track state of playlsit name
  const [playlistName, setPlaylistName] = useState('')
  //Track spotify results
  const [spotifyResults, setSpotifyResults] = useState({});
  //Track userId
  const [userId, setUserId] = useState('');


  getUser();

  //Search request
  async function search() {
    let endpoint = `https://api.spotify.com/v1/search?q=${userInput}&type=track`;
    let token = getAccessToken();
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    }).then(response => response.json())
      .then(data => setSpotifyResults(data.tracks));

      console.log(spotifyResults);
  };

  //Request to add track to playlist
  async function addTrackToPlaylist(playlistId) {
    let trackUris = [];
    for (let i = 0; i < trackList.length; i++) {
      trackUris.push(trackList[i].uri);
    }

    let token = getAccessToken();
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ uris: trackUris })
    })
  }
  //Create playlist requests
  async function createPlaylist() {

    let token = getAccessToken();
    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ name: playlistName })


    }).then(response => response.json())
      .then(data => addTrackToPlaylist(data.id));




  }

  async function getUser() {
    let token = getAccessToken();
    fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(response => response.json())
      .then(data => setUserId(data.id));

  };

  //Store results of search in searchResults state
  let j = 0;
  const searchResults = []; //Array to store results from each search, will be set to searchResultsState
  const constructSearchResults = (spotifyResults) => {
    for (const key in spotifyResults.items) {
      if (j === 1) {
        break;
      }


      for (let i = 0; i < 10; i++) {



        searchResults.push({
          name: spotifyResults.items[i].name,
          album: spotifyResults.items[i].album.name,
          artist: spotifyResults.items[i].artists[0].name,
          uri: spotifyResults.items[i].uri
        })


      }
      j++
    }
  }

  //A function that calls for search methods to run if form submitted and userinput is not empty
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

    setTracklist(newList);
  };

  //Handler to change state of playlist name
  const handlePlaylistName = (input) => {
    setPlaylistName(input);
  };

  //Handler to export playlist to spotify (fake data for now)
  const onSaveHandler = async () => {
    let uriArray = [];
    trackList.forEach((track) => {
      uriArray.push(track.uri);
    })


    createPlaylist();
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


//{props.add  && <p className={styles.addButton} onClick={clickAddHandler}>&#43;</p>} 