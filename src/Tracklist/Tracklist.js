import React from 'react';
import styles from './Tracklist.module.css'
import Track from '../Track/Track';

export default function Tracklist(props) {
    
    return (
        <>
            <div className={styles.container}>
                {props.tracks.map(track => (
                    <Track {...track} key={track.id} add={false} removeTrackHandler={props.removeTrackHandler} />

                ))}

            </div>
        </>
    )
}