import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

export default function Playlist (props) {

    const inputChange = (event) => {
        const input = event.target.value;
        props.handlePlaylistName(input);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onSaveHandler();
    };
    
    return (
        <>  <div className={styles.container}>
                <h2 className={styles.playListHeading}>Playlist </h2>
                <form className={styles.playListForm} onSubmit={submitHandler}>
                
                    <input type='text' placeholder='Playlist name' className={styles.playListTitleInput} onChange={inputChange}></input>
                    <Tracklist tracks={props.tracks} removeTrackHandler={props.removeTrackHandler}/>
                    <button type='submit'>Save Playlist</button>

                </form>
            </div>
        </>
    )
}