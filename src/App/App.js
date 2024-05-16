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

  //Fake track data to feed to track component until we connect to API 
  const tracks = [
    {
      name: "Man Don't Care",
      album: "Integrity",
      artist: "JME",
      id: '0'
    },
    {
      name: "Gorilla",
      album: "No Thank You",
      artist: "Little Simz",
      id: '1'

    },

    {
      name: "Uptown Top Ranking",
      album: "Uptown Top Ranking",
      artist: "Althea & Donna",
      id: '2'
    },

    {
      name: "How Much",
      album: "Grime MC",
      artist: "JME",
      id: '3'
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



  //Handler to track state change for user input
  const handleUserInputChange = (input) => {
    setUserInput(input);
  }


  const addTrackHandler = (addTrack) => {
    setTracklist([...trackList, addTrack]);
    
    
  }

  const removeTrackHandler = (removeTrack) => {
    const newList = trackList.filter((track) => JSON.stringify(track)!== JSON.stringify(removeTrack));
    console.log(newList);

    setTracklist(newList);
    
  }

  return (
    <div className='App'>
      <header><h1>Jammming</h1></header>
      <SearchBar userInput={userInput} onChange={handleUserInputChange} searchForTracks={searchForTracks} tracks={searchResultsState} />
      <div className={styles.container}>
        <SearchResults key={searchResultsState} tracks={searchResultsState} trackList={trackList} addTrackHandler={addTrackHandler} />
        <Playlist tracks={trackList} removeTrackHandler={removeTrackHandler}/>
      </div>

    </div>
  );
}

export default App;
