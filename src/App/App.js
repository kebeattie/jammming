import './App.module.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Track from '../Track/Track';

function App() {

  //Fake track data to feed to track component until we connect to API 
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
    }

  ]


  return (
    <div className='App'>
      <header><h1>Jammming</h1></header>
      <SearchBar />
      {
        tracks.map (track => (
          <Track { ...track} key={track.plan}/>
        )) 
      }
      <Track tracks={tracks} />

    </div>
  );
}

export default App;
