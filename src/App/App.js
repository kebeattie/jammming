import styles from './App.module.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
//import Track from '../Track/Track';
import SearchResults from '../SearchResults/SearchResults';

function App() {

  //Fake search result track data to feed to track component until we connect to API 
  const tracks = [
    {
      name: "Man Don't Care",
      album: "Integrity",
      artist: "JME",
      id: 0
    },
    {
      name: "Gorilla",
      album: "No Thank You",
      artist: "Little Simz",
      id: 1

    },

    {
      name: "Uptown Top Ranking",
      album: "Uptown Top Ranking",
      artist: "Althea & Donna",
      id: 2
    },

    


  ]


  return (
    <div className='App'>
      <header><h1>Jammming</h1></header>
      <SearchBar />
      <div className={styles.container}>
        <SearchResults tracks={tracks} />
        <SearchResults tracks={tracks} />
      </div>

    </div>
  );
}

export default App;
