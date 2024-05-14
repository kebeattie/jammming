import React from 'react';
import './Track.module.css';

export default function Track(props) {
    return (
        <>
            <div className='trackContainer'>
                <h3>{props.name}</h3>
                <p>{props.artist} {props.album}</p>
                
            </div>
        </>
    )
}