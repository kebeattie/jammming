import React from 'react';
import styles from './SearchResults.module.css';
import Track from '../Track/Track';

export default function SearchResults(props) {

    return (
        <>
            <div className={styles.searchResultsContainer}>
                <h2>Results</h2>

                {props.tracks.map(track => (
                    <Track {...track} key={track.uri} add={true}  addTrackHandler={props.addTrackHandler} />

                ))}

            </div>
        </>
    )
};