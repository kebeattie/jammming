import styles from './App.module.css';
import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
//import Track from '../Track/Track';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {

  //Track state of user input in search bar
  const [userInput, setUserInput] = useState('');
  //Track state of search results so we can re render search result component on search
  const [searchResultsState, setSearchResultsState] = useState([]);
  //Track state of the current tracklist
  const [trackList, setTracklist] = useState([]);
  //Track state of playlsit name
  const [playlistName, setPlaylistName] = useState('')

  //Fake track data to feed to track component until we connect to API 
  const tracks = [
    {
      name: "Man Don't Care",
      album: "Integrity",
      artist: "JME",
      uri: '0'
    },
    {
      name: "Gorilla",
      album: "No Thank You",
      artist: "Little Simz",
      uri: '1'

    },

    {
      name: "Uptown Top Ranking",
      album: "Uptown Top Ranking",
      artist: "Althea & Donna",
      uri: '2'
    },

    {
      name: "How Much",
      album: "Grime MC",
      artist: "JME",
      uri: '3'
    }

  ];


  const searchResults = []; //Array to store results from each search, will be set to searchResultsState
  let searchForTracks = (searchString) => {
    if (searchString.length > 1) {

      tracks.forEach((track) => {
        for (const key in track) {

          let value = track[key].split(' ').join('').toLowerCase();
          let userInput = searchString.split(' ').join('').toLowerCase();
          if (value.includes(userInput)) {

            searchResults.push(track);

            break;

          }
        }
      })

    }
    setSearchResultsState(searchResults);



  };


  //Event handlers for updating states

  //Handler to track state change for user input
  const handleUserInputChange = (input) => {
    setUserInput(input);
  };
  //Handler to change state of tracklist on addition of track
  const addTrackHandler = (addTrack) => {
    //Check if the selected track is already in the tracklist
    if(!JSON.stringify(trackList).includes(JSON.stringify(addTrack))) {
      setTracklist([...trackList, addTrack]);
    }
    else {
      alert('This track is already in the current playlist.')
    } 
  };
  //Handler to change state of tracklist on removal of track
  const removeTrackHandler = (removeTrack) => {
    const newList = trackList.filter((track) => JSON.stringify(track)!== JSON.stringify(removeTrack));
    console.log(newList);

    setTracklist(newList); 
  };
  //Handler to change state of playlist name
  const handlePlaylistName = (input) => {
    setPlaylistName(input);
  };
  //Handler to export playlist to sporift (fake data for now)
  const onSaveHandler = () => {
    let uriArray = [];
    trackList.forEach((track) => {
      uriArray.push(track.uri);
    })
    const exportPlaylist =[playlistName, uriArray];
    console.log(exportPlaylist);
  }; 




  return (
    <div className='App'>
      <header><h1>Jammming</h1></header>
      <SearchBar userInput={userInput} onChange={handleUserInputChange} searchForTracks={searchForTracks} tracks={searchResultsState} />
      <div className={styles.container}>
        <SearchResults key={searchResultsState} tracks={searchResultsState} trackList={trackList} addTrackHandler={addTrackHandler} />
        <Playlist tracks={trackList} removeTrackHandler={removeTrackHandler} handlePlaylistName={handlePlaylistName} onSaveHandler={onSaveHandler}/>
      </div>

    </div>
  );
}

export default App;
