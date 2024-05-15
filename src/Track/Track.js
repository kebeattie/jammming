import React from 'react';
import styles from './Track.module.css';

export default function Track(props) {
    return (
        <>
            <div className={styles.trackContainer}>
                <h3>{props.name}</h3>
                <p><span className={styles.artist}>{props.artist}</span><span className={styles.vl}></span><span className={styles.album}>{props.album}</span></p>
                <hr />
                
            </div>
        </>
    )
}