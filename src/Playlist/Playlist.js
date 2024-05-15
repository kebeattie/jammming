import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

export default function Playlist (props) {
    return (
        <>  <div className={styles.container}>
                <h2 className={styles.playListHeading}>Playlist </h2>
                <form className={styles.playListForm}>
                
                    <input type='text' placeholder='Playlist name' className={styles.playListTitleInput}></input>
                    <Tracklist tracks={props.tracks}/>
                    <button type='submit'>Save Playlist</button>

                </form>
            </div>
        </>
    )
}