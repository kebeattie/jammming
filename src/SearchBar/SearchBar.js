import React, { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar(props) {
    //Event handler to track state of user input



    const handleChange = (event) => {
        const input = event.target.value;
        props.onChange(input);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.searchForTracks(props.userInput);
    }

    return (
        <>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Search for an Artist, Track Name, or Album' value={props.userInput} onChange={handleChange} />
                    <button className={styles.searchButton} type='submit'>Search</button>
                </form>
            </div>
        </>
    )
}