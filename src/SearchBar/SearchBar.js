import React, { useState } from 'react';
import './SearchBar.module.css';

export default function SearchBar(props) {
    //Track state of user input in search bar
    const [userInput, setUserInput] = useState('')

    const handleChange = (event) => {
        setUserInput(event.target.value);
    }

    return (
        <>
            <form>
                <input type="text" placeholder='Search for an Artist, Track Name, or Album' value={userInput} onChange={handleChange}/>
            </form>
            <h2>{userInput}</h2>
        </>
    )
}