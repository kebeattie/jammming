import React from 'react';
import styles from './Track.module.css';

export default function Track(props) {

    const clickAddHandler = () => {
        let track = {
            name: props.name,
            album: props.album,
            artist: props.artist,
            uri: props.uri
        }

        props.addTrackHandler(track);
    }

    const handleRemoveTrackHandler = () => {
        let track = {
            name: props.name,
            album: props.album,
            artist: props.artist,
            uri: props.uri
        }

        props.removeTrackHandler(track);
    }

    return (
        <>
            <div className={styles.trackContainer}>
                <div className={styles.leftSide}>
                    <h3>{props.name}</h3>
                    <p>
                        <span className={styles.artist}>{props.artist}</span>
                        <span className={styles.vl}></span>
                        <span className={styles.album}>{props.album}</span>

                    </p>


                </div>
                <div className={styles.rightSide}>

                     {props.add  && <p className={styles.addButton} onClick={clickAddHandler}>&#43;</p>} 
                     {!props.add && <p className={styles.addButton} onClick={handleRemoveTrackHandler}>&#8722;</p>}
                     

                </div>

            </div>
            <hr></hr>
        </>
    )
}