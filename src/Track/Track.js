import React from 'react';
import styles from './Track.module.css';

export default function Track(props) {
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

                    <p className={styles.addButton}>&#43;</p>

                </div>

            </div>
            <hr></hr>
        </>
    )
}